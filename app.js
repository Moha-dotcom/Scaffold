import express from 'express';
import session from 'express-session'
import passport from 'passport';
import logger from './logger.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from "path";
const app = express();
import setupPassport from './config/passport.js'




setupPassport();

app.use(session({
    secret: process.env.SESSION_SECRET || 'Mike Never Lies', // required
    resave: false,            // don’t save session if unmodified
    saveUninitialized: false, // don’t create session until something stored
    cookie: {
        secure: false,        // set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));
app.use(passport.initialize());
app.use(passport.session())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.json({ ok: true }));


//
import authRoutes from './routes/v1/auth.routes.js';
import postRoutes from "./routes/v1/post.routes.js";
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);


export default app;








