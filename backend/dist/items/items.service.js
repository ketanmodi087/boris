"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let ItemsService = class ItemsService {
    constructor(configService) {
        var _a;
        this.configService = configService;
        this.directusUrl = (_a = this.configService.get("PUBLIC_URL")) !== null && _a !== void 0 ? _a : "";
    }
    async getItems(authToken) {
        var _a, _b, _c, _d, _e;
        try {
            let headerData = {
                Authorization: `${authToken}`,
                "Content-Type": "application/json",
            };
            const response = await axios_1.default.get(`${this.directusUrl}/items/directus_items?sort=-id`, {
                headers: headerData,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                data: response.data.data,
            };
        }
        catch (error) {
            return {
                status: "error",
                message: (_d = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors[0]) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : "Unable to fetch items",
                statusCode: ((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) || common_1.HttpStatus.BAD_REQUEST,
            };
        }
    }
    async addItem(name, date, important, authToken) {
        var _a, _b, _c, _d, _e;
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
            const response = await axios_1.default.post(`${this.directusUrl}/items/directus_items`, data, { headers: headerData });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Item Added successfully.",
                data: response.data.data,
            };
        }
        catch (error) {
            return {
                status: "error",
                message: (_d = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors[0]) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : "Unable to add item",
                statusCode: ((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) || common_1.HttpStatus.BAD_REQUEST,
            };
        }
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ItemsService);
//# sourceMappingURL=items.service.js.map