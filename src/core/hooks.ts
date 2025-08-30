import path from "path";
import { spawn } from "child_process";
import { parse as parseYaml } from "yaml";
import { readTextFile, pathExists } from "./fs.js";
import { renderVariables } from "./variables.js";
import type { HooksConfig, VariableContext } from "../types.js";
import * as log from "./log.js";

// Whitelist of safe commands that can be executed
const SAFE_COMMANDS = new Set([
  "npm install",
  "npm ci",
  "npm i",
  "yarn install",
  "yarn",
  "pnpm install",
  "pnpm i",
  "git init",
  "git add",
  "git commit",
]);

/**
 * Check if a command is safe to execute
 */
function isSafeCommand(command: string): boolean {
  const cmd = command.trim().toLowerCase();
  
  // Check exact matches first
  if (SAFE_COMMANDS.has(cmd)) {
    return true;
  }
  
  // Check patterns for git commit with messages
  if (cmd.startsWith("git commit -m ")) {
    return true;
  }
  
  // Check for npm/yarn/pnpm with || fallback
  if (cmd.includes(" || ")) {
    const parts = cmd.split(" || ");
    return parts.every(part => isSafeCommand(part.trim()));
  }
  
  return false;
}

/**
 * Execute a command safely
 */
async function executeCommand(command: string, cwd: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Show user-friendly messages instead of technical command
    if (command.includes("npm ci") || command.includes("npm install")) {
      log.info("📦 Installing dependencies... (this may take a moment)");
    } else if (command.includes("git init")) {
      log.info("🔧 Setting up git repository...");
    } else {
      log.step(`→ Running: ${command}`);
    }
    
    const child = spawn(command, {
      shell: true,
      cwd,
      stdio: ["inherit", "pipe", "pipe"], // Capture stdout and stderr
    });
    
    let hasNpmSuccess = false;
    
    // Handle stdout (regular output)
    child.stdout?.on("data", (data) => {
      const output = data.toString();
      
      // Filter out technical npm messages and show user-friendly ones
      if (output.includes("npm error") && output.includes("EUSAGE")) {
        // This is the npm ci fallback - don't show scary error
        return;
      }
      
      if (output.includes("added") && output.includes("packages")) {
        hasNpmSuccess = true;
        const matches = output.match(/added (\d+) packages/);
        const packageCount = matches ? matches[1] : "packages";
        log.success(`✅ Successfully installed ${packageCount} packages!`);
        return;
      }
      
      // Skip security audit output (too technical for non-tech users)
      if (output.includes("vulnerabilities") || output.includes("npm audit")) {
        return;
      }
      
      // Show other non-error output
      if (!output.includes("npm error") && !output.includes("npm WARN")) {
        process.stdout.write(output);
      }
    });
    
    // Handle stderr (error output) 
    child.stderr?.on("data", (data) => {
      const output = data.toString();
      
      // Don't show scary npm ci error - it's expected
      if (output.includes("npm error code EUSAGE") || 
          output.includes("npm ci") ||
          output.includes("package-lock.json") ||
          output.includes("Run \"npm help ci\"")) {
        return;
      }
      
      // Skip npm warnings that are too technical
      if (output.includes("npm WARN") || output.includes("npm error")) {
        return;
      }
      
      // Show other important errors
      process.stderr.write(output);
    });
    
    child.on("exit", (code) => {
      if (code === 0) {
        if (command.includes("npm") && !hasNpmSuccess) {
          log.success("✅ Dependencies are ready!");
        }
        resolve(true);
      } else {
        if (command.includes("npm")) {
          log.error("❌ Failed to install dependencies. Please check your internet connection and try again.");
        } else {
          log.warn(`Command failed: ${command}`);
        }
        resolve(false);
      }
    });
    
    child.on("error", (error) => {
      log.error(`❌ Failed to run command: ${error.message}`);
      resolve(false);
    });
  });
}

/**
 * Load hooks configuration from hooks.yaml
 */
export async function loadHooks(templatePath: string): Promise<HooksConfig | null> {
  const hooksPath = path.join(templatePath, "hooks.yaml");
  
  if (!(await pathExists(hooksPath))) {
    log.debug("No hooks.yaml found");
    return null;
  }
  
  try {
    const content = await readTextFile(hooksPath);
    const hooks = parseYaml(content) as HooksConfig;
    log.debug(`Loaded hooks from ${hooksPath}`);
    return hooks;
  } catch (error) {
    log.warn(`Failed to parse hooks.yaml: ${error}`);
    return null;
  }
}

/**
 * Execute hooks with variable substitution
 */
export async function executeHooks(
  hooks: HooksConfig,
  context: VariableContext,
  targetDir: string
): Promise<void> {
  // Run install hooks
  if (hooks.install) {
    log.info("Running installation hooks...");
    
    for (const hook of hooks.install) {
      if (hook.run) {
        const command = renderVariables(hook.run, context);
        
        if (!isSafeCommand(command)) {
          if (command.includes("git")) {
            log.info("ℹ️  Git repository setup skipped for security. You can run 'git init' manually if needed.");
          } else {
            log.warn(`⚠️  Skipped potentially unsafe command for your security`);
          }
          continue;
        }
        
        const success = await executeCommand(command, targetDir);
        if (!success) {
          if (command.includes("npm")) {
            log.warn("⚠️  Dependency installation had issues, but your project should still work.");
          } else if (command.includes("git")) {
            log.warn("ℹ️  Git setup had issues, but you can set it up manually later.");
          } else {
            log.warn(`⚠️  Setup step had issues: ${command}`);
          }
        }
      }
    }
  }
  
  // Run git hooks
  if (hooks.git) {
    log.info("Running git hooks...");
    
    for (const hook of hooks.git) {
      if (hook.run) {
        const command = renderVariables(hook.run, context);
        
        if (!isSafeCommand(command)) {
          if (command.includes("git")) {
            log.info("ℹ️  Git repository setup skipped for security. You can run 'git init' manually if needed.");
          } else {
            log.warn(`⚠️  Skipped potentially unsafe command for your security`);
          }
          continue;
        }
        
        const success = await executeCommand(command, targetDir);
        if (!success) {
          if (command.includes("npm")) {
            log.warn("⚠️  Dependency installation had issues, but your project should still work.");
          } else if (command.includes("git")) {
            log.warn("ℹ️  Git setup had issues, but you can set it up manually later.");
          } else {
            log.warn(`⚠️  Setup step had issues: ${command}`);
          }
        }
      }
    }
  }
}

/**
 * Print notes and deploy instructions
 */
export function printHookMessages(
  hooks: HooksConfig,
  context: VariableContext
): void {
  // Print notes
  if (hooks.notes) {
    log.nl();
    log.title("📝 Next Steps:");
    
    for (const note of hooks.notes) {
      if (note.text) {
        const text = renderVariables(note.text, context);
        log.info(text);
      }
    }
  }
  
  // Print deploy instructions
  if (hooks.deploy) {
    const deployContext = context.deploy as string;
    
    if (deployContext && deployContext !== "none") {
      log.nl();
      log.title("🚀 Deploy Instructions:");
      
      for (const deployHook of hooks.deploy) {
        if (deployHook.when && deployHook.text) {
          const condition = renderVariables(deployHook.when, context);
          
          // Simple string equality check
          if (condition === "true" || condition.includes(deployContext)) {
            const text = renderVariables(deployHook.text, context);
            log.info(text);
          }
        }
      }
    }
  }
}


