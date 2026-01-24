export class ApiResponse {
    statusCode: number;
    message: string;
    data: any;
    
    constructor(statusCode: number, data: any, message: string = "success") {
        this.statusCode = statusCode,
        this.message = message,
        this.data = data
    }
}