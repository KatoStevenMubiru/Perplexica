
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';

const configFileName = 'config.toml';

interface Config {
  GENERAL: {
    PORT: number;
    SIMILARITY_MEASURE: string;
  };
  API_KEYS: {
    OPENAI: string;
    GROQ: string;
    UNIFY: string; // Added Unify API Key
  };
  API_ENDPOINTS: {
    SEARXNG: string;
    OLLAMA: string;
    UNIFY: string; // Added Unify API Endpoint
  };
}

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]>; };

const loadConfig = () => toml.parse(
  fs.readFileSync(path.join(__dirname, `../${configFileName}`), 'utf-8'),
) as any as Config;

export const getPort = () => loadConfig().GENERAL.PORT;

export const getSimilarityMeasure = () => loadConfig().GENERAL.SIMILARITY_MEASURE;

export const getOpenaiApiKey = () => loadConfig().API_KEYS.OPENAI;

export const getGroqApiKey = () => loadConfig().API_KEYS.GROQ;

export const getUnifyApiKey = () => loadConfig().API_KEYS.UNIFY; // Added Unify API Key function

export const getSearxngApiEndpoint = () => loadConfig().API_ENDPOINTS.SEARXNG;

export const getOllamaApiEndpoint = () => loadConfig().API_ENDPOINTS.OLLAMA;

export const getUnifyApiEndpoint = () => loadConfig().API_ENDPOINTS.UNIFY; // Added Unify API Endpoint function

export const updateConfig = (config: RecursivePartial<Config>) => {
  const currentConfig = loadConfig();
  for (const key in currentConfig) {
    if (!config[key]) config[key] = {};
    if (typeof currentConfig[key] === 'object' && currentConfig[key] !== null) {
      for (const nestedKey in currentConfig[key]) {
        if (!config[key][nestedKey] && currentConfig[key][nestedKey] && config[key][nestedKey] !== '') {
          config[key][nestedKey] = currentConfig[key][nestedKey];
        }
      }
    } else if (currentConfig[key] && config[key] !== '') {
      config[key] = currentConfig[key];
    }
  }
  fs.writeFileSync(
    path.join(__dirname, `../${configFileName}`),
    toml.stringify(config),
  );
};

