const categoryModal = require("../modals/categoryModal");
const slugify =  require("slugify")
const categoryController = async (req, res) => {
        try {
            const {name} = req.body;
            if(!name){
                return res.status(401).send({
                    success : false,
                    message : 'Name is require'
                })
            }

            const exist = await categoryModal.findOne({name});

            if(exist){
                return res.status(200).send({
                    success: false,
                    message : 'Category already exist'
                })
            }

            const category = await new categoryModal({
                name,
                slug:slugify(name)
            }).save();

            res.status(201).send({
                success : true,
                message : "Category add successfully",
                category
            })
        } catch (error) {
            console.log('Error category controller');

            res.status(500).send({
                success: false,
                error,
                message : 'Error in category'
            })
        }

}

const updateCategoryController = async (req, res) => {
            try {
                const {name} =  req.body;
                const {id} = req.params
                const category = await categoryModal.findByIdAndUpdate(id , {name ,  slug : slugify(name)} , {new : true})
                res.status(200).send({
                    success : true,
                    message: "Category updated successfully",
                    category
                })

            } catch (error) {
                console.log("Error update category controller", error)
                res.status(500).send({
                    success :false , 
                    error,
                    message : 'Error while updating the category'
                })
            }
}


const getAllcategoryController = async (req, res) => {
        try {

            const allCategory = await categoryModal.find({});

            res.status(200).send({
                success : true,
                message : 'All category',
                allCategory
            })
            
        } catch (error) {
            console.log("Error getAllcategoryController")
            res.status(500).send({
                success :false , 
                error,
                message : 'Error while getting category'
            })
        }
}


const singleCategoryController = async(req, res) =>{
            try {
                   
                    const category = await categoryModal.findOne({slug : req.params.slug});

                    res.status(200).send({
                        success : true,
                        message : "Get single category",
                        category
                    })

            } catch (error) {
                console.log("Error singleCategoryController")
                res.status(500).send({
                    success :false , 
                    error,
                    message : 'Error while getting category'
                })
            }
}

const deleteCategory = async (req, res) => {
            try {
                const {id} = req.params
                await categoryModal.findByIdAndDelete(id);
                res.status(200).send({
                    success : true, message : 'Category delete successfully'
                })

            } catch (error) {
                console.log("Error deleteCategory")
                res.status(500).send({
                    success :false , 
                    error,
                    message : 'Error while deleteing category'
                })
            }
}
module.exports = {categoryController , updateCategoryController , getAllcategoryController , singleCategoryController , deleteCategory}