const Product = require("../model/product");
const cloudinary = require("../config/cloudinary");

const getProducts = async(req , res) =>{
    try{
        const products =  await Product.find({});
        res.json(products);
    }
    catch(error){
        res.status(500).json({message:'Cannot get products'})
    }
}

const getProductById = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:"product not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"something wrong while get product by id"})
    }
};

const createProduct = async(req,res)=>{
    try{
        const {name,description,price,stock,category} = req.body;
        let imageUrl =" ";
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const product = new Product({
            name,
            description, 
            price,
            category,
            stock,
            imageUrl,
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    }
    catch(error){
        res.status(500).json({message:"createProduct failed due to some reason"});
    }
};

const updateProduct = async(req,res) =>{
    try{
        const {name,description,price,stock,category} = req.body;
        const product = await Product.findById(req.params.id);
        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await Product.save();
            res.json(updateProduct);
        }
        else{
            res.status(400).json({message:"Product not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Cannot update the product"});
    }
};

const deleteProduct = async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message:"Product remove"});
        }
        else{
            res.status(404).json({message:'Product not found to remove' })
        }
    }
    catch(error){
        res.status(500).json({message:'product cannot be  deleted due to reason'})
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
