import { execSync } from "child_process";
import semver from "semver";
import * as log from "../core/log.js";
import * as fs from "../core/fs.js";
import { getTemplatesDir } from "../core/templates.js";

export async function doctorCommand() {
  log.title("🔍 System Check");
  log.nl();
  
  let hasIssues = false;
  
  // Check Node.js version
  log.info("Node.js version:");
  try {
    const nodeVersion = process.version;
    log.step(`Found: ${nodeVersion}`);
    
    if (semver.gte(nodeVersion, "18.17.0")) {
      log.success("Node.js version is compatible");
    } else {
      log.error("Node.js version is too old. Requires >=18.17.0");
      hasIssues = true;
    }
  } catch {
    log.error("Failed to check Node.js version");
    hasIssues = true;
  }
  
  log.nl();
  
  // Check git availability
  log.info("Git availability:");
  try {
    const gitVersion = execSync("git --version", { encoding: "utf8", stdio: "pipe" });
    log.step(`Found: ${gitVersion.trim()}`);
    log.success("Git is available");
  } catch {
    log.warn("Git is not available. Post-create hooks may fail.");
    log.step("Install git: https://git-scm.com/downloads");
  }
  
  log.nl();
  
  // Check templates directory
  log.info("Templates directory:");
  const templatesDir = getTemplatesDir();
  log.step(`Path: ${templatesDir}`);
  
  if (await fs.pathExists(templatesDir)) {
    if (await fs.isDirectory(templatesDir)) {
      log.success("Templates directory exists and is readable");
      
      // List available templates
      try {
        const { discoverTemplates } = await import("../core/templates.js");
        const templates = await discoverTemplates();
        
        if (templates.length > 0) {
          log.step(`Found ${templates.length} template(s):`);
          for (const template of templates) {
            log.step(`  - ${template.id} (${template.displayName})`);
          }
        } else {
          log.warn("No templates found in templates directory");
          hasIssues = true;
        }
      } catch {
        log.error("Failed to scan templates");
        hasIssues = true;
      }
    } else {
      log.error("Templates path exists but is not a directory");
      hasIssues = true;
    }
  } else {
    log.error("Templates directory not found");
    hasIssues = true;
  }
  
  log.nl();
  
  // Check write permissions to current directory
  log.info("Write permissions:");
  const currentDir = process.cwd();
  log.step(`Testing write access to: ${currentDir}`);
  
  if (await fs.canWriteToDir(currentDir)) {
    log.success("Can write to current directory");
  } else {
    log.error("Cannot write to current directory");
    hasIssues = true;
  }
  
  log.nl();
  
  // Check package managers
  log.info("Package managers:");
  
  const packageManagers = [
    { name: "npm", command: "npm --version" },
    { name: "yarn", command: "yarn --version" },
    { name: "pnpm", command: "pnpm --version" },
  ];
  
  let hasPackageManager = false;
  
  for (const pm of packageManagers) {
    try {
      const version = execSync(pm.command, { encoding: "utf8", stdio: "pipe" });
      log.step(`${pm.name}: ${version.trim()}`);
      hasPackageManager = true;
    } catch {
      log.step(`${pm.name}: not available`);
    }
  }
  
  if (hasPackageManager) {
    log.success("At least one package manager is available");
  } else {
    log.error("No package manager found. Install npm, yarn, or pnpm.");
    hasIssues = true;
  }
  
  log.nl();
  
  // Summary
  if (hasIssues) {
    log.error("⚠ Issues found. Please resolve them before using create-projex.");
    process.exit(1);
  } else {
    log.success("✅ All checks passed! create-projex is ready to use.");
  }
}
