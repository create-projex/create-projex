#!/usr/bin/env node

import { Command } from "commander";
import { setDebug } from "./core/log.js";
import { initCommand } from "./commands/init.js";
import { templatesCommand } from "./commands/templates.js";
import { doctorCommand } from "./commands/doctor.js";

const program = new Command();

program
  .name("create-projex")
  .description("A CLI tool to scaffold projects from local templates")
  .version("0.1.0")
  .option("--debug", "Enable debug logging")
  .hook("preAction", (thisCommand) => {
    const opts = thisCommand.opts();
    if (opts.debug) {
      setDebug(true);
    }
  });

// Default command - init
program
  .argument("[project-name]", "Name of the project to create")
  .option("-t, --template <id>", "Template ID to use")
  .option("-n, --name <name>", "Project name")
  .option("-d, --dir <path>", "Output directory")
  .option("-y, --yes", "Skip all prompts and use defaults")
  .option("--non-interactive", "Fail if any required input is missing")
  .option("--router <yes|no>", "Include React Router")
  .option("--tailwind <yes|no>", "Include Tailwind CSS")
  .option("--testing <yes|no>", "Include testing setup")
  .option("--deploy <none|vercel|netlify|cloudflare>", "Deployment target")
  .option("--fullName <name>", "Your full name")
  .option("--title <title>", "Your professional title")
  .option("--email <email>", "Your email address")
  .option("--github <username>", "GitHub username")
  .option("--linkedin <username>", "LinkedIn username")
  .option("--darkMode <yes|no>", "Include dark mode toggle")
  .option("--blog <yes|no>", "Include blog section")
  .option("--animations <yes|no>", "Include scroll animations")
  .option("--analytics <yes|no>", "Include Google Analytics")
  .option("--list", "List available templates")
  .option("--info <id>", "Show template information")
  .option("--open-vscode", "Open the created project in VS Code")
  .action(async (projectName, options) => {
    await initCommand(projectName, options);
  });

// Templates command
program
  .command("templates")
  .description("Manage templates")
  .addCommand(templatesCommand);

// Doctor command
program
  .command("doctor")
  .description("Check system requirements and setup")
  .action(async () => {
    await doctorCommand();
  });

// Parse arguments
program.parse();
