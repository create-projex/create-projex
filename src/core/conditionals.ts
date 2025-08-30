import type { ConditionalContext } from "../types.js";

/**
 * Process conditional blocks in text content
 * Supports: // #if condition, comment #if condition, // #endif, comment #endif
 * Also supports negation: // #if !condition
 */
export function processConditionals(content: string, context: ConditionalContext): string {
  const lines = content.split('\n');
  const result: string[] = [];
  const stack: { condition: string; keep: boolean }[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check for #if statements (supports both // and /* and JSX {/* */)
    const ifMatch = trimmed.match(/^(?:\/\/|\{\s*\/\*|\/\*)\s*#if\s+(!?)(\w+)(?:\s*\*\/\s*\}|\s*\*\/)?$/);
    if (ifMatch) {
      const [, negate, conditionName] = ifMatch;
      let conditionValue = context[conditionName] ?? false;
      if (negate === '!') {
        conditionValue = !conditionValue;
      }
      
      stack.push({ condition: conditionName, keep: conditionValue });
      continue; // Don't include the #if line
    }
    
    // Check for #endif statements (supports both // and /* and JSX {/* */)
    const endifMatch = trimmed.match(/^(?:\/\/|\{\s*\/\*|\/\*)\s*#endif(?:\s*\*\/\s*\}|\s*\*\/)?$/);
    if (endifMatch) {
      if (stack.length > 0) {
        stack.pop();
      }
      continue; // Don't include the #endif line
    }
    
    // Determine if we should keep this line
    const shouldKeep = stack.length === 0 || stack.every(item => item.keep);
    
    if (shouldKeep) {
      result.push(line);
    }
  }
  
  return result.join('\n');
}

/**
 * Check if a file should be written based on conditional context
 * Used for files that should only exist when certain conditions are met
 */
export function shouldWriteFile(filePath: string, context: ConditionalContext): boolean {
  // Check for specific file patterns
  if (filePath.includes('postcss.config') || filePath.includes('tailwind.config')) {
    return context.tailwind === true;
  }
  
  if (filePath.includes('test') || filePath.includes('.test.')) {
    return context.testing === true;
  }
  
  // Default: write the file
  return true;
}

/**
 * Process handlebars-style conditionals in package.json and other structured content
 * Handles {{#if condition}}, {{/if}} patterns
 */
export function processHandlebarsConditionals(content: string, context: ConditionalContext): string {
  let result = content;
  
  // Process {{#if condition}} blocks
  const ifPattern = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(ifPattern, (match, conditionName, block) => {
    const conditionValue = context[conditionName] ?? false;
    return conditionValue ? block : '';
  });
  
  return result;
}
