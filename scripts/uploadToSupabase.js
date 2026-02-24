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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_s3_1 = require("@aws-sdk/client-s3");
var fs = require("fs");
var path = require("path");
var mime = require("mime-types");
var BUCKET_NAME = "vehicles";
var PUBLIC_DIR = path.join(process.cwd(), "public", "cars");
var s3Client = new client_s3_1.S3Client({
    forcePathStyle: true,
    region: "us-west-2",
    endpoint: "https://riqguufkfqlvfrayhvbt.storage.supabase.co/storage/v1/s3",
    credentials: {
        accessKeyId: "8f0b8a781ba12157d4f7ce1a3a98c02a",
        secretAccessKey: "4fa793ddbd70c1a796ec6aba77545acad9347da47e6f92e0ea809bb0b29f4e58",
    },
});
function ensureBucketExists() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 6]);
                    return [4 /*yield*/, s3Client.send(new client_s3_1.HeadBucketCommand({ Bucket: BUCKET_NAME }))];
                case 1:
                    _b.sent();
                    console.log("Bucket \"".concat(BUCKET_NAME, "\" already exists."));
                    return [3 /*break*/, 6];
                case 2:
                    error_1 = _b.sent();
                    if (!(error_1.name === 'NotFound' || ((_a = error_1.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) === 404)) return [3 /*break*/, 4];
                    console.log("Creating bucket \"".concat(BUCKET_NAME, "\"..."));
                    return [4 /*yield*/, s3Client.send(new client_s3_1.CreateBucketCommand({ Bucket: BUCKET_NAME }))];
                case 3:
                    _b.sent();
                    console.log("Bucket created successfully (Note: Make it public in Supabase Dashboard!).");
                    return [3 /*break*/, 5];
                case 4: throw error_1;
                case 5: return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function uploadImages() {
    return __awaiter(this, void 0, void 0, function () {
        var files, _i, files_1, file, filePath, stats, fileStream, contentType, uploadParams, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ensureBucketExists()];
                case 1:
                    _a.sent();
                    files = fs.readdirSync(PUBLIC_DIR);
                    _i = 0, files_1 = files;
                    _a.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 7];
                    file = files_1[_i];
                    filePath = path.join(PUBLIC_DIR, file);
                    stats = fs.statSync(filePath);
                    if (!stats.isFile()) return [3 /*break*/, 6];
                    fileStream = fs.createReadStream(filePath);
                    contentType = mime.lookup(filePath) || 'application/octet-stream';
                    uploadParams = {
                        Bucket: BUCKET_NAME,
                        Key: file,
                        Body: fileStream,
                        ContentType: contentType,
                    };
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, s3Client.send(new client_s3_1.PutObjectCommand(uploadParams))];
                case 4:
                    _a.sent();
                    console.log("\u2705 Uploaded: ".concat(file));
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.error("\u274C Failed to upload ".concat(file, ":"), err_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    console.log("Upload process finished.");
                    return [2 /*return*/];
            }
        });
    });
}
uploadImages().catch(console.error);
