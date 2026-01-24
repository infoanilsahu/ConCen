
export class ApiError extends Error {
    statusCode: number;
    message: string;
    error: any[];
    stack?: string | undefined;
    success: boolean;
    data: null;

    constructor(statusCode: number, message: string = "something went wrong", error = [], stack = "") {
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.error = error,
        this.success = false;
        this.data = null
        
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}