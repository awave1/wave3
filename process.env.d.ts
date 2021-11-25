declare namespace NodeJS {
  export interface ProcessEnv {
    ALCHEMY_API_URL: string;
    PRIVATE_KEY: string;
    NODE_ENV: "development" | "production";
  }
}
