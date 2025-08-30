import { Command } from "commander";
import * as log from "../core/log.js";
import { discoverTemplates, findTemplate } from "../core/templates.js";

export const templatesCommand = new Command("templates");

// List subcommand
templatesCommand
  .command("list")
  .description("List all available templates")
  .action(async () => {
    try {
      const templates = await discoverTemplates();
      
      if (templates.length === 0) {
        log.warn("No templates found");
        return;
      }
      
      log.title("Available Templates:");
      log.nl();
      
      for (const template of templates) {
        log.info(`${template.id}`);
        log.step(`${template.displayName} (v${template.version})`);
      }
    } catch (error) {
      log.error(`Failed to list templates: ${error}`);
      process.exit(1);
    }
  });

// Info subcommand
templatesCommand
  .command("info")
  .description("Show detailed information about a template")
  .argument("<template-id>", "Template ID to show info for")
  .action(async (templateId: string) => {
    try {
      const template = await findTemplate(templateId);
      
      if (!template) {
        log.error(`Template not found: ${templateId}`);
        process.exit(1);
      }
      
      log.title(`Template: ${template.displayName}`);
      log.nl();
      
      log.info(`ID: ${template.id}`);
      log.info(`Version: ${template.version}`);
      log.info(`Path: ${template.path}`);
      
      if (template.manifest.requires?.node) {
        log.info(`Node requirement: ${template.manifest.requires.node}`);
      }
      
      if (template.manifest.vars.length > 0) {
        log.nl();
        log.title("Variables:");
        
        for (const variable of template.manifest.vars) {
          const name = variable.name;
          const prompt = variable.prompt || variable.name;
          const type = variable.type || "text";
          const defaultValue = variable.default || "(none)";
          
          log.info(`${name}:`);
          log.step(`Prompt: ${prompt}`);
          log.step(`Type: ${type}`);
          log.step(`Default: ${defaultValue}`);
          
          if (variable.choices) {
            log.step(`Choices: ${variable.choices.join(", ")}`);
          }
          
          if (variable.pattern) {
            log.step(`Pattern: ${variable.pattern}`);
          }
          
          log.nl();
        }
      }
      
      if (template.manifest.postCreate?.safe) {
        log.title("Post-create hooks:");
        for (const command of template.manifest.postCreate.safe) {
          log.step(command);
        }
        log.nl();
      }
      
    } catch (error) {
      log.error(`Failed to get template info: ${error}`);
      process.exit(1);
    }
  });
