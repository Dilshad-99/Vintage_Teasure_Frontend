// import ProductModel from './32_Add_Product.Model.js';
// import url from 'url';
// import path from 'path';
// import rs from 'randomstring';

// import { createRequire } from 'module';
// import { fileURLToPath } from 'url';
// import path from 'path';

// // Helper: unique product ID
// async function generateProductId() {
//     const products = await ProductModel.find();
//     const l = products.length;
//     return l == 0 ? 1 : products[l - 1]._id + 1;
// }

// // Helper: average rating
// function calculateAverageRating(reviews) {
//     if (!reviews || reviews.length == 0) return 0;
//     const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
//     return total / reviews.length;
// }

// export const SaveProduct = async (req, res) => {
//     try {
//         const _id = await generateProductId();

//         const uploadedImage = req.files.producticon;
//         const producticonnm = `${rs.generate(10)}_${Date.now()}_${uploadedImage.name}`;


//         const __filename = fileURLToPath(import.meta.url);
//         const __dirname  = path.dirname(__filename);


//         const currentDir = url.fileURLToPath(new URL('.', import.meta.url));
//         // const uploadPath = path.join(
//         //     currentDir,
//         //     '../../ProjectCopy/projectcopy/public/assets/uploads/producticons',
//         //     producticonnm
//         // );

//         // Upload path — Render pe /tmp use karo
//         const uploadPath = path.join(__dirname, 'uploads', producticonnm);

//         const parsedReviews = req.body.reviews ? [JSON.parse(req.body.reviews)] : [];

//         const productDetails = {
//             ...req.body,
//             _id,
//             producticonnm,
//             addedby: req.body.addedby || null,
//             role: req.body.role || 'user',
//             reviews: parsedReviews,
//         };

//         await ProductModel.create(productDetails);
//         await uploadedImage.mv(uploadPath);

//         res.status(201).json({ status: true });

//     } catch (err) {
//         console.error('SaveProduct failed:', err.message);
//         res.status(500).json({ status: false });
//     }
// };

// export const FetchProduct = async (req, res) => {
//     try {
//         const { _id, subcatnm, addedby, role } = req.query;
//         const condition_obj = {};

//         if (_id) {
//             const parsedId = parseInt(_id, 10);
//             if (isNaN(parsedId))
//                 return res.status(400).json({ status: false });
//             condition_obj._id = parsedId;
//         }

//         if (subcatnm) condition_obj.subcatnm = subcatnm;

//         if (role !== 'admin' && addedby) condition_obj.addedby = addedby;

//         const products = await ProductModel.find(condition_obj);
//         if (products.length > 0)
//             res.status(200).json({ status: true, userDetails: products });
//         else
//             res.status(404).json({ status: false });

//     } catch (err) {
//         res.status(500).json({ status: false });
//     }
// };

// export const DeleteProduct = async (req, res) => {
//     try {
//         const condition_obj = req.body.condition_obj;
//         const productDetails = await ProductModel.findOne(condition_obj);

//         if (productDetails) {
//             const result = await ProductModel.deleteOne(condition_obj);
//             if (result.deletedCount > 0)
//                 res.status(200).json({ status: true });
//             else
//                 res.status(500).json({ status: false });
//         } else
//             res.status(404).json({ status: false });

//     } catch (err) {
//         res.status(500).json({ status: false });
//     }
// };

// export const UpdateProduct = async (req, res) => {
//     try {
//         const { condition_obj, reviews: newReview, ...otherFields } = req.body;
//         const productDetails = await ProductModel.findOne(condition_obj);

//         if (!productDetails)
//             return res.status(404).json({ status: false });

//         if (newReview) {
//             await ProductModel.updateOne(condition_obj, { $push: { reviews: newReview } });
//             const updated = await ProductModel.findOne(condition_obj);
//             const avgRating = calculateAverageRating(updated.reviews);
//             await ProductModel.updateOne(condition_obj, { $set: { ratings: avgRating } });
//         }

//         if (Object.keys(otherFields).length > 0) {
//             const result = await ProductModel.updateOne(condition_obj, { $set: otherFields });
//             if (result.modifiedCount == 0)
//                 return res.status(400).json({ status: false });
//         }

//         res.status(200).json({ status: true });

//     } catch (err) {
//         res.status(500).json({ status: false });
//     }
// };


import ProductModel from './32_Add_Product.Model.js';
import path from 'path';
import { fileURLToPath } from 'url';
import rs from 'randomstring';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

async function generateProductId() {
  const products = await ProductModel.find();
  const l = products.length;
  return l == 0 ? 1 : products[l - 1]._id + 1;
}

function calculateAverageRating(reviews) {
  if (!reviews || reviews.length == 0) return 0;
  const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
  return total / reviews.length;
}

export const SaveProduct = async (req, res) => {
  try {
    const _id = await generateProductId();

    const uploadedImage = req.files.producticon;
    const producticonnm = `${rs.generate(10)}_${Date.now()}_${uploadedImage.name}`;

    const uploadPath = path.join(__dirname, 'uploads', producticonnm);

    const parsedReviews = req.body.reviews ? [JSON.parse(req.body.reviews)] : [];

    const productDetails = {
      ...req.body,
      _id,
      producticonnm,
      addedby: req.body.addedby || null,
      role:    req.body.role    || 'user',
      reviews: parsedReviews,
    };

    await ProductModel.create(productDetails);
    await uploadedImage.mv(uploadPath);

    res.status(201).json({ status: true });

  } catch (err) {
    console.error('SaveProduct failed:', err.message);
    res.status(500).json({ status: false });
  }
};

export const FetchProduct = async (req, res) => {
  try {
    const { _id, subcatnm, addedby, role } = req.query;
    const condition_obj = {};

    if (_id) {
      const parsedId = parseInt(_id, 10);
      if (isNaN(parsedId)) return res.status(400).json({ status: false });
      condition_obj._id = parsedId;
    }

    if (subcatnm) condition_obj.subcatnm = subcatnm;
    if (role !== 'admin' && addedby) condition_obj.addedby = addedby;

    const products = await ProductModel.find(condition_obj);
    if (products.length > 0)
      res.status(200).json({ status: true, userDetails: products });
    else
      res.status(404).json({ status: false });

  } catch (err) {
    res.status(500).json({ status: false });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const condition_obj = req.body.condition_obj;
    const productDetails = await ProductModel.findOne(condition_obj);

    if (productDetails) {
      const result = await ProductModel.deleteOne(condition_obj);
      if (result.deletedCount > 0)
        res.status(200).json({ status: true });
      else
        res.status(500).json({ status: false });
    } else {
      res.status(404).json({ status: false });
    }
  } catch (err) {
    res.status(500).json({ status: false });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { condition_obj, reviews: newReview, ...otherFields } = req.body;
    const productDetails = await ProductModel.findOne(condition_obj);

    if (!productDetails) return res.status(404).json({ status: false });

    if (newReview) {
      await ProductModel.updateOne(condition_obj, { $push: { reviews: newReview } });
      const updated    = await ProductModel.findOne(condition_obj);
      const avgRating  = calculateAverageRating(updated.reviews);
      await ProductModel.updateOne(condition_obj, { $set: { ratings: avgRating } });
    }

    if (Object.keys(otherFields).length > 0) {
      const result = await ProductModel.updateOne(condition_obj, { $set: otherFields });
      if (result.modifiedCount == 0)
        return res.status(400).json({ status: false });
    }

    res.status(200).json({ status: true });

  } catch (err) {
    res.status(500).json({ status: false });
  }
};