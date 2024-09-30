import { HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class ItemsService {
    private configService;
    private directusUrl;
    constructor(configService: ConfigService);
    getItems(authToken: any): Promise<{
        statusCode: HttpStatus;
        data: any;
        status?: undefined;
        message?: undefined;
    } | {
        status: string;
        message: any;
        statusCode: any;
        data?: undefined;
    }>;
    addItem(name: string, date: string, important: boolean, authToken: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
        status?: undefined;
    } | {
        status: string;
        message: any;
        statusCode: any;
        data?: undefined;
    }>;
}
