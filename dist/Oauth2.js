"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url_1 = __importDefault(require("url"));
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const app = express_1.default();
const port = process.env.PORT;
let accessToken = "";
let refreshToken = "";
app.get("/api/auth/discord/redirect", async (req, res) => {
    const { code } = req.query;
    if (!code)
        res.status(404).send("No query parameter code was pass");
    try {
        const formData = new url_1.default.URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code.toString(),
            redirect_uri: "http://localhost:4000/api/auth/discord/redirect"
        });
        const response = await axios_1.default.post("https://discord.com/api/v8/oauth2/token", formData.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const { access_token, refresh_token } = response.data;
        accessToken = access_token;
        refreshToken = refresh_token;
        const userResponse = await axios_1.default.get("https://discord.com/api/v8/users/@me", {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        return res.status(200).send("Ok");
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(404);
    }
});
app.get("/api/auth/user", async (req, res) => {
    try {
        const response = await axios_1.default.get("https://discord.com/api/v8/users/@me", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        res.status(200).json(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(404);
    }
});
app.get("/api/auth/revoke", async (req, res) => {
    const formData = new url_1.default.URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        token: accessToken
    });
    try {
        const response = await axios_1.default.post("https://discord.com/api/v8/oauth2/token/revoke", formData.toString(), {
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            }
        });
        res.status(200).send(response.data);
    }
    catch (err) {
        res.status(404).send(err);
    }
});
app.listen(port, () => {
    console.log(`The server is on port ${port}`);
});
