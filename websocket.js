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
exports.handleWebSocket = exports.sockets = void 0;
const Curriculum = __importStar(require("./curriculum"));
const Users = __importStar(require("./users"));
const Utility = __importStar(require("./utility"));
exports.sockets = new Set();
function handleWebSocket(ws, data) {
    var _a;
    console.log(`websocket connected.`);
    exports.sockets.add(ws);
    if (!data) {
        console.error("no session");
        return;
    }
    if (data.username) {
        ws.send(`sign-in\nok\n${(_a = Users.users.get(data.username)) === null || _a === void 0 ? void 0 : _a.alias}`);
        ws.send(Curriculum.fetch());
    }
    ws.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
        const [channel, ...rest] = Utility.parseMessage(message);
        console.log(channel, ...rest);
        const response = yield handleMessage(data, channel, ...rest);
        ws.send(`${channel}\n${response}`);
    }));
    ws.on("close", () => {
        exports.sockets.delete(ws);
    });
}
exports.handleWebSocket = handleWebSocket;
function handleMessage(data, channel, ...rest) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (channel) {
            case "sign-up":
                return yield handleSignUp(data, rest);
            case "sign-in":
                return yield handleSignIn(data, rest);
            case "control-start":
                Curriculum.move(0);
                return "";
            case "control-next":
                Curriculum.move(1);
                return "";
            case "control-prev":
                Curriculum.move(-1);
                return "";
            case "select":
                handleSelect(data, rest);
                return "";
            default:
                return "";
        }
    });
}
function handleSignUp(data, rest) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Users.signUp(...rest);
        switch (result) {
            case Users.Result.OK:
                data.username = rest[0];
                return `ok\n${rest[1]}`;
            case Users.Result.ErrUsernameTaken:
                return "err-uname-taken";
            default:
                return "err";
        }
    });
}
function handleSignIn(data, rest) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Users.signIn(...rest);
        switch (result) {
            case Users.Result.OK:
                data.username = rest[0];
                return `ok\n${(_a = Users.users.get(data.username)) === null || _a === void 0 ? void 0 : _a.alias}`;
            case Users.Result.ErrUsernameNoExist:
                return "err-no-user";
            case Users.Result.ErrWrongPassword:
                return "err-password";
            default:
                return "err";
        }
    });
}
function handleSelect(data, rest) {
    var _a, _b;
    const [key, isChecked] = rest;
    const alias = (_b = Users.getAlias((_a = data.username) !== null && _a !== void 0 ? _a : "")) !== null && _b !== void 0 ? _b : "Unknown";
    if (!Curriculum.answers[key])
        Curriculum.answers[key] = new Set();
    if (isChecked) {
        Curriculum.answers[key].add(alias);
    }
    else {
        Curriculum.answers[key].delete(alias);
    }
}
