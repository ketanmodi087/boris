import { Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  private directusUrl: string;

  constructor(private configService: ConfigService) {
    this.directusUrl = this.configService.get<string>("PUBLIC_URL") ?? "";
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new HttpException("Email and password are required", HttpStatus.BAD_REQUEST);
    }
    try {
      const data = { email, password };
      const response = await axios.post(`${this.directusUrl}/auth/login`, data);
      return {
        statusCode: HttpStatus.OK,
        message: "Login successful",
        expires:response.data.data.expires,
        access_token: response.data.data.access_token,
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: error?.response?.data?.errors[0]?.message ?? "Unable to login",
        statusCode: error.response?.status || HttpStatus.UNAUTHORIZED,
      };
    }
  }

  getRefreshToken(access_token: string): string | null {
    return access_token;
  }

  async checkauth(access_token: string) {
    const refreshToken = this.getRefreshToken(access_token);
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      return await axios.post(`${this.directusUrl}/auth/refresh`, { refresh_token: refreshToken });
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: 'error',
        message: axiosError?.response?.data?.errors?.[0]?.message || "Unable to refresh",
        statusCode: axiosError?.response?.status || HttpStatus.UNAUTHORIZED,
      };
    }
  }
  
}