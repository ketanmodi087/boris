import { ItemsService } from './items.service';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    getItems(authToken: string): Promise<{
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
    addItem(body: {
        name: string;
        date: string;
        important: boolean;
    }, authToken: string): Promise<{
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
}
