import {Router} from 'express';
import {createForPost, getAllForPost} from '../../controllers/comment.controller.js';


const router =  Router({mergeParams: true});
// createForPost, getById, deletById
router.get('/', getAllForPost)
router.post('/', createForPost)
// router.get('/:commentId', getById)
// router.get('/:commentId', deletById)


export default router;
