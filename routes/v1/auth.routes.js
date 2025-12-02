import express from 'express';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect('/api/v1/auth/discord');
}

// Start OAuth
router.get('/discord', passport.authenticate('discord'));





router.get(
    '/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: '/api/v1/auth/failure',
        successRedirect: '/api/v1/auth/dashboard'
    }),
);

router.get("/success", (req, res) => {
    res.json({ success: true, user: req.user });
});

router.get("/failure", (req, res) => {
    res.status(401).json({ success: false });
});


// // Dashboard
router.get('/dashboard', ensureAuthentication, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/dashboard.html'));
});


// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

export default router;