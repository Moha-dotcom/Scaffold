import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import sql from '../db/index.js';
import logger from '../logger.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
logger.info(process.env.DISCORD_CLIENT_ID);

const scope = ['identify', 'email', 'guilds']; // identify must be first
logger.info("Passport DiscordStrategy Authentication");
logger.info("Discord Callback URL:", );
logger.info(process.env.DISCORD_CALLBACK_URL)


// const idm = '143426452611f4521132'
// const result = await sql `SELECT * FROM USERS where discord_id  = ${idm}`
// logger.info(result[0])

export default function setupPassport() {

    // Serialize user: store Discord ID in session
    passport.serializeUser((user, done) => {
        done(null, user.discord_id);
    });

    // Deserialize user: fetch from DB using Discord ID
    passport.deserializeUser(async (discordId, done) => {
        try {
            const users = await sql`SELECT * FROM users WHERE discord_id = ${discordId}`;

            done(null, users[0]);
        } catch (err) {
            done(err);
        }
    });

    // Discord OAuth strategy
    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_CALLBACK_URL,
        scope: scope,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {


        try {
            logger.info("User logging in:", profile.username);
            logger.info("User logging in:", profile.id);

            const discordId = profile.id;
            const username = profile.username;
            const discriminator = String(profile.discriminator).padStart(4, '0'); // always 4 digits
            const avatar = profile.avatar || null;
            const email = profile.email || null;

            // Insert or update user in DB
            const rows = await sql`
        INSERT INTO users (discord_id, username, discriminator, avatar, email) 
        VALUES (${discordId}, ${username}, ${discriminator}, ${avatar}, ${email})
        ON CONFLICT (discord_id)
        DO UPDATE SET 
          username = ${username},
          discriminator = ${discriminator},
          avatar = ${avatar},
          email = ${email},
          updated_at = now()
        RETURNING *;
      `;

            return done(null, rows[0]);
        } catch (err) {
            logger.error("Discord strategy error:", err);
            return done(err);
        }
    }));
}