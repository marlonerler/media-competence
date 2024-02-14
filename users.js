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
exports.getAlias = exports.addEmail = exports.evaluatePassword = exports.signUp = exports.signIn = exports.emails = exports.passwordStat = exports.users = exports.Result = void 0;
const Utility = __importStar(require("./utility"));
var Result;
(function (Result) {
    Result[Result["OK"] = 0] = "OK";
    Result[Result["ErrMissingData"] = 1] = "ErrMissingData";
    Result[Result["ErrWrongPassword"] = 2] = "ErrWrongPassword";
    Result[Result["ErrUsernameTaken"] = 3] = "ErrUsernameTaken";
    Result[Result["ErrUsernameNoExist"] = 4] = "ErrUsernameNoExist";
    Result[Result["ErrNoValidEmail"] = 5] = "ErrNoValidEmail";
})(Result || (exports.Result = Result = {}));
//tracking
exports.users = new Map();
exports.passwordStat = {
    long: 0,
    lower: 0,
    upper: 0,
    number: 0,
    symbol: 0,
    noSequence: 0,
    total: 0,
};
exports.emails = [];
//methods
function signIn(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAccount = exports.users.get(username);
        if (!userAccount)
            return Utility.errorAndReturn("user does not exist", Result.ErrUsernameNoExist);
        const isCorrect = yield Utility.compareHash(password, userAccount.hashedPassword);
        console.log(isCorrect, userAccount.hashedPassword);
        if (!isCorrect)
            return Utility.errorAndReturn("password wrong", Result.ErrWrongPassword);
        return Result.OK;
    });
}
exports.signIn = signIn;
function signUp(username, alias, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(username && alias && password))
            return Utility.errorAndReturn("missing data", Result.ErrMissingData);
        if (exports.users.has(username))
            return Utility.errorAndReturn("name taken", Result.ErrUsernameTaken);
        if (Utility.checkIsEmail(username) == false)
            return Result.ErrNoValidEmail;
        evaluatePassword(password);
        addEmail(username);
        console.log(exports.emails);
        console.log(exports.passwordStat);
        const hashedPassword = yield Utility.hash(password);
        const newAccount = {
            username,
            alias,
            hashedPassword,
        };
        exports.users.set(username, newAccount);
        console.log(newAccount);
        return Result.OK;
    });
}
exports.signUp = signUp;
function evaluatePassword(password) {
    let isLong = password.length >= 12;
    let hasLowerLetter = /[a-z]/.test(password);
    let hasUpperLetter = /[A-Z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSymbol = /[^\w]/.test(password);
    let hasSequence = /(01|12|23|34|45|56|67|89|90|09|98|87|76|65|54|43|32|21|10)/.test(password);
    exports.passwordStat.total += 1;
    if (isLong)
        exports.passwordStat.long += 1;
    if (hasLowerLetter)
        exports.passwordStat.lower += 1;
    if (hasUpperLetter)
        exports.passwordStat.upper += 1;
    if (hasNumber)
        exports.passwordStat.number += 1;
    if (hasSymbol)
        exports.passwordStat.symbol += 1;
    if (!hasSequence)
        exports.passwordStat.noSequence += 1;
}
exports.evaluatePassword = evaluatePassword;
function addEmail(email) {
    const [name, domain] = email.split("@");
    const protectedName = name
        .split("")
        .map((x, i) => (i > 1 ? "*" : x))
        .join("");
    const protectedEmail = `${protectedName}@${domain}`;
    exports.emails.push(protectedEmail);
}
exports.addEmail = addEmail;
function getAlias(username) {
    var _a;
    return (_a = exports.users.get(username)) === null || _a === void 0 ? void 0 : _a.alias;
}
exports.getAlias = getAlias;
