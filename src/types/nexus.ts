export interface NexusTokens {
  primary: string;
  secondary: string;
  danger: string;
  success: string;
  radius: string;
  font: string;
  scales?: {
    radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    spacing: 'compact' | 'normal' | 'relaxed';
    shadows: 'none' | 'soft' | 'strong';
  };
}

export interface NexusBackendConfig {
  framework: string;
  database: string;
  orm: string;
}

export interface NexusConfig {
  lang: 'es' | 'en';
  modules?: string[];
  framework: string;
  styling: string;
  output: string;
  backend?: NexusBackendConfig;
  testing?: {
    scope: 'frontend' | 'backend' | 'full-stack';
  };
  tokens: NexusTokens;
  icons: {
    library: string;
  };
  standards?: string[];
}
