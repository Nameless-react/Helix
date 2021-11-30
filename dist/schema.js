"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemaModerate = new mongoose_1.default.Schema({
    _id: {
        type: Number,
        required: true
    },
    server: {
        type: String,
        required: true
    },
    mode: {
        type: Boolean,
        required: true
    }
});
exports.default = mongoose_1.default.model("moderate", schemaModerate);
