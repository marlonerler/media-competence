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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeArray = exports.errorAndReturn = exports.parseMessage = exports.uuid = exports.checkIsEmail = exports.compareHash = exports.hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
function hash(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input)
            return "";
        return crypto_1.default.createHash("md5").update(input).digest("hex");
    });
}
exports.hash = hash;
function compareHash(input, referenceHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const newHash = yield hash(input);
        return newHash == referenceHash;
    });
}
exports.compareHash = compareHash;
function checkIsEmail(input) {
    return /^(\w+)\@(\w+)\.(\w+)$/.test(input);
}
exports.checkIsEmail = checkIsEmail;
function uuid() {
    return crypto_1.default.randomUUID();
}
exports.uuid = uuid;
function parseMessage(data) {
    return data.toString().split("\n");
}
exports.parseMessage = parseMessage;
function errorAndReturn(message, value) {
    console.error(message);
    return value;
}
exports.errorAndReturn = errorAndReturn;
function summarizeArray(array) {
    switch (array.length) {
        case 0:
            return "Nobody";
        case 1:
            return array[0];
        case 2:
            return `${array[0]} and ${array[1]}`;
        case 3:
            return `${array[0]}, ${array[1]}, and ${array[2]}`;
        default:
            return `${array[0]}, ${array[1]}, and ${array.length - 2} more`;
    }
}
exports.summarizeArray = summarizeArray;
