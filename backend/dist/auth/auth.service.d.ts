import { HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private configService;
    private directusUrl;
    constructor(configService: ConfigService);
    login(email: string, password: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        expires: any;
        access_token: any;
        status?: undefined;
    } | {
        status: string;
        message: any;
        statusCode: any;
        expires?: undefined;
        access_token?: undefined;
    }>;
    getRefreshToken(access_token: string): string | null;
    checkauth(access_token: string): Promise<import("axios").AxiosResponse<any> | {
        status: string;
        message: any;
        statusCode: number;
    }>;
}
