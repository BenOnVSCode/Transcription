# Whisper Transcription Script

This project provides a script to transcribe audio files using the OpenAI Whisper model. The script reads audio files from the `recordings` folder, transcribes them, and saves the transcriptions as text files in the `transcriptions` folder.

## Prerequisites

* Node.js (v14 or later)
* An OpenAI API key

## Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/whisper-transcription.git
   cd whisper-transcription
   ```
3. **Install the dependencies:**
   ```
   npm install
   ```
5. **Set up your OpenAI API key:**
   * Create a `.env` file in the root of the project.
   * Add your OpenAI API key to the `.env` file:
     ```
     OPENAI_API_KEY=your-openai-api-key
     ```
6. **Ensure that the `recordings` and `transcriptions` folders exist:**
    ```
   mkdir -p recordings transcriptions
    ```

## Folder Structure

## Usage

1. **Place your audio files (e.g., `.wav` format) into the `recordings` folder.**
2. **Build the project:**
   ```
   npx tsc
   
   ```
3. **Run the script:**
   ```
   node src/index.js
   ```
4. **The transcriptions will be saved as `.txt` files in the `transcriptions` folder with the same name as the audio files.**

* `recordings/`: Place your audio files here.
* `transcriptions/`: Transcriptions will be saved here.

## Notes

* The script currently processes `.wav` files by default. Modify the script if you need to handle other audio formats.
* Ensure your OpenAI API key is kept secure and never shared publicly.
