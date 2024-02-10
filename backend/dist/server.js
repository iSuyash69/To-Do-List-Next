"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const MongoDB_adapter_1 = __importDefault(require("./adapters/MongoDB.adapter"));
//Initialize Express server
const app = (0, express_1.default)();
//Initialize CORS
app.use((0, cors_1.default)());
//Setup ENV
dotenv_1.default.config();
//Connect to DB
(0, MongoDB_adapter_1.default)();
//Setup Middleware for parsing incoming requests
app.use(express_1.default.json());
//Initialize Port
const port = Number(process.env.PORT || 5000);
//Import Routes
const User_routes_1 = __importDefault(require("./routes/User.routes"));
//-----------------------------Routes----------------------------------
app.use("/user", User_routes_1.default);
//Start the Express server
const server = app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
