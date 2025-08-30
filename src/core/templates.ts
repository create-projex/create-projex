import path from "path";
import { fileURLToPath } from "url";
import { readTextFile, pathExists, walkDir, isDirectory } from "./fs.js";
import type { TemplateCatalog, TemplateManifest } from "../types.js";
import * as log from "./log.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the templates directory path
 */
export function getTemplatesDir(): string {
  // Go up from src/core to root, then to templates
  return path.resolve(__dirname, "../../templates");
}

/**
 * Discover all available templates
 */
export async function discoverTemplates(): Promise<TemplateCatalog[]> {
  const templatesDir = getTemplatesDir();
  const catalog: TemplateCatalog[] = [];
  
  log.debug(`Looking for templates in: ${templatesDir}`);
  
  if (!(await pathExists(templatesDir))) {
    log.warn(`Templates directory not found: ${templatesDir}`);
    return catalog;
  }
  
  try {
    const entries = await import("fs").then(fs => fs.promises.readdir(templatesDir, { withFileTypes: true }));
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const templatePath = path.join(templatesDir, entry.name);
        const manifestPath = path.join(templatePath, "myproj.json");
        
        if (await pathExists(manifestPath)) {
          try {
            const manifestContent = await readTextFile(manifestPath);
            const manifest: TemplateManifest = JSON.parse(manifestContent);
            
            catalog.push({
              id: manifest.id,
              displayName: manifest.displayName,
              version: manifest.version,
              path: templatePath,
              manifest,
            });
            
            log.debug(`Found template: ${manifest.id} (${manifest.displayName})`);
          } catch (error) {
            log.warn(`Invalid template manifest at ${manifestPath}: ${error}`);
          }
        }
      }
    }
  } catch (error) {
    log.warn(`Failed to read templates directory: ${error}`);
  }
  
  return catalog;
}

/**
 * Find a template by ID
 */
export async function findTemplate(templateId: string): Promise<TemplateCatalog | null> {
  const templates = await discoverTemplates();
  return templates.find(t => t.id === templateId) ?? null;
}

/**
 * Get template directory (the 'template' subfolder)
 */
export function getTemplateDir(templateCatalog: TemplateCatalog): string {
  return path.join(templateCatalog.path, "template");
}

/**
 * Validate that a template directory exists and is readable
 */
export async function validateTemplate(templateCatalog: TemplateCatalog): Promise<boolean> {
  const templateDir = getTemplateDir(templateCatalog);
  
  if (!(await pathExists(templateDir))) {
    log.error(`Template directory not found: ${templateDir}`);
    return false;
  }
  
  if (!(await isDirectory(templateDir))) {
    log.error(`Template path is not a directory: ${templateDir}`);
    return false;
  }
  
  try {
    await walkDir(templateDir);
    return true;
  } catch (error) {
    log.error(`Cannot read template directory ${templateDir}: ${error}`);
    return false;
  }
}

/**
 * List all template files (for debugging)
 */
export async function listTemplateFiles(templateCatalog: TemplateCatalog): Promise<string[]> {
  const templateDir = getTemplateDir(templateCatalog);
  const files = await walkDir(templateDir);
  
  return files.map(file => path.relative(templateDir, file));
}
