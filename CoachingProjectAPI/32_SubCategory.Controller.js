import "./32_connection_express.js";
import url from 'url';
import path from 'path';
import rs from 'randomstring';
import SubCategorySchemaModel from "./32_SubCategory.Model.js";
import Category from "./model1.js";

// Save subcategory
export const save = async (req, res) => {
  try {
    const scategory = await SubCategorySchemaModel.find();
    const l = scategory.length;
    const _id = l === 0 ? 1 : scategory[l - 1]._id + 1;

    const caticon = req.files.caticon;
    const caticonnm = rs.generate(10) + "_" + Date.now() + "_" + caticon.name;

    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const uploadfilepath = path.join(
      __dirname,
      '../projectcopy/public/assets/uploads/subcaticons',
      caticonnm
    );

    const scDetails = { ...req.body, subcaticonnm: caticonnm, _id };

    await SubCategorySchemaModel.create(scDetails);
    await caticon.mv(uploadfilepath);

    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Save subcategory error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Fetch subcategories — returns [] instead of 404 when empty
export const fetch = async (req, res) => {
  try {
    const condition_obj = req.query;
    const scList = await SubCategorySchemaModel.find(condition_obj);

    // always return 200 with empty array instead of 404
    res.status(200).json({
      status: true,
      userDetails: scList
    });
  } catch (error) {
    console.error("Fetch subcategory error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Delete subcategory
export const deleteUser = async (req, res) => {
  try {
    const condition_obj = JSON.parse(req.body.condition_obj);
    const cDetails = await Category.findOne(condition_obj);

    if (!cDetails) {
      return res.status(404).json({ status: "Requested resource not available" });
    }

    const result = await Category.deleteOne(condition_obj);

    if (result.deletedCount > 0) {
      res.status(200).json({ status: true });
    } else {
      res.status(500).json({ status: false });
    }
  } catch (error) {
    console.error("Delete subcategory error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Update subcategory
export const update = async (req, res) => {
  try {
    const condition_obj = JSON.parse(req.body.condition_obj);
    const cDetails = await Category.findOne(condition_obj);

    if (!cDetails) {
      return res.status(404).json({ status: "Requested resource not available" });
    }

    const result = await Category.updateMany(
      condition_obj,
      { $set: JSON.parse(req.body.content_obj) }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ status: true });
    } else {
      res.status(500).json({ status: false });
    }
  } catch (error) {
    console.error("Update subcategory error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};