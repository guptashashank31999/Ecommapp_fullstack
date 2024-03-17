const fs = require("fs");
const slugify = require("slugify")
const productModal = require("../modals/productModal");

const createProductController = async(req, res) => {
    try {
        const {name , description , price, category , quantity , shipping , photoAlt} = req.body
      
        if(!name || !description || !price || !category || !quantity || !shipping || !photoAlt){
            return res.status(404).send({
                success: false,
                message: "All fileds are mendetory"
            })
        }

        const products = new productModal({...req.body , slug : slugify(name)});

        // if(photo){
        //     products.photo.data = fs.readFileSync(photo.path);
        //     products.photo.contentType = photo.type
        // }

        await products.save();

        res.status(200).send({
            success:true,
            products,
            message: "Product created successfully"
        })

    } catch (error) {
        console.log("Error createProductController", error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in create product'
        })
    }
}

const getProductController = async (req ,res) => {
    try {
        const products = await productModal.find({}).populate('category').select("-photoAlt").limit(12).sort({createdAt: -1});
        res.status(200).send({
            success : true,
            message:"All product",
            totalCount : products.lenght,
            products,
        })

    } catch (error) {
        console.log("Error getProductController", error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in get product'
        })
    }
}
const getSingleProductController = async (req ,res) => {
    try {
        
        const products = await productModal.findOne({slug : req.params.slug}).select("-photoAlt").populate('category');
        res.status(200).send({
            success : true,
            message:"Single product",
            products,
        })

    } catch (error) {
        console.log("Error getSingleProductController", error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in get single product'
        })
    }
}
const deleteProductController = async (req ,res) => {
    try {
        
         await productModal.findByIdAndDelete(req.params.pid).select("-photoAlt");
        res.status(200).send({
            success : true,
            message:"Product deleted successfully",
        })

    } catch (error) {
        console.log("Error deleteProductController", error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in delete product'
        })
    }
}


const updateProductController = async(req, res) => {
    try {
        const {name , description , price, category , quantity , shipping , photoAlt} = req.body
      
        console.log("req.body",req.body)
        console.log("req.params.pid", req.params.pid)
        if(name ==  "" || description == "" || price == "" || category == "" ||  quantity == ""  || photoAlt == ""){
            return res.status(404).send({
                success: false,
                message: "All fileds are mendetory"
            })
        }

        const products = await productModal.findByIdAndUpdate(req.params.pid, 
            {...req.body , slug: slugify(name)} , {new : true});
        await products.save();

        res.status(200).send({
            success:true,
            products,
            message: "Product updated successfully"
        })

    } catch (error) {
        console.log("Error updateProductController", error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in update product'
        })
    }
}

const productFilterController = async(req, res) => {
        try {
            const {checked , radio} = req.body;
            let args = {}

            if(checked.lenght > 0) args.category = checked
            if(radio.lenght) args.price = {$gte : radio[0] , $lte : radio[1]}

            const prdoucts = await productModal.find(args);
            res.status(200).send({
                success: false,
                prdoucts,
            })
        } catch (error) {
            console.log("Error productFilterController", error);
            res.status(500).send({
                success: false,
                error,
                message:'Error in filtering product'
            })
        }
}

const productCountController = async(req, res) => {

    try {
        const total = await productModal.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
       
    } catch (error) {
        console.log("Error productFilterController", error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in product count'
        })
    }
}
const productListController = async(req, res) => {

    try {
        const perPage = 6;

        const page = req.params.page ? req.params.page : 1; 
        
        const products = await productModal.find({}).skio((page-1) * perPage).limit(perPage).sort({createdAt : -1});
        res.status(200).send({
            success: true,
            total
        })

        res.status(200).send({
            success : true,
            products
        })
       
    } catch (error) {
        console.log("Error productFilterController", error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in per pagecount'
        })
    }
}
module.exports = {createProductController , getProductController , getSingleProductController , deleteProductController , updateProductController , productFilterController , productCountController , productListController}