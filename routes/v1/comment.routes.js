import {Router} from 'express';
import {createForPost, deleteById, getAllForPost, getById} from '../../controllers/comment.controller.js';


const router =  Router({mergeParams: true});
router.get('/', getAllForPost)
router.post('/', createForPost)
router.get('/:commentId', getById)
router.delete('/:commentId', deleteById)


export default router;
