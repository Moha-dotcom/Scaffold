import e, {Router} from 'express';
import commentRouter from './comment.routes.js';
// import likeRouter from './like.routes';
import {
    createPost, getAllPost, getPostById
} from "../../controllers/post.controller.js";

const router = Router();
function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect('/api/v1/auth');
}

router.use(ensureAuthentication);

router.get("/", getAllPost);
router.get("/:postId", getPostById);
// CREATE post
router.post("/create", createPost);
router.use('/:postId/comments',  commentRouter);
// router.use("/:postId/likes", likeRouter);
export default router;