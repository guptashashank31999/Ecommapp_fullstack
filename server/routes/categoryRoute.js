const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { categoryController, updateCategoryController, getAllcategoryController, singleCategoryController, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

//rOUTES
router.post('/create-category', requireSignIn, isAdmin , categoryController)

router.put('/update-category/:id', requireSignIn , isAdmin , updateCategoryController)

router.get('/get-category' , getAllcategoryController);

//SIngleCategory

router.get('/single-category/:slug' ,  singleCategoryController);

router.delete('/delete-category/:id',requireSignIn , isAdmin, deleteCategory)

module.exports = router