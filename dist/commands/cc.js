"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "cc",
    description: "Clears the amount of messages that we want",
    execute: (client, msg, args) => __awaiter(void 0, void 0, void 0, function* () {
        let amount;
        if (args.length === 0)
            amount = 1;
        amount = parseInt(args[0]);
        if (msg) {
            yield msg.delete();
        }
        ;
        const { size } = yield msg.channel.bulkDelete(amount, true);
        msg.channel.send(`Deleted ${size} message(s)`);
    })
};
