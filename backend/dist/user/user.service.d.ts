import { HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class UserService {
    private configService;
    private directusUrl;
    constructor(configService: ConfigService);
    updateProfile(data: any, token: string): Promise<{
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
    fetchProfile(accessToken: string): Promise<{
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
    logout(): {
        statusCode: HttpStatus;
        message: string;
    };
}
