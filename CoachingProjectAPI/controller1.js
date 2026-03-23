import "./32_connection_express.js";
import Category from './model1.js';

import url from 'url';
import path from 'path';

export const savecategory = async (req, res) => {
  try {
    if (!req.files || !req.files.caticon) {
      return res.status(400).json({ "status": false, "message": "No file uploaded" });
    }

    const category = await Category.find();
    const _id = category.length == 0 ? 1 : category[category.length - 1]._id + 1;

    const caticon = req.files.caticon;
    const caticonnm = caticon.name;

    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const uploadfilepath = path.join(__dirname, '../projectcopy/public/assets/uploads/caticons', caticonnm);
    
    const categoryDetails = { ...req.body, "caticonnm": caticonnm, "_id": _id };

    await Category.create(categoryDetails);
    await caticon.mv(uploadfilepath);
    
    res.status(201).json({"status": true });
  } catch (error) {
    console.error("Save category error:", error);
    res.status(500).json({ "status": false, "message": error.message });
  }
};

export const fetchcategory = async (req, res) => {
  try {
    const categoryList = await Category.find();
    res.status(200).json({ "status": true, "userDetails": categoryList }); // ✅ fixed
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "server error" });
  }
};

export const updatecategory = async (req, res) => {
  try {
    const condition_obj = JSON.parse(req.body.condition_obj);
    const categoryDetails = await Category.findOne(condition_obj);

    if (categoryDetails) {
      const updateResult = await Category.updateMany(condition_obj, { $set: JSON.parse(req.body.content_obj) });
      if (updateResult) {
        res.status(200).json({status: "ok" });
      } else {
        res.status(400).json({ status: "no changes made" });
      }
    } else {
      res.status(404).json({ status: "product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "server issue" });
  }
};

export const deletecategory = async (req, res) => {
  try {
    const condition_obj = JSON.parse(req.body.condition_obj);
    const categoryDetails = await Category.findOne(condition_obj);
  
    if (categoryDetails) {
      await Category.deleteOne(condition_obj);
      res.status(200).json({ status: "ok" });
    } else {
      res.status(404).json({ status: "product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "server issue" });
  }
};