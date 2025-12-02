import postgres from "postgres";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import logger from "../logger.js";
// import * as path from "node:path";
import path from "path";

logger.info("Starting DB");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const sql = postgres({

    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME

});

export default sql;