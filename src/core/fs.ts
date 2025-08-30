import fs from "fs/promises";
import path from "path";
import { existsSync, statSync } from "fs";
import * as log from "./log.js";

// Binary file extensions that should not be templated
const BINARY_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".ico", ".gif", ".pdf",
  ".woff", ".woff2", ".ttf", ".otf", ".svg"
]);

export function isBinaryFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.has(ext);
}

export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create directory ${dirPath}: ${error}`);
  }
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function pathExistsSync(filePath: string): boolean {
  return existsSync(filePath);
}

export async function isDirectory(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function isDirEmpty(dirPath: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dirPath);
    return files.length === 0;
  } catch {
    return true; // If we can't read it, consider it empty
  }
}

export async function readTextFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`Failed to read file ${filePath}: ${error}`);
  }
}

export async function writeTextFile(filePath: string, content: string): Promise<void> {
  try {
    await ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, "utf8");
  } catch (error) {
    throw new Error(`Failed to write file ${filePath}: ${error}`);
  }
}

export async function copyFile(src: string, dest: string): Promise<void> {
  try {
    await ensureDir(path.dirname(dest));
    await fs.copyFile(src, dest);
  } catch (error) {
    throw new Error(`Failed to copy file from ${src} to ${dest}: ${error}`);
  }
}

export async function walkDir(dirPath: string): Promise<string[]> {
  const files: string[] = [];
  
  async function walk(currentPath: string) {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      log.warn(`Failed to read directory ${currentPath}: ${error}`);
    }
  }
  
  await walk(dirPath);
  return files;
}

export async function copyDirectory(
  srcDir: string,
  destDir: string,
  processFile?: (_srcPath: string, _destPath: string, _content: string) => Promise<string>
): Promise<void> {
  log.debug(`Copying directory from ${srcDir} to ${destDir}`);
  
  const files = await walkDir(srcDir);
  
  for (const srcFile of files) {
    const relativePath = path.relative(srcDir, srcFile);
    const destFile = path.join(destDir, relativePath);
    
    if (isBinaryFile(srcFile)) {
      log.debug(`Copying binary file: ${relativePath}`);
      await copyFile(srcFile, destFile);
    } else {
      log.debug(`Processing text file: ${relativePath}`);
      const content = await readTextFile(srcFile);
      
      if (processFile) {
        const processedContent = await processFile(srcFile, destFile, content);
        await writeTextFile(destFile, processedContent);
      } else {
        await writeTextFile(destFile, content);
      }
    }
  }
}

export async function canWriteToDir(dirPath: string): Promise<boolean> {
  try {
    const testFile = path.join(dirPath, `.write-test-${Date.now()}`);
    await fs.writeFile(testFile, "test");
    await fs.unlink(testFile);
    return true;
  } catch {
    return false;
  }
}

export function getFileSize(filePath: string): number {
  try {
    return statSync(filePath).size;
  } catch {
    return 0;
  }
}
