import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class ItemsService {
  private directusUrl: string;

  constructor(private configService: ConfigService) {
    this.directusUrl = this.configService.get<string>("PUBLIC_URL") ?? "";
  }
  async getItems(authToken) {
    try {
      let headerData = {
        Authorization: `${authToken}`, // Optional: Include token for auth
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `${this.directusUrl}/items/directus_items?sort=-id`,
        {
          headers: headerData,
        }
      );
      return {
        statusCode: HttpStatus.OK,
        data: response.data.data,
      };
    } catch (error) {
      return {
        status: "error",
        message:
          error?.response?.data?.errors[0]?.message ?? "Unable to fetch items",
        statusCode: error.response?.status || HttpStatus.BAD_REQUEST,
      };
    }
  }

  // Add new item to Directus
  async addItem(
    name: string,
    date: string,
    important: boolean,
    authToken: string
  ) {
    try {
      let headerData = {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      };
      let data = {
        name: name,
        date: date,
        important: important,
      };
      const response = await axios.post(
        `${this.directusUrl}/items/directus_items`,
        data,
        { headers: headerData }
      );
      return {
        statusCode: HttpStatus.OK,
        message: "Item Added successfully.",
        data: response.data.data,
      };
    } catch (error) {
      return {
        status: "error",
        message:
          error?.response?.data?.errors[0]?.message ?? "Unable to add item",
        statusCode: error.response?.status || HttpStatus.BAD_REQUEST,
      };
    }
  }
}
