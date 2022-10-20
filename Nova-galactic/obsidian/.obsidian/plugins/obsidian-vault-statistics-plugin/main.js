'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var Formatter = /** @class */ (function () {
    function Formatter() {
    }
    return Formatter;
}());
/**
 * {@link DecimalUnitFormatter} provides an implementation of {@link Formatter}
 * that outputs a integers in a standard decimal format with grouped thousands.
 */
var DecimalUnitFormatter = /** @class */ (function (_super) {
    __extends(DecimalUnitFormatter, _super);
    /**
     * @param unit the unit of the value being formatted.
     * @constructor
     */
    function DecimalUnitFormatter(unit) {
        var _this = _super.call(this) || this;
        _this.unit = unit;
        _this.numberFormat = Intl.NumberFormat('en-US', { style: 'decimal' });
        return _this;
    }
    DecimalUnitFormatter.prototype.format = function (value) {
        return "".concat(this.numberFormat.format(value), " ").concat(this.unit);
    };
    return DecimalUnitFormatter;
}(Formatter));
/**
 * {@link ScalingUnitFormatter}
 */
var ScalingUnitFormatter = /** @class */ (function (_super) {
    __extends(ScalingUnitFormatter, _super);
    /**
     * @param numberFormat An instance of {@link Intl.NumberFormat} to use to
     * format the scaled value.
     */
    function ScalingUnitFormatter(numberFormat) {
        var _this = _super.call(this) || this;
        _this.numberFormat = numberFormat;
        return _this;
    }
    ScalingUnitFormatter.prototype.format = function (value) {
        var _a = this.scale(value), scaledValue = _a[0], scaledUnit = _a[1];
        return "".concat(this.numberFormat.format(scaledValue), " ").concat(scaledUnit);
    };
    return ScalingUnitFormatter;
}(Formatter));
/**
 * {@link BytesFormatter} formats values that represent a size in bytes as a
 * value in bytes, kilobytes, megabytes, gigabytes, etc.
 */
var BytesFormatter = /** @class */ (function (_super) {
    __extends(BytesFormatter, _super);
    function BytesFormatter() {
        return _super.call(this, Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })) || this;
    }
    BytesFormatter.prototype.scale = function (value) {
        var units = ["bytes", "KB", "MB", "GB", "TB", "PB"];
        while (value > 1024 && units.length > 0) {
            value = value / 1024;
            units.shift();
        }
        return [value, units[0]];
    };
    return BytesFormatter;
}(ScalingUnitFormatter));

var VaultMetrics = /** @class */ (function (_super) {
    __extends(VaultMetrics, _super);
    function VaultMetrics() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.files = 0;
        _this.notes = 0;
        _this.attachments = 0;
        _this.size = 0;
        _this.links = 0;
        _this.words = 0;
        return _this;
    }
    VaultMetrics.prototype.reset = function () {
        this.files = 0;
        this.notes = 0;
        this.attachments = 0;
        this.size = 0;
        this.links = 0;
        this.words = 0;
    };
    VaultMetrics.prototype.dec = function (metrics) {
        this.files -= (metrics === null || metrics === void 0 ? void 0 : metrics.files) || 0;
        this.notes -= (metrics === null || metrics === void 0 ? void 0 : metrics.notes) || 0;
        this.attachments -= (metrics === null || metrics === void 0 ? void 0 : metrics.attachments) || 0;
        this.size -= (metrics === null || metrics === void 0 ? void 0 : metrics.size) || 0;
        this.links -= (metrics === null || metrics === void 0 ? void 0 : metrics.links) || 0;
        this.words -= (metrics === null || metrics === void 0 ? void 0 : metrics.words) || 0;
        this.trigger("updated");
    };
    VaultMetrics.prototype.inc = function (metrics) {
        this.files += (metrics === null || metrics === void 0 ? void 0 : metrics.files) || 0;
        this.notes += (metrics === null || metrics === void 0 ? void 0 : metrics.notes) || 0;
        this.attachments += (metrics === null || metrics === void 0 ? void 0 : metrics.attachments) || 0;
        this.size += (metrics === null || metrics === void 0 ? void 0 : metrics.size) || 0;
        this.links += (metrics === null || metrics === void 0 ? void 0 : metrics.links) || 0;
        this.words += (metrics === null || metrics === void 0 ? void 0 : metrics.words) || 0;
        this.trigger("updated");
    };
    VaultMetrics.prototype.on = function (name, callback, ctx) {
        return _super.prototype.on.call(this, "updated", callback, ctx);
    };
    return VaultMetrics;
}(obsidian.Events));

/**
 * The {@link UnitTokenizer} is a constant tokenizer that always returns an
 * empty list.
 */
var UnitTokenizer = /** @class */ (function () {
    function UnitTokenizer() {
    }
    UnitTokenizer.prototype.tokenize = function (_) {
        return [];
    };
    return UnitTokenizer;
}());
/**
 * {@link MarkdownTokenizer} understands how to tokenize markdown text into word
 * tokens.
 */
var MarkdownTokenizer = /** @class */ (function () {
    function MarkdownTokenizer() {
    }
    MarkdownTokenizer.prototype.isNonWord = function (token) {
        var NON_WORDS = /^\W+$/;
        return !!NON_WORDS.exec(token);
    };
    MarkdownTokenizer.prototype.isNumber = function (token) {
        var NUMBER = /^\d+(\.\d+)?$/;
        return !!NUMBER.exec(token);
    };
    MarkdownTokenizer.prototype.isCodeBlockHeader = function (token) {
        var CODE_BLOCK_HEADER = /^```\w+$/;
        return !!CODE_BLOCK_HEADER.exec(token);
    };
    MarkdownTokenizer.prototype.stripHighlights = function (token) {
        var STRIP_HIGHLIGHTS = /^(==)?(.*?)(==)?$/;
        return STRIP_HIGHLIGHTS.exec(token)[2];
    };
    MarkdownTokenizer.prototype.stripFormatting = function (token) {
        var STRIP_FORMATTING = /^(_+|\*+)?(.*?)(_+|\*+)?$/;
        return STRIP_FORMATTING.exec(token)[2];
    };
    MarkdownTokenizer.prototype.stripPunctuation = function (token) {
        var STRIP_PUNCTUATION = /^(`|\.|:|"|,|!|\?)?(.*?)(`|\.|:|"|,|!|\?)?$/;
        return STRIP_PUNCTUATION.exec(token)[2];
    };
    MarkdownTokenizer.prototype.stripWikiLinks = function (token) {
        var STRIP_WIKI_LINKS = /^(\[\[)?(.*?)(\]\])?$/;
        return STRIP_WIKI_LINKS.exec(token)[2];
    };
    MarkdownTokenizer.prototype.stripAll = function (token) {
        if (token === "") {
            return token;
        }
        var isFixedPoint = false;
        while (!isFixedPoint) {
            var prev = token;
            token = [token].
                map(this.stripHighlights).
                map(this.stripFormatting).
                map(this.stripPunctuation).
                map(this.stripWikiLinks)[0];
            isFixedPoint = isFixedPoint || prev === token;
        }
        return token;
    };
    MarkdownTokenizer.prototype.tokenize = function (content) {
        var _this = this;
        if (content.trim() === "") {
            return [];
        }
        else {
            var WORD_BOUNDARY = /[ \n\r\t\"\|,\(\)\[\]/]+/;
            var words = content.
                split(WORD_BOUNDARY).
                filter(function (token) { return !_this.isNonWord(token); }).
                filter(function (token) { return !_this.isNumber(token); }).
                filter(function (token) { return !_this.isCodeBlockHeader(token); }).
                map(function (token) { return _this.stripAll(token); }).
                filter(function (token) { return token.length > 0; });
            return words;
        }
    };
    return MarkdownTokenizer;
}());
var UNIT_TOKENIZER = new UnitTokenizer();
var MARKDOWN_TOKENIZER = new MarkdownTokenizer();

var FileType;
(function (FileType) {
    FileType[FileType["Unknown"] = 0] = "Unknown";
    FileType[FileType["Note"] = 1] = "Note";
    FileType[FileType["Attachment"] = 2] = "Attachment";
})(FileType || (FileType = {}));
var VaultMetricsCollector = /** @class */ (function () {
    function VaultMetricsCollector(owner) {
        this.data = new Map();
        this.backlog = new Array();
        this.vaultMetrics = new VaultMetrics();
        this.owner = owner;
    }
    VaultMetricsCollector.prototype.setVault = function (vault) {
        this.vault = vault;
        return this;
    };
    VaultMetricsCollector.prototype.setMetadataCache = function (metadataCache) {
        this.metadataCache = metadataCache;
        return this;
    };
    VaultMetricsCollector.prototype.setVaultMetrics = function (vaultMetrics) {
        this.vaultMetrics = vaultMetrics;
        return this;
    };
    VaultMetricsCollector.prototype.start = function () {
        var _this = this;
        var _a;
        this.owner.registerEvent(this.vault.on("create", function (file) { _this.onfilecreated(file); }));
        this.owner.registerEvent(this.vault.on("modify", function (file) { _this.onfilemodified(file); }));
        this.owner.registerEvent(this.vault.on("delete", function (file) { _this.onfiledeleted(file); }));
        this.owner.registerEvent(this.vault.on("rename", function (file, oldPath) { _this.onfilerenamed(file, oldPath); }));
        this.owner.registerEvent(this.metadataCache.on("resolve", function (file) { _this.onfilemodified(file); }));
        this.owner.registerEvent(this.metadataCache.on("changed", function (file) { _this.onfilemodified(file); }));
        this.data.clear();
        this.backlog = new Array();
        (_a = this.vaultMetrics) === null || _a === void 0 ? void 0 : _a.reset();
        this.vault.getFiles().forEach(function (file) {
            if (!(file instanceof obsidian.TFolder)) {
                _this.push(file);
            }
        });
        this.owner.registerInterval(+setInterval(function () { _this.processBacklog(); }, 2000));
        return this;
    };
    VaultMetricsCollector.prototype.push = function (fileOrPath) {
        if (fileOrPath instanceof obsidian.TFolder) {
            return;
        }
        var path = (fileOrPath instanceof obsidian.TFile) ? fileOrPath.path : fileOrPath;
        if (!this.backlog.contains(path)) {
            this.backlog.push(path);
        }
    };
    VaultMetricsCollector.prototype.processBacklog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, file, metrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.backlog.length > 0)) return [3 /*break*/, 2];
                        path = this.backlog.shift();
                        file = this.vault.getAbstractFileByPath(path);
                        return [4 /*yield*/, this.collect(file)];
                    case 1:
                        metrics = _a.sent();
                        this.update(path, metrics);
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    VaultMetricsCollector.prototype.onfilecreated = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfilecreated(${file?.path})`);
                this.push(file);
                return [2 /*return*/];
            });
        });
    };
    VaultMetricsCollector.prototype.onfilemodified = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfilemodified(${file?.path})`)
                this.push(file);
                return [2 /*return*/];
            });
        });
    };
    VaultMetricsCollector.prototype.onfiledeleted = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfiledeleted(${file?.path})`)
                this.push(file);
                return [2 /*return*/];
            });
        });
    };
    VaultMetricsCollector.prototype.onfilerenamed = function (file, oldPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfilerenamed(${file?.path})`)
                this.push(file);
                this.push(oldPath);
                return [2 /*return*/];
            });
        });
    };
    VaultMetricsCollector.prototype.getFileType = function (file) {
        var _a;
        if (((_a = file.extension) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "md") {
            return FileType.Note;
        }
        else {
            return FileType.Attachment;
        }
    };
    VaultMetricsCollector.prototype.collect = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                metadata = this.metadataCache.getFileCache(file);
                if (metadata == null) {
                    return [2 /*return*/, Promise.resolve(null)];
                }
                switch (this.getFileType(file)) {
                    case FileType.Note:
                        return [2 /*return*/, new NoteMetricsCollector(this.vault).collect(file, metadata)];
                    case FileType.Attachment:
                        return [2 /*return*/, new FileMetricsCollector().collect(file, metadata)];
                }
                return [2 /*return*/];
            });
        });
    };
    VaultMetricsCollector.prototype.update = function (fileOrPath, metrics) {
        var _a, _b;
        var key = (fileOrPath instanceof obsidian.TFile) ? fileOrPath.path : fileOrPath;
        // Remove the existing values for the passed file if present, update the
        // raw values, then add the values for the passed file to the totals.
        (_a = this.vaultMetrics) === null || _a === void 0 ? void 0 : _a.dec(this.data.get(key));
        if (metrics == null) {
            this.data.delete(key);
        }
        else {
            this.data.set(key, metrics);
        }
        (_b = this.vaultMetrics) === null || _b === void 0 ? void 0 : _b.inc(metrics);
    };
    return VaultMetricsCollector;
}());
var NoteMetricsCollector = /** @class */ (function () {
    function NoteMetricsCollector(vault) {
        this.vault = vault;
    }
    NoteMetricsCollector.prototype.collect = function (file, metadata) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var metrics, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        metrics = new VaultMetrics();
                        metrics.files = 1;
                        metrics.notes = 1;
                        metrics.attachments = 0;
                        metrics.size = (_a = file.stat) === null || _a === void 0 ? void 0 : _a.size;
                        metrics.links = ((_b = metadata === null || metadata === void 0 ? void 0 : metadata.links) === null || _b === void 0 ? void 0 : _b.length) || 0;
                        metrics.words = 0;
                        _c = metrics;
                        return [4 /*yield*/, this.vault.cachedRead(file).then(function (content) {
                                var _a;
                                return (_a = metadata.sections) === null || _a === void 0 ? void 0 : _a.map(function (section) {
                                    var _a, _b, _c, _d;
                                    var sectionType = section.type;
                                    var startOffset = (_b = (_a = section.position) === null || _a === void 0 ? void 0 : _a.start) === null || _b === void 0 ? void 0 : _b.offset;
                                    var endOffset = (_d = (_c = section.position) === null || _c === void 0 ? void 0 : _c.end) === null || _d === void 0 ? void 0 : _d.offset;
                                    var tokenizer = NoteMetricsCollector.TOKENIZERS.get(sectionType);
                                    if (!tokenizer) {
                                        debugger;
                                        console.log("".concat(file.path, ": no tokenizer, section.type=").concat(section.type));
                                        return 0;
                                    }
                                    else {
                                        var tokens = tokenizer.tokenize(content.substring(startOffset, endOffset));
                                        return tokens.length;
                                    }
                                }).reduce(function (a, b) { return a + b; }, 0);
                            }).catch(function (e) {
                                console.log("".concat(file.path, " ").concat(e));
                                return 0;
                            })];
                    case 1:
                        _c.words = _d.sent();
                        return [2 /*return*/, metrics];
                }
            });
        });
    };
    NoteMetricsCollector.TOKENIZERS = new Map([
        ["paragraph", MARKDOWN_TOKENIZER],
        ["heading", MARKDOWN_TOKENIZER],
        ["list", MARKDOWN_TOKENIZER],
        ["table", UNIT_TOKENIZER],
        ["yaml", UNIT_TOKENIZER],
        ["code", UNIT_TOKENIZER],
        ["blockquote", MARKDOWN_TOKENIZER],
        ["math", UNIT_TOKENIZER],
        ["thematicBreak", UNIT_TOKENIZER],
        ["html", UNIT_TOKENIZER],
        ["text", UNIT_TOKENIZER],
        ["element", UNIT_TOKENIZER],
        ["footnoteDefinition", UNIT_TOKENIZER],
        ["definition", UNIT_TOKENIZER],
        ["callout", MARKDOWN_TOKENIZER],
    ]);
    return NoteMetricsCollector;
}());
var FileMetricsCollector = /** @class */ (function () {
    function FileMetricsCollector() {
    }
    FileMetricsCollector.prototype.collect = function (file, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var metrics;
            return __generator(this, function (_b) {
                metrics = new VaultMetrics();
                metrics.files = 1;
                metrics.notes = 0;
                metrics.attachments = 1;
                metrics.size = (_a = file.stat) === null || _a === void 0 ? void 0 : _a.size;
                metrics.links = 0;
                metrics.words = 0;
                return [2 /*return*/, metrics];
            });
        });
    };
    return FileMetricsCollector;
}());

var StatisticsPluginSettingTab = /** @class */ (function (_super) {
    __extends(StatisticsPluginSettingTab, _super);
    function StatisticsPluginSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    StatisticsPluginSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Show individual items")
            .setDesc("Whether to show multiple items at once or cycle them with a click")
            .addToggle(function (value) {
            value
                .setValue(_this.plugin.settings.displayIndividualItems)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.displayIndividualItems = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        if (!this.plugin.settings.displayIndividualItems) {
            return;
        }
        new obsidian.Setting(containerEl)
            .setName("Show notes")
            .addToggle(function (value) {
            value
                .setValue(_this.plugin.settings.showNotes)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.showNotes = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("Show attachments")
            .addToggle(function (value) {
            value
                .setValue(_this.plugin.settings.showAttachments)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.showAttachments = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("Show files")
            .addToggle(function (value) {
            value
                .setValue(_this.plugin.settings.showFiles)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.showFiles = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("Show links")
            .addToggle(function (value) {
            value
                .setValue(_this.plugin.settings.showLinks)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.showLinks = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("Show words")
            .addToggle(function (value) {
            value
                .setValue(_this.plugin.settings.showWords)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.showWords = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("Show size")
            .addToggle(function (value) {
            value
                .setValue(_this.plugin.settings.showSize)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.showSize = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return StatisticsPluginSettingTab;
}(obsidian.PluginSettingTab));

var DEFAULT_SETTINGS = {
    displayIndividualItems: false,
    showNotes: false,
    showAttachments: false,
    showFiles: false,
    showLinks: false,
    showWords: false,
    showSize: false,
};
var StatisticsPlugin = /** @class */ (function (_super) {
    __extends(StatisticsPlugin, _super);
    function StatisticsPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusBarItem = null;
        return _this;
    }
    StatisticsPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Loading vault-statistics Plugin');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.vaultMetrics = new VaultMetrics();
                        this.vaultMetricsCollector = new VaultMetricsCollector(this).
                            setVault(this.app.vault).
                            setMetadataCache(this.app.metadataCache).
                            setVaultMetrics(this.vaultMetrics).
                            start();
                        this.statusBarItem = new StatisticsStatusBarItem(this, this.addStatusBarItem()).
                            setVaultMetrics(this.vaultMetrics);
                        this.addSettingTab(new StatisticsPluginSettingTab(this.app, this));
                        return [2 /*return*/];
                }
            });
        });
    };
    StatisticsPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    StatisticsPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        this.statusBarItem.refresh();
                        return [2 /*return*/];
                }
            });
        });
    };
    return StatisticsPlugin;
}(obsidian.Plugin));
/**
 * {@link StatisticView} is responsible for maintaining the DOM representation
 * of a given statistic.
 */
var StatisticView = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param containerEl The parent element for the view.
     */
    function StatisticView(containerEl) {
        this.containerEl = containerEl.createSpan({ cls: ["obsidian-vault-statistics--item"] });
        this.setActive(false);
    }
    /**
     * Sets the name of the statistic.
     */
    StatisticView.prototype.setStatisticName = function (name) {
        this.containerEl.addClass("obsidian-vault-statistics--item-".concat(name));
        return this;
    };
    /**
     * Sets the formatter to use to produce the content of the view.
     */
    StatisticView.prototype.setFormatter = function (formatter) {
        this.formatter = formatter;
        return this;
    };
    /**
     * Updates the view with the desired active status.
     *
     * Active views have the CSS class `obsidian-vault-statistics--item-active`
     * applied, inactive views have the CSS class
     * `obsidian-vault-statistics--item-inactive` applied. These classes are
     * mutually exclusive.
     */
    StatisticView.prototype.setActive = function (isActive) {
        this.containerEl.removeClass("obsidian-vault-statistics--item--active");
        this.containerEl.removeClass("obsidian-vault-statistics--item--inactive");
        if (isActive) {
            this.containerEl.addClass("obsidian-vault-statistics--item--active");
        }
        else {
            this.containerEl.addClass("obsidian-vault-statistics--item--inactive");
        }
        return this;
    };
    /**
     * Refreshes the content of the view with content from the passed {@link
     * Statistics}.
     */
    StatisticView.prototype.refresh = function (s) {
        this.containerEl.setText(this.formatter(s));
    };
    /**
     * Returns the text content of the view.
     */
    StatisticView.prototype.getText = function () {
        return this.containerEl.getText();
    };
    return StatisticView;
}());
var StatisticsStatusBarItem = /** @class */ (function () {
    function StatisticsStatusBarItem(owner, statusBarItem) {
        var _this = this;
        // index of the currently displayed stat.
        this.displayedStatisticIndex = 0;
        this.statisticViews = [];
        this.refreshSoon = obsidian.debounce(function () { _this.refresh(); }, 2000, false);
        this.owner = owner;
        this.statusBarItem = statusBarItem;
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("notes").
            setFormatter(function (s) { return new DecimalUnitFormatter("notes").format(s.notes); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("attachments").
            setFormatter(function (s) { return new DecimalUnitFormatter("attachments").format(s.attachments); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("files").
            setFormatter(function (s) { return new DecimalUnitFormatter("files").format(s.files); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("links").
            setFormatter(function (s) { return new DecimalUnitFormatter("links").format(s.links); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("words").
            setFormatter(function (s) { return new DecimalUnitFormatter("words").format(s.words); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("size").
            setFormatter(function (s) { return new BytesFormatter().format(s.size); }));
        this.statusBarItem.onClickEvent(function () { _this.onclick(); });
    }
    StatisticsStatusBarItem.prototype.setVaultMetrics = function (vaultMetrics) {
        var _a;
        this.vaultMetrics = vaultMetrics;
        this.owner.registerEvent((_a = this.vaultMetrics) === null || _a === void 0 ? void 0 : _a.on("updated", this.refreshSoon));
        this.refreshSoon();
        return this;
    };
    StatisticsStatusBarItem.prototype.refresh = function () {
        var _this = this;
        if (this.owner.settings.displayIndividualItems) {
            this.statisticViews[0].setActive(this.owner.settings.showNotes).refresh(this.vaultMetrics);
            this.statisticViews[1].setActive(this.owner.settings.showAttachments).refresh(this.vaultMetrics);
            this.statisticViews[2].setActive(this.owner.settings.showFiles).refresh(this.vaultMetrics);
            this.statisticViews[3].setActive(this.owner.settings.showLinks).refresh(this.vaultMetrics);
            this.statisticViews[4].setActive(this.owner.settings.showWords).refresh(this.vaultMetrics);
            this.statisticViews[5].setActive(this.owner.settings.showSize).refresh(this.vaultMetrics);
        }
        else {
            this.statisticViews.forEach(function (view, i) {
                view.setActive(_this.displayedStatisticIndex == i).refresh(_this.vaultMetrics);
            });
        }
        this.statusBarItem.title = this.statisticViews.map(function (view) { return view.getText(); }).join("\n");
    };
    StatisticsStatusBarItem.prototype.onclick = function () {
        if (!this.owner.settings.displayIndividualItems) {
            this.displayedStatisticIndex = (this.displayedStatisticIndex + 1) % this.statisticViews.length;
        }
        this.refresh();
    };
    return StatisticsStatusBarItem;
}());

module.exports = StatisticsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9mb3JtYXQudHMiLCJzcmMvbWV0cmljcy50cyIsInNyYy90ZXh0LnRzIiwic3JjL2NvbGxlY3QudHMiLCJzcmMvc2V0dGluZ3MudHMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZvcm1hdHRlciB7XG4gIHB1YmxpYyBhYnN0cmFjdCBmb3JtYXQodmFsdWU6IG51bWJlcik6IHN0cmluZztcbn1cblxuLyoqXG4gKiB7QGxpbmsgRGVjaW1hbFVuaXRGb3JtYXR0ZXJ9IHByb3ZpZGVzIGFuIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBGb3JtYXR0ZXJ9XG4gKiB0aGF0IG91dHB1dHMgYSBpbnRlZ2VycyBpbiBhIHN0YW5kYXJkIGRlY2ltYWwgZm9ybWF0IHdpdGggZ3JvdXBlZCB0aG91c2FuZHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWNpbWFsVW5pdEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHByaXZhdGUgdW5pdDogc3RyaW5nO1xuICBwcml2YXRlIG51bWJlckZvcm1hdDogSW50bC5OdW1iZXJGb3JtYXQ7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB1bml0IHRoZSB1bml0IG9mIHRoZSB2YWx1ZSBiZWluZyBmb3JtYXR0ZWQuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IodW5pdDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5udW1iZXJGb3JtYXQgPSBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7IHN0eWxlOiAnZGVjaW1hbCcgfSk7XG4gIH1cblxuICBwdWJsaWMgZm9ybWF0KHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLm51bWJlckZvcm1hdC5mb3JtYXQodmFsdWUpfSAke3RoaXMudW5pdH1gXG4gIH1cbn1cblxuLyoqXG4gKiB7QGxpbmsgU2NhbGluZ1VuaXRGb3JtYXR0ZXJ9XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTY2FsaW5nVW5pdEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG5cbiAgcHJpdmF0ZSBudW1iZXJGb3JtYXQ6IEludGwuTnVtYmVyRm9ybWF0O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gbnVtYmVyRm9ybWF0IEFuIGluc3RhbmNlIG9mIHtAbGluayBJbnRsLk51bWJlckZvcm1hdH0gdG8gdXNlIHRvXG4gICAqIGZvcm1hdCB0aGUgc2NhbGVkIHZhbHVlLlxuICAgKi9cbiAgY29uc3RydWN0b3IobnVtYmVyRm9ybWF0OiBJbnRsLk51bWJlckZvcm1hdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5udW1iZXJGb3JtYXQgPSBudW1iZXJGb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGVzIHRoZSBwYXNzZWQgcmF3IHZhbHVlIChpbiBhIGJhc2UgdW5pdCkgdG8gYW4gYXBwcm9wcmlhdGUgdmFsdWUgZm9yXG4gICAqIHByZXNlbnRhdGlvbiBhbmQgcmV0dXJucyB0aGUgc2NhbGVkIHZhbHVlIGFzIHdlbGwgYXMgdGhlIG5hbWUgb2YgdGhlIHVuaXRcbiAgICogdGhhdCB0aGUgcmV0dXJuZWQgdmFsdWUgaXMgaW4uXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gYmUgc2NhbGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyLHN0cmluZ30gYW4gYXJyYXktbGlrZSBjb250YWluaW5nIHRoZSBudW1lcmljYWwgdmFsdWUgYW5kXG4gICAqIHRoZSBuYW1lIG9mIHRoZSB1bml0IHRoYXQgdGhlIHZhbHVlIHJlcHJlc2VudHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2NhbGUodmFsdWU6IG51bWJlcik6IFtudW1iZXIsIHN0cmluZ107XG5cbiAgcHVibGljIGZvcm1hdCh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgW3NjYWxlZFZhbHVlLCBzY2FsZWRVbml0XSA9IHRoaXMuc2NhbGUodmFsdWUpO1xuICAgIHJldHVybiBgJHt0aGlzLm51bWJlckZvcm1hdC5mb3JtYXQoc2NhbGVkVmFsdWUpfSAke3NjYWxlZFVuaXR9YFxuICB9XG5cbn1cblxuLyoqXG4gKiB7QGxpbmsgQnl0ZXNGb3JtYXR0ZXJ9IGZvcm1hdHMgdmFsdWVzIHRoYXQgcmVwcmVzZW50IGEgc2l6ZSBpbiBieXRlcyBhcyBhXG4gKiB2YWx1ZSBpbiBieXRlcywga2lsb2J5dGVzLCBtZWdhYnl0ZXMsIGdpZ2FieXRlcywgZXRjLlxuICovXG5leHBvcnQgY2xhc3MgQnl0ZXNGb3JtYXR0ZXIgZXh0ZW5kcyBTY2FsaW5nVW5pdEZvcm1hdHRlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xuICAgICAgc3R5bGU6ICdkZWNpbWFsJyxcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMlxuICAgIH0pKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzY2FsZSh2YWx1ZTogbnVtYmVyKTogW251bWJlciwgc3RyaW5nXSB7XG4gICAgbGV0IHVuaXRzID0gW1wiYnl0ZXNcIiwgXCJLQlwiLCBcIk1CXCIsIFwiR0JcIiwgXCJUQlwiLCBcIlBCXCJdXG4gICAgd2hpbGUgKHZhbHVlID4gMTAyNCAmJiB1bml0cy5sZW5ndGggPiAwKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlIC8gMTAyNFxuICAgICAgdW5pdHMuc2hpZnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIFt2YWx1ZSwgdW5pdHNbMF1dO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudHMsIEV2ZW50UmVmIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZhdWx0TWV0cmljcyB7XG4gIGZpbGVzOiBudW1iZXI7XG4gIG5vdGVzOiBudW1iZXI7XG4gIGF0dGFjaG1lbnRzOiBudW1iZXI7XG4gIHNpemU6IG51bWJlcjtcbiAgbGlua3M6IG51bWJlcjtcbiAgd29yZHM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFZhdWx0TWV0cmljcyBleHRlbmRzIEV2ZW50cyBpbXBsZW1lbnRzIFZhdWx0TWV0cmljcyB7XG5cbiAgZmlsZXM6IG51bWJlciA9IDA7XG4gIG5vdGVzOiBudW1iZXIgPSAwO1xuICBhdHRhY2htZW50czogbnVtYmVyID0gMDtcbiAgc2l6ZTogbnVtYmVyID0gMDtcbiAgbGlua3M6IG51bWJlciA9IDA7XG4gIHdvcmRzOiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmZpbGVzID0gMDtcbiAgICB0aGlzLm5vdGVzID0gMDtcbiAgICB0aGlzLmF0dGFjaG1lbnRzID0gMDtcbiAgICB0aGlzLnNpemUgPSAwO1xuICAgIHRoaXMubGlua3MgPSAwO1xuICAgIHRoaXMud29yZHMgPSAwO1xuICB9XG5cbiAgcHVibGljIGRlYyhtZXRyaWNzOiBWYXVsdE1ldHJpY3MpIHtcbiAgICB0aGlzLmZpbGVzIC09IG1ldHJpY3M/LmZpbGVzIHx8IDA7XG4gICAgdGhpcy5ub3RlcyAtPSBtZXRyaWNzPy5ub3RlcyB8fCAwO1xuICAgIHRoaXMuYXR0YWNobWVudHMgLT0gbWV0cmljcz8uYXR0YWNobWVudHMgfHwgMDtcbiAgICB0aGlzLnNpemUgLT0gbWV0cmljcz8uc2l6ZSB8fCAwO1xuICAgIHRoaXMubGlua3MgLT0gbWV0cmljcz8ubGlua3MgfHwgMDtcbiAgICB0aGlzLndvcmRzIC09IG1ldHJpY3M/LndvcmRzIHx8IDA7XG4gICAgdGhpcy50cmlnZ2VyKFwidXBkYXRlZFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBpbmMobWV0cmljczogVmF1bHRNZXRyaWNzKSB7XG4gICAgdGhpcy5maWxlcyArPSBtZXRyaWNzPy5maWxlcyB8fCAwO1xuICAgIHRoaXMubm90ZXMgKz0gbWV0cmljcz8ubm90ZXMgfHwgMDtcbiAgICB0aGlzLmF0dGFjaG1lbnRzICs9IG1ldHJpY3M/LmF0dGFjaG1lbnRzIHx8IDA7XG4gICAgdGhpcy5zaXplICs9IG1ldHJpY3M/LnNpemUgfHwgMDtcbiAgICB0aGlzLmxpbmtzICs9IG1ldHJpY3M/LmxpbmtzIHx8IDA7XG4gICAgdGhpcy53b3JkcyArPSBtZXRyaWNzPy53b3JkcyB8fCAwO1xuICAgIHRoaXMudHJpZ2dlcihcInVwZGF0ZWRcIik7XG4gIH1cblxuICBwdWJsaWMgb24obmFtZTogXCJ1cGRhdGVkXCIsIGNhbGxiYWNrOiAodmF1bHRNZXRyaWNzOiBWYXVsdE1ldHJpY3MpID0+IGFueSwgY3R4PzogYW55KTogRXZlbnRSZWYge1xuICAgIHJldHVybiBzdXBlci5vbihcInVwZGF0ZWRcIiwgY2FsbGJhY2ssIGN0eCk7XG4gIH1cblxufVxuIiwiXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuaXplciB7XG4gIHRva2VuaXplKGNvbnRlbnQ6IHN0cmluZyk6IEFycmF5PHN0cmluZz47XG59XG5cbi8qKlxuICogVGhlIHtAbGluayBVbml0VG9rZW5pemVyfSBpcyBhIGNvbnN0YW50IHRva2VuaXplciB0aGF0IGFsd2F5cyByZXR1cm5zIGFuXG4gKiBlbXB0eSBsaXN0LlxuICovXG5jbGFzcyBVbml0VG9rZW5pemVyIGltcGxlbWVudHMgVG9rZW5pemVyIHtcbiAgcHVibGljIHRva2VuaXplKF86IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG4vKipcbiAqIHtAbGluayBNYXJrZG93blRva2VuaXplcn0gdW5kZXJzdGFuZHMgaG93IHRvIHRva2VuaXplIG1hcmtkb3duIHRleHQgaW50byB3b3JkXG4gKiB0b2tlbnMuXG4gKi9cbmNsYXNzIE1hcmtkb3duVG9rZW5pemVyIGltcGxlbWVudHMgVG9rZW5pemVyIHtcblxuICBwcml2YXRlIGlzTm9uV29yZCh0b2tlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgTk9OX1dPUkRTID0gL15cXFcrJC87XG4gICAgcmV0dXJuICEhTk9OX1dPUkRTLmV4ZWModG9rZW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc051bWJlcih0b2tlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgTlVNQkVSID0gL15cXGQrKFxcLlxcZCspPyQvO1xuICAgIHJldHVybiAhIU5VTUJFUi5leGVjKHRva2VuKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDb2RlQmxvY2tIZWFkZXIodG9rZW46IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IENPREVfQkxPQ0tfSEVBREVSID0gL15gYGBcXHcrJC87XG4gICAgcmV0dXJuICEhQ09ERV9CTE9DS19IRUFERVIuZXhlYyh0b2tlbik7XG4gIH1cblxuICBwcml2YXRlIHN0cmlwSGlnaGxpZ2h0cyh0b2tlbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBTVFJJUF9ISUdITElHSFRTID0gL14oPT0pPyguKj8pKD09KT8kLztcbiAgICByZXR1cm4gU1RSSVBfSElHSExJR0hUUy5leGVjKHRva2VuKVsyXTtcbiAgfVxuXG4gIHByaXZhdGUgc3RyaXBGb3JtYXR0aW5nKHRva2VuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IFNUUklQX0ZPUk1BVFRJTkcgPSAvXihfK3xcXCorKT8oLio/KShfK3xcXCorKT8kLztcbiAgICByZXR1cm4gU1RSSVBfRk9STUFUVElORy5leGVjKHRva2VuKVsyXTtcbiAgfVxuXG4gIHByaXZhdGUgc3RyaXBQdW5jdHVhdGlvbih0b2tlbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBTVFJJUF9QVU5DVFVBVElPTiA9IC9eKGB8XFwufDp8XCJ8LHwhfFxcPyk/KC4qPykoYHxcXC58OnxcInwsfCF8XFw/KT8kLztcbiAgICByZXR1cm4gU1RSSVBfUFVOQ1RVQVRJT04uZXhlYyh0b2tlbilbMl07XG4gIH1cblxuICBwcml2YXRlIHN0cmlwV2lraUxpbmtzKHRva2VuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IFNUUklQX1dJS0lfTElOS1MgPSAvXihcXFtcXFspPyguKj8pKFxcXVxcXSk/JC87XG4gICAgcmV0dXJuIFNUUklQX1dJS0lfTElOS1MuZXhlYyh0b2tlbilbMl07XG4gIH1cblxuICBwcml2YXRlIHN0cmlwQWxsKHRva2VuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0b2tlbiA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIGxldCBpc0ZpeGVkUG9pbnQgPSBmYWxzZTtcbiAgICB3aGlsZSAoIWlzRml4ZWRQb2ludCkge1xuICAgICAgbGV0IHByZXYgPSB0b2tlbjtcbiAgICAgIHRva2VuID0gW3Rva2VuXS5cbiAgICAgICAgbWFwKHRoaXMuc3RyaXBIaWdobGlnaHRzKS5cbiAgICAgICAgbWFwKHRoaXMuc3RyaXBGb3JtYXR0aW5nKS5cbiAgICAgICAgbWFwKHRoaXMuc3RyaXBQdW5jdHVhdGlvbikuXG4gICAgICAgIG1hcCh0aGlzLnN0cmlwV2lraUxpbmtzKVswXTtcbiAgICAgIGlzRml4ZWRQb2ludCA9IGlzRml4ZWRQb2ludCB8fCBwcmV2ID09PSB0b2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgcHVibGljIHRva2VuaXplKGNvbnRlbnQ6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuICAgIGlmIChjb250ZW50LnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBXT1JEX0JPVU5EQVJZID0gL1sgXFxuXFxyXFx0XFxcIlxcfCxcXChcXClcXFtcXF0vXSsvO1xuICAgICAgbGV0IHdvcmRzID0gY29udGVudC5cbiAgICAgICAgc3BsaXQoV09SRF9CT1VOREFSWSkuXG4gICAgICAgIGZpbHRlcih0b2tlbiA9PiAhdGhpcy5pc05vbldvcmQodG9rZW4pKS5cbiAgICAgICAgZmlsdGVyKHRva2VuID0+ICF0aGlzLmlzTnVtYmVyKHRva2VuKSkuXG4gICAgICAgIGZpbHRlcih0b2tlbiA9PiAhdGhpcy5pc0NvZGVCbG9ja0hlYWRlcih0b2tlbikpLlxuICAgICAgICBtYXAodG9rZW4gPT4gdGhpcy5zdHJpcEFsbCh0b2tlbikpLlxuICAgICAgICBmaWx0ZXIodG9rZW4gPT4gdG9rZW4ubGVuZ3RoID4gMCk7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBVTklUX1RPS0VOSVpFUiA9IG5ldyBVbml0VG9rZW5pemVyKCk7XG5leHBvcnQgY29uc3QgTUFSS0RPV05fVE9LRU5JWkVSID0gbmV3IE1hcmtkb3duVG9rZW5pemVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bml0X3Rva2VuaXplKF86IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuICByZXR1cm4gVU5JVF9UT0tFTklaRVIudG9rZW5pemUoXyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrZG93bl90b2tlbml6ZShjb250ZW50OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgcmV0dXJuIE1BUktET1dOX1RPS0VOSVpFUi50b2tlbml6ZShjb250ZW50KTtcbn1cblxuZXhwb3J0IHsgfTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmF1bHQsIE1ldGFkYXRhQ2FjaGUsIFRGaWxlLCBURm9sZGVyLCBDYWNoZWRNZXRhZGF0YSB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFZhdWx0TWV0cmljcyB9IGZyb20gJy4vbWV0cmljcyc7XG5pbXBvcnQgeyBNQVJLRE9XTl9UT0tFTklaRVIsIFVOSVRfVE9LRU5JWkVSIH0gZnJvbSAnLi90ZXh0JztcblxuXG5lbnVtIEZpbGVUeXBlIHtcbiAgVW5rbm93biA9IDAsXG4gIE5vdGUsXG4gIEF0dGFjaG1lbnQsXG59XG5cbmV4cG9ydCBjbGFzcyBWYXVsdE1ldHJpY3NDb2xsZWN0b3Ige1xuXG4gIHByaXZhdGUgb3duZXI6IENvbXBvbmVudDtcbiAgcHJpdmF0ZSB2YXVsdDogVmF1bHQ7XG4gIHByaXZhdGUgbWV0YWRhdGFDYWNoZTogTWV0YWRhdGFDYWNoZTtcbiAgcHJpdmF0ZSBkYXRhOiBNYXA8c3RyaW5nLCBWYXVsdE1ldHJpY3M+ID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIGJhY2tsb2c6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXkoKTtcbiAgcHJpdmF0ZSB2YXVsdE1ldHJpY3M6IFZhdWx0TWV0cmljcyA9IG5ldyBWYXVsdE1ldHJpY3MoKTtcblxuICBjb25zdHJ1Y3Rvcihvd25lcjogQ29tcG9uZW50KSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICB9XG5cbiAgcHVibGljIHNldFZhdWx0KHZhdWx0OiBWYXVsdCkge1xuICAgIHRoaXMudmF1bHQgPSB2YXVsdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBzZXRNZXRhZGF0YUNhY2hlKG1ldGFkYXRhQ2FjaGU6IE1ldGFkYXRhQ2FjaGUpIHtcbiAgICB0aGlzLm1ldGFkYXRhQ2FjaGUgPSBtZXRhZGF0YUNhY2hlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIHNldFZhdWx0TWV0cmljcyh2YXVsdE1ldHJpY3M6IFZhdWx0TWV0cmljcykge1xuICAgIHRoaXMudmF1bHRNZXRyaWNzID0gdmF1bHRNZXRyaWNzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0KCkge1xuICAgIHRoaXMub3duZXIucmVnaXN0ZXJFdmVudCh0aGlzLnZhdWx0Lm9uKFwiY3JlYXRlXCIsIChmaWxlOiBURmlsZSkgPT4geyB0aGlzLm9uZmlsZWNyZWF0ZWQoZmlsZSkgfSkpO1xuICAgIHRoaXMub3duZXIucmVnaXN0ZXJFdmVudCh0aGlzLnZhdWx0Lm9uKFwibW9kaWZ5XCIsIChmaWxlOiBURmlsZSkgPT4geyB0aGlzLm9uZmlsZW1vZGlmaWVkKGZpbGUpIH0pKTtcbiAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRXZlbnQodGhpcy52YXVsdC5vbihcImRlbGV0ZVwiLCAoZmlsZTogVEZpbGUpID0+IHsgdGhpcy5vbmZpbGVkZWxldGVkKGZpbGUpIH0pKTtcbiAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRXZlbnQodGhpcy52YXVsdC5vbihcInJlbmFtZVwiLCAoZmlsZTogVEZpbGUsIG9sZFBhdGg6IHN0cmluZykgPT4geyB0aGlzLm9uZmlsZXJlbmFtZWQoZmlsZSwgb2xkUGF0aCkgfSkpO1xuICAgIHRoaXMub3duZXIucmVnaXN0ZXJFdmVudCh0aGlzLm1ldGFkYXRhQ2FjaGUub24oXCJyZXNvbHZlXCIsIChmaWxlOiBURmlsZSkgPT4geyB0aGlzLm9uZmlsZW1vZGlmaWVkKGZpbGUpIH0pKTtcbiAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRXZlbnQodGhpcy5tZXRhZGF0YUNhY2hlLm9uKFwiY2hhbmdlZFwiLCAoZmlsZTogVEZpbGUpID0+IHsgdGhpcy5vbmZpbGVtb2RpZmllZChmaWxlKSB9KSk7XG5cbiAgICB0aGlzLmRhdGEuY2xlYXIoKTtcbiAgICB0aGlzLmJhY2tsb2cgPSBuZXcgQXJyYXkoKTtcbiAgICB0aGlzLnZhdWx0TWV0cmljcz8ucmVzZXQoKTtcbiAgICB0aGlzLnZhdWx0LmdldEZpbGVzKCkuZm9yRWFjaCgoZmlsZTogVEZpbGUpID0+IHtcbiAgICAgIGlmICghKGZpbGUgaW5zdGFuY2VvZiBURm9sZGVyKSkge1xuICAgICAgICB0aGlzLnB1c2goZmlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vd25lci5yZWdpc3RlckludGVydmFsKCtzZXRJbnRlcnZhbCgoKSA9PiB7IHRoaXMucHJvY2Vzc0JhY2tsb2coKSB9LCAyMDAwKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgcHVzaChmaWxlT3JQYXRoOiBURmlsZSB8IHN0cmluZykge1xuICAgIGlmIChmaWxlT3JQYXRoIGluc3RhbmNlb2YgVEZvbGRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwYXRoID0gKGZpbGVPclBhdGggaW5zdGFuY2VvZiBURmlsZSkgPyBmaWxlT3JQYXRoLnBhdGggOiBmaWxlT3JQYXRoO1xuICAgIGlmICghdGhpcy5iYWNrbG9nLmNvbnRhaW5zKHBhdGgpKSB7XG4gICAgICB0aGlzLmJhY2tsb2cucHVzaChwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHByb2Nlc3NCYWNrbG9nKCkge1xuICAgIHdoaWxlICh0aGlzLmJhY2tsb2cubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHBhdGggPSB0aGlzLmJhY2tsb2cuc2hpZnQoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBwcm9jZXNzaW5nICR7cGF0aH1gKTtcbiAgICAgIGxldCBmaWxlID0gdGhpcy52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGF0aCkgYXMgVEZpbGU7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgcGF0aCA9ICR7cGF0aH07IGZpbGUgPSAke2ZpbGV9YCk7XG4gICAgICBsZXQgbWV0cmljcyA9IGF3YWl0IHRoaXMuY29sbGVjdChmaWxlKTtcbiAgICAgIHRoaXMudXBkYXRlKHBhdGgsIG1ldHJpY3MpO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhcImRvbmVcIik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9uZmlsZWNyZWF0ZWQoZmlsZTogVEZpbGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgb25maWxlY3JlYXRlZCgke2ZpbGU/LnBhdGh9KWApO1xuICAgIHRoaXMucHVzaChmaWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb25maWxlbW9kaWZpZWQoZmlsZTogVEZpbGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgb25maWxlbW9kaWZpZWQoJHtmaWxlPy5wYXRofSlgKVxuICAgIHRoaXMucHVzaChmaWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgb25maWxlZGVsZXRlZChmaWxlOiBURmlsZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBvbmZpbGVkZWxldGVkKCR7ZmlsZT8ucGF0aH0pYClcbiAgICB0aGlzLnB1c2goZmlsZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9uZmlsZXJlbmFtZWQoZmlsZTogVEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xuICAgIC8vIGNvbnNvbGUubG9nKGBvbmZpbGVyZW5hbWVkKCR7ZmlsZT8ucGF0aH0pYClcbiAgICB0aGlzLnB1c2goZmlsZSk7XG4gICAgdGhpcy5wdXNoKG9sZFBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWxlVHlwZShmaWxlOiBURmlsZSk6IEZpbGVUeXBlIHtcbiAgICBpZiAoZmlsZS5leHRlbnNpb24/LnRvTG93ZXJDYXNlKCkgPT09IFwibWRcIikge1xuICAgICAgcmV0dXJuIEZpbGVUeXBlLk5vdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBGaWxlVHlwZS5BdHRhY2htZW50O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb2xsZWN0KGZpbGU6IFRGaWxlKTogUHJvbWlzZTxWYXVsdE1ldHJpY3M+IHtcbiAgICBsZXQgbWV0YWRhdGE6IENhY2hlZE1ldGFkYXRhID0gdGhpcy5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcblxuICAgIGlmIChtZXRhZGF0YSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5nZXRGaWxlVHlwZShmaWxlKSkge1xuICAgICAgY2FzZSBGaWxlVHlwZS5Ob3RlOlxuICAgICAgICByZXR1cm4gbmV3IE5vdGVNZXRyaWNzQ29sbGVjdG9yKHRoaXMudmF1bHQpLmNvbGxlY3QoZmlsZSwgbWV0YWRhdGEpO1xuICAgICAgY2FzZSBGaWxlVHlwZS5BdHRhY2htZW50OlxuICAgICAgICByZXR1cm4gbmV3IEZpbGVNZXRyaWNzQ29sbGVjdG9yKCkuY29sbGVjdChmaWxlLCBtZXRhZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShmaWxlT3JQYXRoOiBURmlsZSB8IHN0cmluZywgbWV0cmljczogVmF1bHRNZXRyaWNzKSB7XG4gICAgbGV0IGtleSA9IChmaWxlT3JQYXRoIGluc3RhbmNlb2YgVEZpbGUpID8gZmlsZU9yUGF0aC5wYXRoIDogZmlsZU9yUGF0aDtcblxuICAgIC8vIFJlbW92ZSB0aGUgZXhpc3RpbmcgdmFsdWVzIGZvciB0aGUgcGFzc2VkIGZpbGUgaWYgcHJlc2VudCwgdXBkYXRlIHRoZVxuICAgIC8vIHJhdyB2YWx1ZXMsIHRoZW4gYWRkIHRoZSB2YWx1ZXMgZm9yIHRoZSBwYXNzZWQgZmlsZSB0byB0aGUgdG90YWxzLlxuICAgIHRoaXMudmF1bHRNZXRyaWNzPy5kZWModGhpcy5kYXRhLmdldChrZXkpKTtcblxuICAgIGlmIChtZXRyaWNzID09IG51bGwpIHtcbiAgICAgIHRoaXMuZGF0YS5kZWxldGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhLnNldChrZXksIG1ldHJpY3MpO1xuICAgIH1cblxuICAgIHRoaXMudmF1bHRNZXRyaWNzPy5pbmMobWV0cmljcyk7XG4gIH1cblxufVxuXG5jbGFzcyBOb3RlTWV0cmljc0NvbGxlY3RvciB7XG5cbiAgc3RhdGljIFRPS0VOSVpFUlMgPSBuZXcgTWFwKFtcbiAgICBbXCJwYXJhZ3JhcGhcIiwgTUFSS0RPV05fVE9LRU5JWkVSXSxcbiAgICBbXCJoZWFkaW5nXCIsIE1BUktET1dOX1RPS0VOSVpFUl0sXG4gICAgW1wibGlzdFwiLCBNQVJLRE9XTl9UT0tFTklaRVJdLFxuICAgIFtcInRhYmxlXCIsIFVOSVRfVE9LRU5JWkVSXSxcbiAgICBbXCJ5YW1sXCIsIFVOSVRfVE9LRU5JWkVSXSxcbiAgICBbXCJjb2RlXCIsIFVOSVRfVE9LRU5JWkVSXSxcbiAgICBbXCJibG9ja3F1b3RlXCIsIE1BUktET1dOX1RPS0VOSVpFUl0sXG4gICAgW1wibWF0aFwiLCBVTklUX1RPS0VOSVpFUl0sXG4gICAgW1widGhlbWF0aWNCcmVha1wiLCBVTklUX1RPS0VOSVpFUl0sXG4gICAgW1wiaHRtbFwiLCBVTklUX1RPS0VOSVpFUl0sXG4gICAgW1widGV4dFwiLCBVTklUX1RPS0VOSVpFUl0sXG4gICAgW1wiZWxlbWVudFwiLCBVTklUX1RPS0VOSVpFUl0sXG4gICAgW1wiZm9vdG5vdGVEZWZpbml0aW9uXCIsIFVOSVRfVE9LRU5JWkVSXSxcbiAgICBbXCJkZWZpbml0aW9uXCIsIFVOSVRfVE9LRU5JWkVSXSxcbiAgICBbXCJjYWxsb3V0XCIsIE1BUktET1dOX1RPS0VOSVpFUl0sXG4gIF0pO1xuXG4gIHByaXZhdGUgdmF1bHQ6IFZhdWx0O1xuXG4gIGNvbnN0cnVjdG9yKHZhdWx0OiBWYXVsdCkge1xuICAgIHRoaXMudmF1bHQgPSB2YXVsdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb2xsZWN0KGZpbGU6IFRGaWxlLCBtZXRhZGF0YTogQ2FjaGVkTWV0YWRhdGEpOiBQcm9taXNlPFZhdWx0TWV0cmljcz4ge1xuICAgIGxldCBtZXRyaWNzID0gbmV3IFZhdWx0TWV0cmljcygpO1xuXG4gICAgbWV0cmljcy5maWxlcyA9IDE7XG4gICAgbWV0cmljcy5ub3RlcyA9IDE7XG4gICAgbWV0cmljcy5hdHRhY2htZW50cyA9IDA7XG4gICAgbWV0cmljcy5zaXplID0gZmlsZS5zdGF0Py5zaXplO1xuICAgIG1ldHJpY3MubGlua3MgPSBtZXRhZGF0YT8ubGlua3M/Lmxlbmd0aCB8fCAwO1xuICAgIG1ldHJpY3Mud29yZHMgPSAwO1xuICAgIG1ldHJpY3Mud29yZHMgPSBhd2FpdCB0aGlzLnZhdWx0LmNhY2hlZFJlYWQoZmlsZSkudGhlbigoY29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gbWV0YWRhdGEuc2VjdGlvbnM/Lm1hcChzZWN0aW9uID0+IHtcbiAgICAgICAgY29uc3Qgc2VjdGlvblR5cGUgPSBzZWN0aW9uLnR5cGU7XG4gICAgICAgIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gc2VjdGlvbi5wb3NpdGlvbj8uc3RhcnQ/Lm9mZnNldDtcbiAgICAgICAgY29uc3QgZW5kT2Zmc2V0ID0gc2VjdGlvbi5wb3NpdGlvbj8uZW5kPy5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IHRva2VuaXplciA9IE5vdGVNZXRyaWNzQ29sbGVjdG9yLlRPS0VOSVpFUlMuZ2V0KHNlY3Rpb25UeXBlKTtcbiAgICAgICAgaWYgKCF0b2tlbml6ZXIpIHtcbiAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtmaWxlLnBhdGh9OiBubyB0b2tlbml6ZXIsIHNlY3Rpb24udHlwZT0ke3NlY3Rpb24udHlwZX1gKTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB0b2tlbnMgPSB0b2tlbml6ZXIudG9rZW5pemUoY29udGVudC5zdWJzdHJpbmcoc3RhcnRPZmZzZXQsIGVuZE9mZnNldCkpO1xuICAgICAgICAgIHJldHVybiB0b2tlbnMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYCR7ZmlsZS5wYXRofSAke2V9YCk7XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcblxuICAgIHJldHVybiBtZXRyaWNzO1xuICB9XG59XG5cbmNsYXNzIEZpbGVNZXRyaWNzQ29sbGVjdG9yIHtcblxuICBwdWJsaWMgYXN5bmMgY29sbGVjdChmaWxlOiBURmlsZSwgbWV0YWRhdGE6IENhY2hlZE1ldGFkYXRhKTogUHJvbWlzZTxWYXVsdE1ldHJpY3M+IHtcbiAgICBsZXQgbWV0cmljcyA9IG5ldyBWYXVsdE1ldHJpY3MoKTtcbiAgICBtZXRyaWNzLmZpbGVzID0gMTtcbiAgICBtZXRyaWNzLm5vdGVzID0gMDtcbiAgICBtZXRyaWNzLmF0dGFjaG1lbnRzID0gMTtcbiAgICBtZXRyaWNzLnNpemUgPSBmaWxlLnN0YXQ/LnNpemU7XG4gICAgbWV0cmljcy5saW5rcyA9IDA7XG4gICAgbWV0cmljcy53b3JkcyA9IDA7XG4gICAgcmV0dXJuIG1ldHJpY3M7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgU3RhdGlzdGljc1BsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGlzdGljc1BsdWdpblNldHRpbmdzIHtcbiAgZGlzcGxheUluZGl2aWR1YWxJdGVtczogYm9vbGVhbixcbiAgc2hvd05vdGVzOiBib29sZWFuLFxuICBzaG93QXR0YWNobWVudHM6IGJvb2xlYW4sXG4gIHNob3dGaWxlczogYm9vbGVhbixcbiAgc2hvd0xpbmtzOiBib29sZWFuLFxuICBzaG93V29yZHM6IGJvb2xlYW4sXG4gIHNob3dTaXplOiBib29sZWFuLFxufVxuXG5leHBvcnQgY2xhc3MgU3RhdGlzdGljc1BsdWdpblNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcGx1Z2luOiBTdGF0aXN0aWNzUGx1Z2luO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFN0YXRpc3RpY3NQbHVnaW4pIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICBcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU2hvdyBpbmRpdmlkdWFsIGl0ZW1zXCIpXG4gICAgICAuc2V0RGVzYyhcIldoZXRoZXIgdG8gc2hvdyBtdWx0aXBsZSBpdGVtcyBhdCBvbmNlIG9yIGN5Y2xlIHRoZW0gd2l0aCBhIGNsaWNrXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB2YWx1ZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNwbGF5SW5kaXZpZHVhbEl0ZW1zKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc3BsYXlJbmRpdmlkdWFsSXRlbXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGlmICghdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzcGxheUluZGl2aWR1YWxJdGVtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJTaG93IG5vdGVzXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB2YWx1ZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93Tm90ZXMpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hvd05vdGVzID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlNob3cgYXR0YWNobWVudHNcIilcbiAgICAgIC5hZGRUb2dnbGUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHZhbHVlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dBdHRhY2htZW50cylcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93QXR0YWNobWVudHMgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU2hvdyBmaWxlc1wiKVxuICAgICAgLmFkZFRvZ2dsZSgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hvd0ZpbGVzKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dGaWxlcyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJTaG93IGxpbmtzXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB2YWx1ZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93TGlua3MpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hvd0xpbmtzID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlNob3cgd29yZHNcIilcbiAgICAgIC5hZGRUb2dnbGUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHZhbHVlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dXb3JkcylcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93V29yZHMgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU2hvdyBzaXplXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB2YWx1ZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93U2l6ZSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93U2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWYXVsdCwgVEZpbGUsIFBsdWdpbiwgZGVib3VuY2UsIE1ldGFkYXRhQ2FjaGUsIENhY2hlZE1ldGFkYXRhLCBURm9sZGVyIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgQnl0ZXNGb3JtYXR0ZXIsIERlY2ltYWxVbml0Rm9ybWF0dGVyIH0gZnJvbSAnLi9mb3JtYXQnO1xuaW1wb3J0IHsgVmF1bHRNZXRyaWNzIH0gZnJvbSAnLi9tZXRyaWNzJztcbmltcG9ydCB7IFZhdWx0TWV0cmljc0NvbGxlY3RvciB9IGZyb20gJy4vY29sbGVjdCc7XG5pbXBvcnQgeyBTdGF0aXN0aWNzUGx1Z2luU2V0dGluZ3MsIFN0YXRpc3RpY3NQbHVnaW5TZXR0aW5nVGFiIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFBhcnRpYWw8U3RhdGlzdGljc1BsdWdpblNldHRpbmdzPiA9IHtcbiAgZGlzcGxheUluZGl2aWR1YWxJdGVtczogZmFsc2UsXG4gIHNob3dOb3RlczogZmFsc2UsXG4gIHNob3dBdHRhY2htZW50czogZmFsc2UsXG4gIHNob3dGaWxlczogZmFsc2UsXG4gIHNob3dMaW5rczogZmFsc2UsXG4gIHNob3dXb3JkczogZmFsc2UsXG4gIHNob3dTaXplOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpc3RpY3NQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIHByaXZhdGUgc3RhdHVzQmFySXRlbTogU3RhdGlzdGljc1N0YXR1c0Jhckl0ZW0gPSBudWxsO1xuXG4gIHB1YmxpYyB2YXVsdE1ldHJpY3NDb2xsZWN0b3I6IFZhdWx0TWV0cmljc0NvbGxlY3RvcjtcbiAgcHVibGljIHZhdWx0TWV0cmljczogVmF1bHRNZXRyaWNzO1xuXG4gIHNldHRpbmdzOiBTdGF0aXN0aWNzUGx1Z2luU2V0dGluZ3M7XG5cbiAgYXN5bmMgb25sb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKCdMb2FkaW5nIHZhdWx0LXN0YXRpc3RpY3MgUGx1Z2luJyk7XG4gICAgXG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIHRoaXMudmF1bHRNZXRyaWNzID0gbmV3IFZhdWx0TWV0cmljcygpO1xuXG4gICAgdGhpcy52YXVsdE1ldHJpY3NDb2xsZWN0b3IgPSBuZXcgVmF1bHRNZXRyaWNzQ29sbGVjdG9yKHRoaXMpLlxuICAgICAgc2V0VmF1bHQodGhpcy5hcHAudmF1bHQpLlxuICAgICAgc2V0TWV0YWRhdGFDYWNoZSh0aGlzLmFwcC5tZXRhZGF0YUNhY2hlKS5cbiAgICAgIHNldFZhdWx0TWV0cmljcyh0aGlzLnZhdWx0TWV0cmljcykuXG4gICAgICBzdGFydCgpO1xuXG4gICAgdGhpcy5zdGF0dXNCYXJJdGVtID0gbmV3IFN0YXRpc3RpY3NTdGF0dXNCYXJJdGVtKHRoaXMsIHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpKS5cbiAgICAgIHNldFZhdWx0TWV0cmljcyh0aGlzLnZhdWx0TWV0cmljcyk7XG5cbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFN0YXRpc3RpY3NQbHVnaW5TZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gIH1cblxuICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gIH1cbiAgXG4gIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIHRoaXMuc3RhdHVzQmFySXRlbS5yZWZyZXNoKCk7XG4gIH1cbn1cblxuLyoqXG4gKiB7QGxpbmsgU3RhdGlzdGljVmlld30gaXMgcmVzcG9uc2libGUgZm9yIG1haW50YWluaW5nIHRoZSBET00gcmVwcmVzZW50YXRpb25cbiAqIG9mIGEgZ2l2ZW4gc3RhdGlzdGljLlxuICovXG5jbGFzcyBTdGF0aXN0aWNWaWV3IHtcblxuICAvKiogUm9vdCBub2RlIGZvciB0aGUge0BsaW5rIFN0YXRpc3RpY1ZpZXd9LiAqL1xuICBwcml2YXRlIGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudDtcblxuICAvKiogRm9ybWF0dGVyIHRoYXQgZXh0cmFjdHMgYW5kIGZvcm1hdHMgYSB2YWx1ZSBmcm9tIGEge0BsaW5rIFN0YXRpc3RpY3N9IGluc3RhbmNlLiAqL1xuICBwcml2YXRlIGZvcm1hdHRlcjogKHM6IFZhdWx0TWV0cmljcykgPT4gc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRhaW5lckVsIFRoZSBwYXJlbnQgZWxlbWVudCBmb3IgdGhlIHZpZXcuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXJFbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsID0gY29udGFpbmVyRWwuY3JlYXRlU3Bhbih7IGNsczogW1wib2JzaWRpYW4tdmF1bHQtc3RhdGlzdGljcy0taXRlbVwiXSB9KTtcbiAgICB0aGlzLnNldEFjdGl2ZShmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgc3RhdGlzdGljLlxuICAgKi9cbiAgc2V0U3RhdGlzdGljTmFtZShuYW1lOiBzdHJpbmcpOiBTdGF0aXN0aWNWaWV3IHtcbiAgICB0aGlzLmNvbnRhaW5lckVsLmFkZENsYXNzKGBvYnNpZGlhbi12YXVsdC1zdGF0aXN0aWNzLS1pdGVtLSR7bmFtZX1gKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBmb3JtYXR0ZXIgdG8gdXNlIHRvIHByb2R1Y2UgdGhlIGNvbnRlbnQgb2YgdGhlIHZpZXcuXG4gICAqL1xuICBzZXRGb3JtYXR0ZXIoZm9ybWF0dGVyOiAoczogVmF1bHRNZXRyaWNzKSA9PiBzdHJpbmcpOiBTdGF0aXN0aWNWaWV3IHtcbiAgICB0aGlzLmZvcm1hdHRlciA9IGZvcm1hdHRlcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGRlc2lyZWQgYWN0aXZlIHN0YXR1cy5cbiAgICpcbiAgICogQWN0aXZlIHZpZXdzIGhhdmUgdGhlIENTUyBjbGFzcyBgb2JzaWRpYW4tdmF1bHQtc3RhdGlzdGljcy0taXRlbS1hY3RpdmVgXG4gICAqIGFwcGxpZWQsIGluYWN0aXZlIHZpZXdzIGhhdmUgdGhlIENTUyBjbGFzc1xuICAgKiBgb2JzaWRpYW4tdmF1bHQtc3RhdGlzdGljcy0taXRlbS1pbmFjdGl2ZWAgYXBwbGllZC4gVGhlc2UgY2xhc3NlcyBhcmVcbiAgICogbXV0dWFsbHkgZXhjbHVzaXZlLlxuICAgKi9cbiAgc2V0QWN0aXZlKGlzQWN0aXZlOiBib29sZWFuKTogU3RhdGlzdGljVmlldyB7XG4gICAgdGhpcy5jb250YWluZXJFbC5yZW1vdmVDbGFzcyhcIm9ic2lkaWFuLXZhdWx0LXN0YXRpc3RpY3MtLWl0ZW0tLWFjdGl2ZVwiKTtcbiAgICB0aGlzLmNvbnRhaW5lckVsLnJlbW92ZUNsYXNzKFwib2JzaWRpYW4tdmF1bHQtc3RhdGlzdGljcy0taXRlbS0taW5hY3RpdmVcIik7XG5cbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyRWwuYWRkQ2xhc3MoXCJvYnNpZGlhbi12YXVsdC1zdGF0aXN0aWNzLS1pdGVtLS1hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmVyRWwuYWRkQ2xhc3MoXCJvYnNpZGlhbi12YXVsdC1zdGF0aXN0aWNzLS1pdGVtLS1pbmFjdGl2ZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgdGhlIGNvbnRlbnQgb2YgdGhlIHZpZXcgd2l0aCBjb250ZW50IGZyb20gdGhlIHBhc3NlZCB7QGxpbmtcbiAgICogU3RhdGlzdGljc30uXG4gICAqL1xuICByZWZyZXNoKHM6IFZhdWx0TWV0cmljcykge1xuICAgIHRoaXMuY29udGFpbmVyRWwuc2V0VGV4dCh0aGlzLmZvcm1hdHRlcihzKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSB2aWV3LlxuICAgKi9cbiAgZ2V0VGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lckVsLmdldFRleHQoKTtcbiAgfVxufVxuXG5jbGFzcyBTdGF0aXN0aWNzU3RhdHVzQmFySXRlbSB7XG5cbiAgcHJpdmF0ZSBvd25lcjogU3RhdGlzdGljc1BsdWdpbjtcblxuICAvLyBoYW5kbGUgb2YgdGhlIHN0YXR1cyBiYXIgaXRlbSB0byBkcmF3IGludG8uXG4gIHByaXZhdGUgc3RhdHVzQmFySXRlbTogSFRNTEVsZW1lbnQ7XG5cbiAgLy8gcmF3IHN0YXRzXG4gIHByaXZhdGUgdmF1bHRNZXRyaWNzOiBWYXVsdE1ldHJpY3M7XG5cbiAgLy8gaW5kZXggb2YgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgc3RhdC5cbiAgcHJpdmF0ZSBkaXNwbGF5ZWRTdGF0aXN0aWNJbmRleCA9IDA7XG5cbiAgcHJpdmF0ZSBzdGF0aXN0aWNWaWV3czogQXJyYXk8U3RhdGlzdGljVmlldz4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihvd25lcjogU3RhdGlzdGljc1BsdWdpbiwgc3RhdHVzQmFySXRlbTogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgdGhpcy5zdGF0dXNCYXJJdGVtID0gc3RhdHVzQmFySXRlbTtcblxuICAgIHRoaXMuc3RhdGlzdGljVmlld3MucHVzaChuZXcgU3RhdGlzdGljVmlldyh0aGlzLnN0YXR1c0Jhckl0ZW0pLlxuICAgICAgc2V0U3RhdGlzdGljTmFtZShcIm5vdGVzXCIpLlxuICAgICAgc2V0Rm9ybWF0dGVyKChzOiBWYXVsdE1ldHJpY3MpID0+IHsgcmV0dXJuIG5ldyBEZWNpbWFsVW5pdEZvcm1hdHRlcihcIm5vdGVzXCIpLmZvcm1hdChzLm5vdGVzKSB9KSk7XG4gICAgdGhpcy5zdGF0aXN0aWNWaWV3cy5wdXNoKG5ldyBTdGF0aXN0aWNWaWV3KHRoaXMuc3RhdHVzQmFySXRlbSkuXG4gICAgICBzZXRTdGF0aXN0aWNOYW1lKFwiYXR0YWNobWVudHNcIikuXG4gICAgICBzZXRGb3JtYXR0ZXIoKHM6IFZhdWx0TWV0cmljcykgPT4geyByZXR1cm4gbmV3IERlY2ltYWxVbml0Rm9ybWF0dGVyKFwiYXR0YWNobWVudHNcIikuZm9ybWF0KHMuYXR0YWNobWVudHMpIH0pKTtcbiAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cbiAgICAgIHNldFN0YXRpc3RpY05hbWUoXCJmaWxlc1wiKS5cbiAgICAgIHNldEZvcm1hdHRlcigoczogVmF1bHRNZXRyaWNzKSA9PiB7IHJldHVybiBuZXcgRGVjaW1hbFVuaXRGb3JtYXR0ZXIoXCJmaWxlc1wiKS5mb3JtYXQocy5maWxlcykgfSkpO1xuICAgIHRoaXMuc3RhdGlzdGljVmlld3MucHVzaChuZXcgU3RhdGlzdGljVmlldyh0aGlzLnN0YXR1c0Jhckl0ZW0pLlxuICAgICAgc2V0U3RhdGlzdGljTmFtZShcImxpbmtzXCIpLlxuICAgICAgc2V0Rm9ybWF0dGVyKChzOiBWYXVsdE1ldHJpY3MpID0+IHsgcmV0dXJuIG5ldyBEZWNpbWFsVW5pdEZvcm1hdHRlcihcImxpbmtzXCIpLmZvcm1hdChzLmxpbmtzKSB9KSk7XG4gICAgdGhpcy5zdGF0aXN0aWNWaWV3cy5wdXNoKG5ldyBTdGF0aXN0aWNWaWV3KHRoaXMuc3RhdHVzQmFySXRlbSkuXG4gICAgICBzZXRTdGF0aXN0aWNOYW1lKFwid29yZHNcIikuXG4gICAgICBzZXRGb3JtYXR0ZXIoKHM6IFZhdWx0TWV0cmljcykgPT4geyByZXR1cm4gbmV3IERlY2ltYWxVbml0Rm9ybWF0dGVyKFwid29yZHNcIikuZm9ybWF0KHMud29yZHMpIH0pKTtcbiAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cbiAgICAgIHNldFN0YXRpc3RpY05hbWUoXCJzaXplXCIpLlxuICAgICAgc2V0Rm9ybWF0dGVyKChzOiBWYXVsdE1ldHJpY3MpID0+IHsgcmV0dXJuIG5ldyBCeXRlc0Zvcm1hdHRlcigpLmZvcm1hdChzLnNpemUpIH0pKTtcblxuICAgIHRoaXMuc3RhdHVzQmFySXRlbS5vbkNsaWNrRXZlbnQoKCkgPT4geyB0aGlzLm9uY2xpY2soKSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWYXVsdE1ldHJpY3ModmF1bHRNZXRyaWNzOiBWYXVsdE1ldHJpY3MpIHtcbiAgICB0aGlzLnZhdWx0TWV0cmljcyA9IHZhdWx0TWV0cmljcztcbiAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRXZlbnQodGhpcy52YXVsdE1ldHJpY3M/Lm9uKFwidXBkYXRlZFwiLCB0aGlzLnJlZnJlc2hTb29uKSk7XG4gICAgdGhpcy5yZWZyZXNoU29vbigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoU29vbiA9IGRlYm91bmNlKCgpID0+IHsgdGhpcy5yZWZyZXNoKCk7IH0sIDIwMDAsIGZhbHNlKTtcblxuICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICBpZiAodGhpcy5vd25lci5zZXR0aW5ncy5kaXNwbGF5SW5kaXZpZHVhbEl0ZW1zKSB7XG4gICAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzWzBdLnNldEFjdGl2ZSh0aGlzLm93bmVyLnNldHRpbmdzLnNob3dOb3RlcykucmVmcmVzaCh0aGlzLnZhdWx0TWV0cmljcyk7XG4gICAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzWzFdLnNldEFjdGl2ZSh0aGlzLm93bmVyLnNldHRpbmdzLnNob3dBdHRhY2htZW50cykucmVmcmVzaCh0aGlzLnZhdWx0TWV0cmljcyk7XG4gICAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzWzJdLnNldEFjdGl2ZSh0aGlzLm93bmVyLnNldHRpbmdzLnNob3dGaWxlcykucmVmcmVzaCh0aGlzLnZhdWx0TWV0cmljcyk7XG4gICAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzWzNdLnNldEFjdGl2ZSh0aGlzLm93bmVyLnNldHRpbmdzLnNob3dMaW5rcykucmVmcmVzaCh0aGlzLnZhdWx0TWV0cmljcyk7XG4gICAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzWzRdLnNldEFjdGl2ZSh0aGlzLm93bmVyLnNldHRpbmdzLnNob3dXb3JkcykucmVmcmVzaCh0aGlzLnZhdWx0TWV0cmljcyk7XG4gICAgICB0aGlzLnN0YXRpc3RpY1ZpZXdzWzVdLnNldEFjdGl2ZSh0aGlzLm93bmVyLnNldHRpbmdzLnNob3dTaXplKS5yZWZyZXNoKHRoaXMudmF1bHRNZXRyaWNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0aXN0aWNWaWV3cy5mb3JFYWNoKCh2aWV3LCBpKSA9PiB7XG4gICAgICAgIHZpZXcuc2V0QWN0aXZlKHRoaXMuZGlzcGxheWVkU3RhdGlzdGljSW5kZXggPT0gaSkucmVmcmVzaCh0aGlzLnZhdWx0TWV0cmljcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXR1c0Jhckl0ZW0udGl0bGUgPSB0aGlzLnN0YXRpc3RpY1ZpZXdzLm1hcCh2aWV3ID0+IHZpZXcuZ2V0VGV4dCgpKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbmNsaWNrKCkge1xuICAgIGlmICghdGhpcy5vd25lci5zZXR0aW5ncy5kaXNwbGF5SW5kaXZpZHVhbEl0ZW1zKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZFN0YXRpc3RpY0luZGV4ID0gKHRoaXMuZGlzcGxheWVkU3RhdGlzdGljSW5kZXggKyAxKSAlIHRoaXMuc3RhdGlzdGljVmlld3MubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkV2ZW50cyIsIlRGb2xkZXIiLCJURmlsZSIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGx1Z2luIiwiZGVib3VuY2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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UyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENB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QUFDLENBQUM7QUFDbEMsUUFBQSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUEsT0FBTyxLQUFBLElBQUEsSUFBUCxPQUFPLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQVAsT0FBTyxDQUFFLEtBQUssS0FBSSxDQUFDLENBQUM7QUFDbEMsUUFBQSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUEsT0FBTyxLQUFBLElBQUEsSUFBUCxPQUFPLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQVAsT0FBTyxDQUFFLFdBQVcsS0FBSSxDQUFDLENBQUM7QUFDOUMsUUFBQSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUEsT0FBTyxLQUFBLElBQUEsSUFBUCxPQUFPLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQVAsT0FBTyxDQUFFLElBQUksS0FBSSxDQUFDLENBQUM7QUFDaEMsUUFBQSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUEsT0FBTyxLQUFBLElBQUEsSUFBUCxPQUFPLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQVAsT0FBTyxDQUFFLEtBQUssS0FBSSxDQUFDLENBQUM7QUFDbEMsUUFBQSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUEsT0FBTyxLQUFBLElBQUEsSUFBUCxPQUFPLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQVAsT0FBTyxDQUFFLEtBQUssS0FBSSxDQUFDLENBQUM7QUFDbEMsUUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pCLENBQUE7SUFFTSxZQUFHLENBQUEsU0FBQSxDQUFBLEdBQUEsR0FBVixVQUFXLE9BQXFCLEVBQUE7QUFDOUIsUUFBQSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUEsT0FBTyxLQUFBLElBQUEsSUFBUCxPQUFPLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQVAsT0FBTyxDQUFFLEtBQUssS0FBSSxDQUFDLENBQUM7QUFDbEMsUUFBQSxJQUFJLENBQUMsS0FBSyxJ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
