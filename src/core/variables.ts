import type { VariableContext } from "../types.js";

/**
 * Render {{variable}} placeholders in a string
 */
export function renderVariables(text: string, context: VariableContext): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    const value = context[varName];
    if (value === undefined) {
      return match; // Leave unchanged if variable not found
    }
    return String(value);
  });
}

/**
 * Render variables in a file path
 */
export function renderPath(filePath: string, context: VariableContext): string {
  return renderVariables(filePath, context);
}

/**
 * Validate project name against allowed pattern
 */
export function validateProjectName(name: string): boolean {
  const pattern = /^[a-z0-9-]+$/;
  return pattern.test(name);
}

/**
 * Sanitize project name to conform to pattern
 */
export function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Check if a string contains variable placeholders
 */
export function hasVariables(text: string): boolean {
  return /\{\{\w+\}\}/.test(text);
}

/**
 * Get user-friendly error message for validation patterns
 */
export function getPatternErrorMessage(value: string, pattern: string, fieldName: string = "value"): string {
  switch (pattern) {
    case "^[a-z0-9-]+$":
      const suggestedName = sanitizeProjectName(value);
      return `Project name "${value}" is invalid. Please use only:
  • Lowercase letters (a-z)
  • Numbers (0-9) 
  • Hyphens (-)
  
💡 Suggestion: Try "${suggestedName}" instead
  
Other examples: "my-portfolio", "awesome-app-2024", "portfolio123"`;

    case "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$":
      return `Email "${value}" is not valid. Please enter a valid email address like: user@example.com`;

    case "^[a-zA-Z0-9_-]+$":
      return `Username "${value}" is invalid. Please use only letters, numbers, underscores, or hyphens.`;

    case "^https?://.*":
      return `URL "${value}" is invalid. Please enter a valid URL starting with http:// or https://`;

    default:
      // Fallback for unknown patterns - still more helpful than showing regex
      return `${fieldName} "${value}" is not in the correct format. Please check the requirements and try again.`;
  }
}
