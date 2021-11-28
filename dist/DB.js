"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
exports.default = async () => {
    await mongoose_1.default.connect(process.env.PATH_DB_WEB, {
        useNewURLParser: true,
        useUnifiedTopology: true
    });
    return mongoose_1.default;
};
