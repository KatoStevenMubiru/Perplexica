export const getUnifyApiKey = (): string => {
    return process.env.UNIFY_API_KEY || '';
  };
  
  export const getUnifyApiEndpoint = (): string => {
    return process.env.UNIFY_API_ENDPOINT || 'https://api.unify.ai/v0/chat/completions';
  };