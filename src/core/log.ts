import { cyan, green, red, yellow, dim, bold } from "kleur/colors";

let debugEnabled = false;

export function setDebug(enabled: boolean) {
  debugEnabled = enabled;
}

export function debug(message: string) {
  if (debugEnabled) {
    console.log(dim(`[DEBUG] ${message}`));
  }
}

export function info(message: string) {
  console.log(cyan(message));
}

export function success(message: string) {
  console.log(green(`✓ ${message}`));
}

export function warn(message: string) {
  console.log(yellow(`⚠ ${message}`));
}

export function error(message: string) {
  console.log(red(`✗ ${message}`));
}

export function title(message: string) {
  console.log(bold(message));
}

export function step(message: string) {
  console.log(dim(`→ ${message}`));
}

export function nl() {
  console.log();
}
