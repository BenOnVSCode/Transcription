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
exports.openai = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config();
// Initialize OpenAI API
const OPENAI_KEY = process.env.OPENAI_SECRET_KEY;
if (!OPENAI_KEY)
    throw "No key found";
exports.openai = new openai_1.default({
    apiKey: OPENAI_KEY, // This is the default and can be omitted
});
const inputDir = path_1.default.join(__dirname, '../recordings');
const outputDir = path_1.default.join(__dirname, '../transcriptions');
// Ensure the output directory exists
fs_extra_1.default.ensureDirSync(outputDir);
const processAudioFile = (audioFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const audioFileName = path_1.default.basename(audioFilePath, path_1.default.extname(audioFilePath));
    const outputFilePath = path_1.default.join(outputDir, `${audioFileName}.txt`);
    try {
        // Transcribe audio using OpenAI Whisper
        const transcription = yield exports.openai.audio.transcriptions.create({
            file: fs_extra_1.default.createReadStream(audioFilePath),
            model: "whisper-1",
            language: "de", // Specify the language if known, otherwise remove this line
        });
        // Write the transcription to the output file
        yield fs_extra_1.default.writeFile(outputFilePath, transcription.text);
        console.log(`Transcription saved for ${audioFileName}`);
    }
    catch (error) {
        console.error(`Error processing ${audioFileName}:`, error);
    }
});
const processAllAudioFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fs_extra_1.default.readdir(inputDir);
    for (const file of files) {
        const filePath = path_1.default.join(inputDir, file);
        if (path_1.default.extname(file).toLowerCase() === '.wav') {
            yield processAudioFile(filePath);
        }
    }
});
processAllAudioFiles().then(() => console.log('All files processed.'));
