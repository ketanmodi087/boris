import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class UserService {
  private directusUrl: string;

  constructor(private configService: ConfigService) {
    this.directusUrl = this.configService.get<string>("PUBLIC_URL") ?? "";
  }
  // Update the logged-in user's profile
  async updateProfile(data: any, token: string) {
    try {
      const response = await axios.patch(
        `${this.directusUrl}/users/me`, // Directus REST API endpoint to update the current user
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          biography: data.biography,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return {
        statusCode: HttpStatus.OK,
        message: "Profile updated successfully",
        data: response.data,
      };
    } catch (error) {
      return {
        status: "error",
        message:
          error?.response?.data?.errors[0]?.message ??
          "Unable to update profile",
        statusCode: error.response?.status || HttpStatus.BAD_REQUEST,
      };
    }
  }

  // Fetch the profile of the logged-in user
  async fetchProfile(accessToken: string) {
    if (!this.directusUrl) {
      throw new HttpException(
        "Directus URL is not configured",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    try {
      const response = await axios.get(`${this.directusUrl}/users/me`, {
        headers: {
          Authorization: `${accessToken}`, // Include the access token
        },
      });
      return {
        statusCode: HttpStatus.OK,
        data: response.data,
      };
    } catch (error) {
      return {
        status: "error",
        message:
          error?.response?.data?.errors[0]?.message ??
          "Unable to fetch user profile",
        statusCode: error.response?.status || HttpStatus.BAD_REQUEST,
      };
    }
  }

  // Logout function: Clear the cookie/token
  logout() {
    return {
      statusCode: HttpStatus.OK,
      message: "Logout successful",
    };
  }
}
