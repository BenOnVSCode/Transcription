import fs from 'fs-extra';
import path from 'path';
import dotenv from "dotenv"
import OpenAI from 'openai';
dotenv.config()


// Initialize OpenAI API
const OPENAI_KEY = process.env.OPENAI_SECRET_KEY;
if(!OPENAI_KEY) throw "No key found"


export const openai = new OpenAI({
  apiKey: OPENAI_KEY, // This is the default and can be omitted
});



const inputDir = path.join(__dirname, '../recordings');
const outputDir = path.join(__dirname, '../transcriptions');

// Ensure the output directory exists
fs.ensureDirSync(outputDir);

const processAudioFile = async (audioFilePath: string) => {
  const audioFileName = path.basename(audioFilePath, path.extname(audioFilePath));
  const outputFilePath = path.join(outputDir, `${audioFileName}.txt`);

  try {
    // Transcribe audio using OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: "whisper-1",
      language: "de", // Specify the language if known, otherwise remove this line
    });

    // Write the transcription to the output file
    await fs.writeFile(outputFilePath, transcription.text);
    console.log(`Transcription saved for ${audioFileName}`);
  } catch (error) {
    console.error(`Error processing ${audioFileName}:`, error);
  }
};

const processAllAudioFiles = async () => {
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const filePath = path.join(inputDir, file);
    if (path.extname(file).toLowerCase() === '.wav') { 
      await processAudioFile(filePath);
    }
  }
};

processAllAudioFiles().then(() => console.log('All files processed.'));
