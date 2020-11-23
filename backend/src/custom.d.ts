declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URI: string;
    PORT: string;
    SECRET: string;
  }
}

declare namespace Express {
  export interface Request {
    isAuth: boolean;
    user: {
      email: string;
      role: string;
    };
  }
}
