declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'production' | 'development' | 'test';
    readonly PORT: string;
    readonly SERVER_URL: string;
    readonly CORS_ORIGIN: string;
    readonly DATABASE_URL: string;
  }
}
