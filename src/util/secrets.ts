const REQUIRED_VARS = ["REACT_APP_API_URL"];

REQUIRED_VARS.forEach((key: string) => {
  if (!process.env[key]) {
    console.error(`Required ENV variable not found: ${key}`);
    process.exit(1);
  }
});

export const ENVIRONMENT = process.env.NODE_ENV;
export const API_URL = process.env["REACT_APP_API_URL"];
