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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(configService) {
        var _a;
        this.configService = configService;
        this.directusUrl = (_a = this.configService.get("PUBLIC_URL")) !== null && _a !== void 0 ? _a : "";
    }
    async login(email, password) {
        var _a, _b, _c, _d, _e;
        if (!email || !password) {
            throw new common_1.HttpException("Email and password are required", common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const data = { email, password };
            const response = await axios_1.default.post(`${this.directusUrl}/auth/login`, data);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Login successful",
                expires: response.data.data.expires,
                access_token: response.data.data.access_token,
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: (_d = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors[0]) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : "Unable to login",
                statusCode: ((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) || common_1.HttpStatus.UNAUTHORIZED,
            };
        }
    }
    getRefreshToken(access_token) {
        return access_token;
    }
    async checkauth(access_token) {
        var _a, _b, _c, _d, _e;
        const refreshToken = this.getRefreshToken(access_token);
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token is required');
        }
        try {
            return await axios_1.default.post(`${this.directusUrl}/auth/refresh`, { refresh_token: refreshToken });
        }
        catch (error) {
            const axiosError = error;
            return {
                status: 'error',
                message: ((_d = (_c = (_b = (_a = axiosError === null || axiosError === void 0 ? void 0 : axiosError.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message) || "Unable to refresh",
                statusCode: ((_e = axiosError === null || axiosError === void 0 ? void 0 : axiosError.response) === null || _e === void 0 ? void 0 : _e.status) || common_1.HttpStatus.UNAUTHORIZED,
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map