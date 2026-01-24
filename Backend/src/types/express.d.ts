import { UserDocument } from "../model/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument;
        }
    }
}

declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    SERVER_URL?: string;
    TOKEN_SECRET: string;
    TOKEN_EXPIRY: string;
  }
}

export {};