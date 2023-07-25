import mongoose from "mongoose";
import { resolve,dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// Get the directory name of current module
const __dirname = dirname(fileURLToPath(import.meta.url));
// Load environment variables from the ".env" file in root directory of project using dotenv package
config({ path: resolve(__dirname, "./.env") });

const uri = process.env.DB_CONNECTION;

export const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
