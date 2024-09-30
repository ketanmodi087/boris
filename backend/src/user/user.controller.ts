import { Controller, Put, Body, Headers, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update-profile')
  async updateProfile(
    @Body() body: { first_name: string, last_name: string, email: string, password?: string, biography: string },
    @Headers('Authorization') token: string
  ) {
    return this.userService.updateProfile(body, token);
  }

  @Get('/me')
  async fetchProfile(
    @Headers('Authorization') token: string
  ) {
    return this.userService.fetchProfile(token);
  }

  @Post('/logout')
  logout() {
    return this.userService.logout();
  }
}
