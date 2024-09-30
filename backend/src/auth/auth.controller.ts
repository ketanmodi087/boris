import { Controller, Post, Body, Res, HttpStatus, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res() res: Response
  ) {
    try {
      const result = await this.authService.login(email, password);
      return res.status(HttpStatus.OK).json(result);
    } catch (error:any) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Login failed", error: error.message });
    }
  }

  @Post("/check-auth")
  async checkAuth(@Body("access_token") access_token: string, @Res() res: Response) {
    try {
      const result = await this.authService.checkauth(access_token);
      return res.status(HttpStatus.OK).json(result);
    } catch (error:any) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Login failed", error: error.message });
    }
  }
}
