import *as controller1 from './controller1.js';
import express from 'express';
const router=express.Router();


// Define routes
router.post('/save', controller1.savecategory);
router.get('/fetch', controller1.fetchcategory);
router.patch('/update', controller1.updatecategory);
router.delete('/delete', controller1.deletecategory);

export default router;