import express from 'express';
import passport from 'passport';

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
    res.send(`
        <h1>Welcome, ${req.user.username}!</h1>
        <p>Your Discord ID: ${req.user.discord_id}</p>
        <a href="/api/v1/auth/logout">Logout</a>
    `);
});


// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/api/v1/auth/discord');
    });
});

export default router;