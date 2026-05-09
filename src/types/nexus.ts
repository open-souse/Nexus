export interface NexusTokens {
  primary: string;
  secondary: string;
  danger: string;
  success: string;
  radius: string;
  font: string;
}

export interface NexusConfig {
  lang: 'es' | 'en';
  framework: string;
  styling: string;
  output: string;
  tokens: NexusTokens;
  icons: {
    library: string;
  };
  standards?: string[];
}
