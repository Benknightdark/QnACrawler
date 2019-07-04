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
var _this = this;
exports.__esModule = true;
//
var puppeteer = require("puppeteer");
var cheerio = require("cheerio");
var fs = require("fs");
var $ = cheerio;
var webSitName = "\u79C0\u50B3\u91AB\u7642\u9AD4\u7CFB";
var getTrArray = function (tr) { return __awaiter(_this, void 0, void 0, function () {
    var trArray, index, element, td, detailID;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trArray = [];
                for (index = 1; index < tr.length - 2; index++) {
                    element = tr[index];
                    td = $(element).find('td');
                    detailID = '';
                    //let detailUrl=`http://www.show.org.tw/QA_Detail.aspx?Kind=5&Dept=TT&No=${detailID}`;
                    if (Number.parseInt($(td[3]).text()) !== 0) {
                        detailID = $($(td[0]).find('input')[1]).val().trim();
                        trArray.push({
                            question: $(td[0]).text().trim(),
                            url: "http://www.show.org.tw/QA_Detail.aspx?Kind=5&Dept=TT&No=" + detailID
                        });
                    }
                }
                console.log(trArray);
                return [4 /*yield*/, fs.writeFileSync('./src/firstSite.json', JSON.stringify(trArray))];
            case 1:
                _a.sent();
                // console.log(trArray)
                return [2 /*return*/, trArray];
        }
    });
}); };
exports.firstsite = (function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, userQuestionAsync, html, $2, table, tr, nTRArray, lastTr, pages, getOther, nPage;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto('http://www.show.org.tw/QA_List.aspx?Kind=5&Dept=TT')];
            case 3:
                _a.sent();
                userQuestionAsync = [];
                return [4 /*yield*/, page.content()];
            case 4:
                html = _a.sent();
                $2 = cheerio.load(html);
                table = $2('.LoanTable');
                tr = table.find('tr');
                return [4 /*yield*/, getTrArray(tr)
                    //  fs.writeFileSync('./src/firstSite.json', JSON.stringify(nTRArray));
                ];
            case 5:
                nTRArray = _a.sent();
                //  fs.writeFileSync('./src/firstSite.json', JSON.stringify(nTRArray));
                userQuestionAsync.push(nTRArray);
                lastTr = tr.last();
                pages = lastTr.find('td').text().split("").filter(function (a) { return Number.parseInt(a) !== 1; });
                getOther = function (index) { return __awaiter(_this, void 0, void 0, function () {
                    var browser, page;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
                            case 1:
                                browser = _a.sent();
                                return [4 /*yield*/, browser.newPage()];
                            case 2:
                                page = _a.sent();
                                return [4 /*yield*/, page.goto('http://www.show.org.tw/QA_List.aspx?Kind=5&Dept=TT')];
                            case 3:
                                _a.sent();
                                // await page.waitForNavigation();
                                return [4 /*yield*/, page.$eval('#aspnetForm', function (form, index) {
                                        form.__EVENTTARGET.value = "ctl00$ContentPlaceHolder1$GV_GuestList";
                                        form.__EVENTARGUMENT.value = "Page$" + index;
                                        form.submit();
                                    }, index)];
                            case 4:
                                // await page.waitForNavigation();
                                _a.sent();
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var userQuestionAsync, html, $2, table, tr, nTRArray;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                userQuestionAsync = [];
                                                return [4 /*yield*/, page.content()];
                                            case 1:
                                                html = _a.sent();
                                                $2 = cheerio.load(html);
                                                table = $2('.LoanTable');
                                                tr = table.find('tr');
                                                return [4 /*yield*/, getTrArray(tr)
                                                    //console.log(nTRArray)
                                                    //  page.browser().close();    
                                                    //  return nTRArray;
                                                ];
                                            case 2:
                                                nTRArray = _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 5000);
                                return [2 /*return*/];
                        }
                    });
                }); };
                nPage = pages.map(function (a) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = userQuestionAsync).push;
                                return [4 /*yield*/, getOther(a)];
                            case 1:
                                _b.apply(_a, [_c.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                //    // console.log(aa)
                //    setTimeout(() => {
                //     userQuestionAsync.map(async a=>{
                //         console.log(a)
                //        })
                //    }, 30000);
                //  })
                console.log();
                return [2 /*return*/];
        }
    });
}); })();
