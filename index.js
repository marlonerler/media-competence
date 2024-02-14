"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionData = void 0;
const Utility = __importStar(require("./utility"));
const crypto_1 = __importDefault(require("crypto"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const express_ws_1 = __importDefault(require("express-ws"));
const websocket_1 = require("./websocket");
//prepare app
const app = (0, express_1.default)();
//session tracking
const sessionConfig = {
    secret: crypto_1.default.randomBytes(8).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
};
if (app.get("env") === "production") {
    app.set("trust proxy", 1);
    sessionConfig.cookie.secure = true; // serve secure cookies
}
app.use((0, express_session_1.default)(sessionConfig));
exports.sessionData = new Map();
//websocket
(0, express_ws_1.default)(app);
//convert types
const expressApp = app;
//listen to ws
expressApp.ws("/", (ws, req) => {
    //@ts-ignore
    (0, websocket_1.handleWebSocket)(ws, exports.sessionData.get(req.session.uuid));
});
//route
app.use("/", (req, res, next) => {
    //@ts-ignore
    if (req.session.uuid)
        return next();
    const uuid = Utility.uuid();
    //@ts-ignore
    req.session.uuid = uuid;
    exports.sessionData.set(uuid, {});
    next();
});
app.use("/", express_1.default.static("frontend"));
app.listen(8000);
