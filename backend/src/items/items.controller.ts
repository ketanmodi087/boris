import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItems(@Headers('Authorization') authToken: string) {
    return this.itemsService.getItems(authToken);
  }

  @Post('add')
  async addItem(@Body() body: { name: string; date: string; important: boolean }, @Headers('Authorization') authToken: string) {
    const { name, date, important } = body;
    return this.itemsService.addItem(name, date, important, authToken);
  }
}
