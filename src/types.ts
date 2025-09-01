export interface TemplateVariable {
  name: string;
  prompt?: string;
  type?: "text" | "choice";
  choices?: string[];
  default?: string;
  pattern?: string;
  when?: string;
}

export interface TemplateManifest {
  id: string;
  displayName: string;
  version: string;
  vars: TemplateVariable[];
  postCreate?: {
    safe?: string[];
    packageManager?: "npm" | "yarn" | "pnpm";
  };
  requires?: {
    node?: string;
  };
}

export interface TemplateCatalog {
  id: string;
  displayName: string;
  version: string;
  path: string;
  manifest: TemplateManifest;
}

export interface Hook {
  run?: string;
  text?: string;
  when?: string;
}

export interface HooksConfig {
  install?: Hook[];
  git?: Hook[];
  notes?: Hook[];
  deploy?: Hook[];
}

export interface InitOptions {
  template?: string;
  name?: string;
  dir?: string;
  yes?: boolean;
  nonInteractive?: boolean;
  router?: string;
  tailwind?: string;
  testing?: string;
  deploy?: string;
  fullName?: string;
  title?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  darkMode?: string;
  blog?: string;
  animations?: string;
  analytics?: string;
  list?: boolean;
  info?: string;
  debug?: boolean;
  openVscode?: boolean;
}

export interface VariableContext {
  [key: string]: string | boolean;
}

export interface ConditionalContext {
  [key: string]: boolean;
}
