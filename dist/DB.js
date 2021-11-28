"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
exports.default = async () => {
    await mongoose_1.default.connect(process.env.PATH_DB_WEB);
    mongoose_1.default.connection.on("open", _ => {
        console.log("Datsabase connected");
    });
    mongoose_1.default.connection.on("error", err => {
        console.log(err);
    });
    return mongoose_1.default;
};
