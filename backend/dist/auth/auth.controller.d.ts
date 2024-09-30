import { AuthService } from "./auth.service";
import { Response } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(email: string, password: string, res: Response): Promise<any>;
    checkAuth(access_token: string, res: Response): Promise<any>;
}
