"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemaModerate = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true
    },
    server: {
        type: String,
        required: true
    },
    mode: {
        type: Boolean,
        required: true
    },
    prefix: {
        type: String,
        required: true
    },
    membersCount: {
        type: Number,
        required: true
    },
    roles: {
        main: {
            required: true,
            type: String,
            default: undefined
        },
        mute: {
            required: true,
            type: String,
            default: undefined
        }
    }
});
exports.default = mongoose_1.default.model("moderate", schemaModerate);
