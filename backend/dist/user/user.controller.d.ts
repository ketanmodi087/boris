import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateProfile(body: {
        first_name: string;
        last_name: string;
        email: string;
        password?: string;
        biography: string;
    }, token: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        status?: undefined;
    } | {
        status: string;
        message: any;
        statusCode: any;
        data?: undefined;
    }>;
    fetchProfile(token: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    };
}
