import path from "path";
import prompts from "prompts";
import { spawn } from "child_process";
import * as log from "../core/log.js";
import * as fs from "../core/fs.js";
import { discoverTemplates, findTemplate, getTemplateDir, validateTemplate } from "../core/templates.js";
import { renderVariables, renderPath, validateProjectName, sanitizeProjectName, getPatternErrorMessage } from "../core/variables.js";
import { processConditionals, processHandlebarsConditionals, processVariableHandlebarsConditionals, shouldWriteFile } from "../core/conditionals.js";
import { loadHooks, executeHooks, printHookMessages } from "../core/hooks.js";
import type { InitOptions, VariableContext, ConditionalContext, TemplateVariable } from "../types.js";

export async function initCommand(projectNameArg: string | undefined, options: InitOptions) {
  try {
    // Handle list and info flags
    if (options.list) {
      await listTemplates();
      return;
    }
    
    if (options.info) {
      await showTemplateInfo(options.info);
      return;
    }
    
    log.title("🚀 create-projex");
    log.nl();
    
    // Discover available templates
    const templates = await discoverTemplates();
    
    if (templates.length === 0) {
      log.error("No templates found. Make sure templates/ directory exists.");
      process.exit(1);
    }
    
    // Get template
    const templateId = await resolveTemplate(options.template, templates, options.nonInteractive);
    const template = await findTemplate(templateId);
    
    if (!template) {
      log.error(`Template not found: ${templateId}`);
      process.exit(1);
    }
    
    // Validate template
    if (!(await validateTemplate(template))) {
      log.error(`Invalid template: ${templateId}`);
      process.exit(1);
    }
    
    log.info(`Using template: ${template.displayName}`);
    
    // Collect variables
    const context = await collectVariables(projectNameArg, options, template.manifest.vars);
    
    // Validate project name
    const projectName = context.projectName as string;
    if (!validateProjectName(projectName)) {
      const sanitized = sanitizeProjectName(projectName);
      log.warn(`Project name "${projectName}" is invalid. Using "${sanitized}" instead.`);
      context.projectName = sanitized;
    }
    
    // Determine target directory
    const targetDir = path.resolve(options.dir || `./${context.projectName}`);
    
    // Create target directory and check if empty
    if (await fs.pathExists(targetDir)) {
      if (!(await fs.isDirEmpty(targetDir))) {
        log.error(`Directory is not empty: ${targetDir}`);
        process.exit(1);
      }
    } else {
      await fs.ensureDir(targetDir);
    }
    
    log.info(`Creating project in: ${targetDir}`);
    
    // Create conditional context for processing templates
    const conditionalContext: ConditionalContext = {
      router: context.router === "yes",
      tailwind: context.tailwind === "yes" || (context.tailwind === undefined && (template.id === "portfolio-react" || template.id === "personal-blog" || template.id === "landing-page")),
      testing: context.testing === "yes",
      darkMode: context.darkMode === "yes",
      blog: context.blog === "yes",
      animations: context.animations === "yes",
      analytics: context.analytics === "yes",
    };
    
    log.debug(`Conditional context: ${JSON.stringify(conditionalContext)}`);
    log.debug(`Variable context tailwind: ${context.tailwind}`);
    
    // Copy and process template files
    await copyTemplate(template, targetDir, context, conditionalContext);
    
    // Ensure .gitignore has required entries
    await ensureGitignore(targetDir);
    
    // Load and execute hooks
    const hooks = await loadHooks(template.path);
    if (hooks) {
      await executeHooks(hooks, context, targetDir);
      printHookMessages(hooks, context);
    }
    
    // Success message
    log.nl();
    log.success(`🎉 Your portfolio "${context.projectName}" is ready!`);
    
    // Interactive post-creation flow
    await postCreationFlow(targetDir, context, options);
    
  } catch (error) {
    log.nl();
    log.error("❌ Something went wrong creating your project.");
    log.info("💡 Try running the command again, or check if you have enough disk space.");
    if (options.debug) {
      log.debug(`Error details: ${error}`);
    }
    process.exit(1);
  }
}

async function listTemplates() {
  const templates = await discoverTemplates();
  
  if (templates.length === 0) {
    log.warn("No templates found");
    return;
  }
  
  log.title("Available templates:");
  log.nl();
  
  for (const template of templates) {
    log.info(`${template.id}`);
    log.step(`${template.displayName} (v${template.version})`);
  }
}

async function showTemplateInfo(templateId: string) {
  const template = await findTemplate(templateId);
  
  if (!template) {
    log.error(`Template not found: ${templateId}`);
    return;
  }
  
  log.title(`Template: ${template.displayName}`);
  log.info(`ID: ${template.id}`);
  log.info(`Version: ${template.version}`);
  
  if (template.manifest.requires?.node) {
    log.info(`Requires Node: ${template.manifest.requires.node}`);
  }
  
  if (template.manifest.vars.length > 0) {
    log.nl();
    log.title("Variables:");
    
    for (const variable of template.manifest.vars) {
      const name = variable.name;
      const prompt = variable.prompt || variable.name;
      const defaultValue = variable.default || "(no default)";
      const type = variable.type || "text";
      
      log.info(`${name}: ${prompt}`);
      log.step(`Type: ${type}, Default: ${defaultValue}`);
      
      if (variable.choices) {
        log.step(`Choices: ${variable.choices.join(", ")}`);
      }
    }
  }
}

async function resolveTemplate(
  templateOption: string | undefined,
  templates: Awaited<ReturnType<typeof discoverTemplates>>,
  nonInteractive: boolean | undefined
): Promise<string> {
  if (templateOption) {
    return templateOption;
  }
  
  if (templates.length === 1) {
    return templates[0].id;
  }
  
  if (nonInteractive) {
    log.error("Template must be specified in non-interactive mode");
    process.exit(1);
  }
  
  const response = await prompts({
    type: "select",
    name: "template",
    message: "Select a template:",
    choices: templates.map(t => ({
      title: t.displayName,
      value: t.id,
      description: `v${t.version}`,
    })),
  });
  
  if (!response.template) {
    log.error("Template selection cancelled");
    process.exit(1);
  }
  
  return response.template;
}

function evaluateWhenCondition(condition: string, context: VariableContext): boolean {
  // Simple condition evaluation for "variable == value" format
  const match = condition.match(/^(\w+)\s*==\s*(.+)$/);
  if (match) {
    const [, variableName, expectedValue] = match;
    const actualValue = context[variableName];
    return actualValue === expectedValue.trim();
  }
  
  // If condition format is not recognized, default to true
  log.debug(`Unrecognized when condition format: ${condition}`);
  return true;
}

async function collectVariables(
  projectNameArg: string | undefined,
  options: InitOptions,
  variables: TemplateVariable[]
): Promise<VariableContext> {
  const context: VariableContext = {};
  
  for (const variable of variables) {
    // Check if this variable should be prompted based on 'when' condition
    if (variable.when) {
      const shouldPrompt = evaluateWhenCondition(variable.when, context);
      if (!shouldPrompt) {
        // Skip this variable if the condition is not met
        continue;
      }
    }
    
    let value: string | undefined;
    
    // Get value from argument (for projectName)
    if (variable.name === "projectName" && projectNameArg) {
      value = projectNameArg;
    }
    
    // Get value from options
    if (!value && options[variable.name as keyof InitOptions]) {
      value = String(options[variable.name as keyof InitOptions]);
    }
    
    // Get value from name option (for projectName)
    if (!value && variable.name === "projectName" && options.name) {
      value = options.name;
    }
    
    // Use default if --yes flag is used
    if (!value && options.yes && variable.default) {
      value = variable.default;
    }
    
    // Prompt for missing values
    if (!value) {
      if (options.nonInteractive) {
        log.error(`Missing required variable: ${variable.name}`);
        process.exit(1);
      }
      
      const promptConfig: prompts.PromptObject = {
        type: variable.type === "choice" ? "select" : "text",
        name: "value",
        message: variable.prompt || `Enter ${variable.name}:`,
        initial: variable.default,
      };
      
      if (variable.type === "choice" && variable.choices) {
        promptConfig.choices = variable.choices.map((choice, index) => ({
          title: choice,
          value: choice,
          selected: choice === variable.default
        }));
        
        // Set initial to the index of the default choice
        const defaultIndex = variable.choices.findIndex(choice => choice === variable.default);
        if (defaultIndex >= 0) {
          promptConfig.initial = defaultIndex;
        }
      }
      
      const response = await prompts(promptConfig, {
        onCancel: () => {
          log.error("Input cancelled");
          process.exit(1);
        }
      });
      
      // Debug logging (temporary)
      if (options.debug) {
        log.debug(`Prompt response for ${variable.name}: ${JSON.stringify(response)}`);
        log.debug(`Response value: ${response.value}`);
        log.debug(`Variable default: ${variable.default}`);
      }
      
      // Use the response value or fall back to default
      value = response.value !== undefined ? response.value : variable.default;
    }
    
    // Validate pattern if provided
    if (value && variable.pattern) {
      const regex = new RegExp(variable.pattern);
      if (!regex.test(value)) {
        log.error(getPatternErrorMessage(value, variable.pattern, variable.name));
        process.exit(1);
      }
    }
    
    context[variable.name] = value || variable.default || "";
  }
  
  return context;
}

async function copyTemplate(
  template: Awaited<ReturnType<typeof findTemplate>>,
  targetDir: string,
  context: VariableContext,
  conditionalContext: ConditionalContext
) {
  if (!template) return;
  
  const templateDir = getTemplateDir(template);
  
  log.info("Copying template files...");
  
  // Copy template files with conditional processing
  const files = await fs.walkDir(templateDir);
  
  for (const srcFile of files) {
    const relativePath = path.relative(templateDir, srcFile);
    const destPath = path.join(targetDir, relativePath);
    
    // Render variables in file path
    const processedDestPath = renderPath(relativePath, context);
    const finalDestPath = path.join(targetDir, processedDestPath);
    
    // Check if file should be written based on conditionals
    if (!shouldWriteFile(processedDestPath, conditionalContext)) {
      log.debug(`Skipping conditional file: ${processedDestPath}`);
      continue;
    }
    
    if (fs.isBinaryFile(srcFile)) {
      log.debug(`Copying binary file: ${relativePath}`);
      await fs.copyFile(srcFile, finalDestPath);
    } else {
      log.debug(`Processing text file: ${relativePath}`);
      let content = await fs.readTextFile(srcFile);
      
      // Handle handlebars-style conditionals (for package.json)
      if (srcFile.endsWith("package.json")) {
        content = processHandlebarsConditionals(content, conditionalContext);
      }
      
      // Handle variable-based handlebars conditionals (for config files)
      if (srcFile.endsWith("tailwind.config.cjs") || srcFile.endsWith("tailwind.config.js")) {
        content = processVariableHandlebarsConditionals(content, context);
      }
      
      // Process comment-style conditionals
      content = processConditionals(content, conditionalContext);
      
      // Render variables
      content = renderVariables(content, context);
      
      await fs.writeTextFile(finalDestPath, content);
    }
  }
}

async function ensureGitignore(targetDir: string) {
  const gitignorePath = path.join(targetDir, ".gitignore");
  
  const requiredEntries = [
    "node_modules",
    "dist",
    ".env*",
    ".DS_Store"
  ];
  
  let content = "";
  if (await fs.pathExists(gitignorePath)) {
    content = await fs.readTextFile(gitignorePath);
  }
  
  const lines = content.split("\n");
  let modified = false;
  
  for (const entry of requiredEntries) {
    if (!lines.includes(entry)) {
      lines.push(entry);
      modified = true;
    }
  }
  
  if (modified) {
    await fs.writeTextFile(gitignorePath, lines.join("\n"));
  }
}

async function postCreationFlow(targetDir: string, context: VariableContext, options: InitOptions) {
  // Print initial next steps
  log.nl();
  log.title("🚀 Get started:");
  log.info(`  📁 Navigate to your project: cd ${path.relative(process.cwd(), targetDir)}`);
  log.info("  📝 Then customize your content in src/data/portfolio.ts");
  
  // Option 1: Open in code editor
  log.nl();
  log.title("💻 Code Editor Options:");
  log.info("You can now open your project directory in VS Code or your preferred code editor to start customizing!");
  
  if (!options.nonInteractive && !options.yes) {
    const editorResponse = await prompts({
      type: "select",
      name: "editor",
      message: "Would you like to open the project in a code editor?",
      choices: [
        { title: "Open in VS Code", value: "vscode" },
        { title: "Open in current directory (for terminal editors)", value: "terminal" },
        { title: "Skip - I'll open it myself", value: "skip" }
      ],
      initial: 0
    });

    if (editorResponse.editor === "vscode") {
      await openInVSCode(targetDir);
    } else if (editorResponse.editor === "terminal") {
      log.info(`Opening terminal in project directory...`);
      // Change to the target directory
      process.chdir(targetDir);
      log.success(`Current directory changed to: ${targetDir}`);
    }
  }
  
  // Option 2: Gemini CLI for AI assistance
  log.nl();
  log.title("🤖 AI Assistant Option:");
  log.info("Need help customizing your project? You can use Gemini CLI to get AI assistance!");
  
  if (!options.nonInteractive && !options.yes) {
    const aiResponse = await prompts({
      type: "confirm",
      name: "useAI",
      message: "Would you like to use Gemini CLI for AI assistance with customization?",
      initial: false
    });

    if (aiResponse.useAI) {
      log.nl();
      log.title("🚀 Gemini CLI Setup:");
      log.info("You can install and use Gemini CLI to get AI help with your project:");
      log.info("  📦 Quick run: npx https://github.com/google-gemini/gemini-cli");
      log.info("  🌐 Or install globally: npm install -g @google/gemini-cli");
      log.info("  💡 After installation, you can ask AI to help modify your data and components!");
      
      const runNowResponse = await prompts({
        type: "confirm",
        name: "runNow",
        message: "Would you like to run Gemini CLI now?",
        initial: true
      });

      if (runNowResponse.runNow) {
        log.info("🔄 Running Gemini CLI...");
        try {
          await runGeminiCLI(targetDir);
        } catch (error) {
          log.warn("⚠️ Could not run Gemini CLI automatically. You can run it manually later:");
          log.info("  npx https://github.com/google-gemini/gemini-cli");
        }
      }
    }
  }
  
  // Option 3: Development server
  log.nl();
  log.title("🌐 Development Server:");
  
  if (!options.nonInteractive && !options.yes) {
    const devResponse = await prompts({
      type: "confirm",
      name: "startDev",
      message: "Would you like to start the development server now?",
      initial: true
    });

    if (devResponse.startDev) {
      log.info("🚀 Starting development server...");
      await runDevServer(targetDir);
    } else {
      log.info("You can start the development server later with: npm run dev");
    }
  } else {
    log.info("You can start the development server with: npm run dev");
  }
  
  // Option 4: Deployment
  log.nl();
  log.title("🚀 Deployment Options:");
  
  if (!options.nonInteractive && !options.yes) {
    const deployResponse = await prompts({
      type: "select",
      name: "deploy",
      message: "Would you like to set up deployment for your project?",
      choices: [
        { title: "Set up Vercel deployment", value: "vercel" },
        { title: "Set up Netlify deployment", value: "netlify" },
        { title: "Set up Cloudflare Pages deployment", value: "cloudflare" },
        { title: "Skip deployment for now", value: "skip" }
      ],
      initial: 3
    });

    if (deployResponse.deploy !== "skip") {
      log.nl();
      log.title(`🌍 ${deployResponse.deploy.charAt(0).toUpperCase() + deployResponse.deploy.slice(1)} Deployment:`);
      
      switch (deployResponse.deploy) {
        case "vercel":
          log.info("To deploy with Vercel:");
          log.info("  1. Install Vercel CLI: npm i -g vercel");
          log.info("  2. Run: vercel");
          log.info("  3. Follow the prompts to deploy your project");
          break;
        case "netlify":
          log.info("To deploy with Netlify:");
          log.info("  1. Install Netlify CLI: npm i -g netlify-cli");
          log.info("  2. Run: netlify deploy");
          log.info("  3. Follow the prompts to deploy your project");
          break;
        case "cloudflare":
          log.info("To deploy with Cloudflare Pages:");
          log.info("  1. Install Wrangler CLI: npm i -g wrangler");
          log.info("  2. Run: wrangler pages project create");
          log.info("  3. Follow the prompts to deploy your project");
          break;
      }
    }
  }
  
  // Final message
  log.nl();
  log.success("🎉 All set! Happy coding!");
}

async function openInVSCode(targetDir: string) {
  return new Promise<void>((resolve) => {
    try {
      log.info("Opening in VS Code...");
      
      const child = spawn("code", [targetDir], {
        stdio: "ignore",
        detached: true
      });
      
      // Handle success case
      child.on("spawn", () => {
        log.success("✅ Project opened in VS Code!");
        child.unref();
        resolve();
      });
      
      // Handle error case (e.g., VS Code not installed or 'code' command not in PATH)
      child.on("error", (error: NodeJS.ErrnoException) => {
        log.warn("💡 Couldn't open VS Code automatically. You can open your project folder manually in any code editor!");
        if (error.code === "ENOENT") {
          log.info("   Tip: Make sure VS Code is installed and the 'code' command is available in your PATH.");
          log.info("   You can install the VS Code command by opening VS Code and running:");
          log.info("   Command Palette (Cmd+Shift+P) → 'Shell Command: Install code command in PATH'");
        }
        resolve();
      });
      
    } catch (error) {
      log.warn("💡 Couldn't open VS Code automatically. You can open your project folder manually in any code editor!");
      resolve();
    }
  });
}

async function runGeminiCLI(targetDir: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn("npx", ["https://github.com/google-gemini/gemini-cli"], {
      cwd: targetDir,
      stdio: "inherit"
    });
    
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Gemini CLI exited with code ${code}`));
      }
    });
    
    child.on("error", (error) => {
      reject(error);
    });
  });
}

async function runDevServer(targetDir: string) {
  try {
    log.info("Installing dependencies first...");
    
    // Install dependencies first
    const installChild = spawn("npm", ["install"], {
      cwd: targetDir,
      stdio: "inherit"
    });
    
    await new Promise<void>((resolve, reject) => {
      installChild.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`npm install failed with code ${code}`));
        }
      });
      
      installChild.on("error", reject);
    });
    
    log.success("✅ Dependencies installed!");
    log.info("🌐 Starting development server...");
    
    // Start dev server
    const devChild = spawn("npm", ["run", "dev"], {
      cwd: targetDir,
      stdio: "inherit"
    });
    
    log.info("🚀 Development server is starting...");
    log.info("💡 Press Ctrl+C to stop the server when you're done");
    
  } catch (error) {
    log.warn("⚠️ Could not start development server automatically. You can start it manually with:");
    log.info(`  cd ${path.relative(process.cwd(), targetDir)}`);
    log.info("  npm install");
    log.info("  npm run dev");
  }
}
