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
    links: {
        type: Boolean,
        require: true
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
        main: Array,
        mute: String
    },
    autoRole: {
        roles: { type: Array },
        emojis: { type: Array }
    },
    channelRole: {
        type: String
    },
    censoredWord: {
        type: Array,
        required: true
    },
    webHook: {
        type: Object,
    }
});
exports.default = mongoose_1.default.model("moderate", schemaModerate);
