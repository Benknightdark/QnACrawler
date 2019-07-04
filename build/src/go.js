"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
exports.letgo = (function go() {
    return __awaiter(this, void 0, void 0, function () {
        // async function parseAndTask(items) {
        // }
        function rePage() {
        }
        var browser, page, currentScreen, handle, flag, i, result, divsCounts, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        headless: false,
                        args: ['--start-maximized']
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36")];
                case 3:
                    _a.sent();
                    console.log('test use agent');
                    return [4 /*yield*/, page.evaluate(function () {
                            return {
                                width: window.screen.availWidth,
                                height: window.screen.availHeight
                            };
                        })];
                case 4:
                    currentScreen = _a.sent();
                    //設定預設網頁頁面大小
                    return [4 /*yield*/, page.setViewport(currentScreen)];
                case 5:
                    //設定預設網頁頁面大小
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 20, , 21]);
                    return [4 /*yield*/, page.goto('http://data.coa.gov.tw/')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('#DefaultPageContent_m_ResultGrid_PageSizeList')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.$eval('#DefaultPageContent_m_ResultGrid_PageSizeList', function (e) { return e.value = 100; })];
                case 9:
                    _a.sent();
                    handle = void 0;
                    flag = true;
                    i = 0;
                    _a.label = 10;
                case 10:
                    if (!flag) return [3 /*break*/, 19];
                    console.log(i++);
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 17, , 18]);
                    return [4 /*yield*/, page.waitForSelector('#DefaultPageContent_m_ResultGrid_NextPage', { timeout: 3000 })];
                case 12:
                    result = _a.sent();
                    return [4 /*yield*/, page.$('#DefaultPageContent_m_ResultGrid_NextPage')];
                case 13:
                    handle = _a.sent();
                    return [4 /*yield*/, handle.click()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, page.waitForNavigation()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, page.$$eval('.line', function (data) { return data; })];
                case 16:
                    divsCounts = _a.sent();
                    return [3 /*break*/, 18];
                case 17:
                    err_1 = _a.sent();
                    flag = false;
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 10];
                case 19:
                    console.log('已跳出');
                    return [3 /*break*/, 21];
                case 20:
                    err_2 = _a.sent();
                    console.log('err');
                    console.log(err_2);
                    return [3 /*break*/, 21];
                case 21: return [2 /*return*/];
            }
        });
    });
})();
