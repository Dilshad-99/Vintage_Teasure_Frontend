import ProductModel from './32_Add_Product.Model.js';
import url from 'url';
import path from 'path';
import rs from 'randomstring';


// ───────────────────────────────────────────────────────
//  Helper: generate a unique ID for new products
//  (we just look at the last product and add 1)
// ───────────────────────────────────────────────────────
async function generateProductId() {
    const allProducts = await ProductModel.find();
    if (allProducts.length === 0) return 1;
    return allProducts[allProducts.length - 1]._id + 1;
}


// ───────────────────────────────────────────────────────
//  Helper: calculate average rating from reviews array
// ───────────────────────────────────────────────────────
function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviews.length;
}

// ───────────────────────────────────────────────────────
//  POST /save  →  Add a new product
// ───────────────────────────────────────────────────────
export const SaveProduct = async (req, res) => {
    try {
        const newProductId = await generateProductId();

        const uploadedImage   = req.files.producticon;
        const uniqueImageName = `${rs.generate(10)}_${Date.now()}_${uploadedImage.name}`;

        const currentDir   = url.fileURLToPath(new URL('.', import.meta.url));
        const uploadFolder = path.join(
            currentDir,
            '../../ProjectCopy/projectcopy/public/assets/uploads/producticons',
            uniqueImageName
        );

        // ✅ reviews parse karo
        const parsedReviews = req.body.reviews
            ? [JSON.parse(req.body.reviews)]
            : [];

        const newProduct = {
            ...req.body,
            _id:           newProductId,
            producticonnm: uniqueImageName,
            addedby:       req.body.addedby || null,
            role:          req.body.role    || 'user',
            reviews:       parsedReviews, // ✅ array format
        };

        await ProductModel.create(newProduct);
        await uploadedImage.mv(uploadFolder);

        res.status(201).json({ status: true, message: 'Product saved successfully!' });

    } catch (err) {
        console.error('SaveProduct failed:', err.message);
        res.status(500).json({ status: false, message: err.message });
    }
};
// ───────────────────────────────────────────────────────
//  GET /fetch  →  Get products (with optional filters)
// ───────────────────────────────────────────────────────
export const FetchProduct = async (req, res) => {
    try {
        const { _id, subcatnm, addedby, role } = req.query;

        // Start with an empty filter — we'll add conditions as needed
        const filter = {};

        // If a specific product ID is requested (e.g. ProductDetail page)
        // parseInt is safer than Number() — Number("") gives 0, parseInt("abc") gives NaN
        if (_id) {
            const parsedId = parseInt(_id, 10);

            // Reject early if the ID isn't a valid number — prevents MongoDB crash
            if (isNaN(parsedId)) {
                return res.status(400).json({ status: false, message: 'Invalid product ID.' });
            }

            filter._id = parsedId;
        }

        // Filter by subcategory if provided
        if (subcatnm) {
            filter.subcatnm = subcatnm;
        }

        // Admins can see everything — normal users only see their own products
        const isAdmin = role === 'admin';
        if (!isAdmin && addedby) {
            filter.addedby = addedby;
        }

        console.log('Fetching products with filter:', filter);

        const products = await ProductModel.find(filter);
        res.status(200).json({ status: true, userDetails: products });

    } catch (err) {
        console.error('FetchProduct failed:', err.message);
        res.status(500).json({ status: false, message: err.message });
    }
};

// ───────────────────────────────────────────────────────
//  DELETE /delete  →  Remove a product
// ───────────────────────────────────────────────────────
export const DeleteProduct = async (req, res) => {
    try {
        const filter = req.body.condition_obj;

        // Make sure the product actually exists before trying to delete
        const existingProduct = await ProductModel.findOne(filter);
        if (!existingProduct) {
            return res.status(404).json({ status: false, message: 'Product not found.' });
        }

        const result = await ProductModel.deleteOne(filter);

        if (result.deletedCount > 0) {
            res.status(200).json({ status: true, message: 'Product deleted successfully.' });
        } else {
            res.status(400).json({ status: false, message: 'Could not delete the product. Try again.' });
        }

    } catch (err) {
        console.error('DeleteProduct failed:', err.message);
        res.status(500).json({ status: false, message: err.message });
    }
};


// ───────────────────────────────────────────────────────
//  PATCH /update  →  Update product info or add a review
// ───────────────────────────────────────────────────────
export const UpdateProduct = async (req, res) => {
    try {
        // Pull out reviews & condition_obj separately from the rest of the body
        // so we don't accidentally overwrite them in the final $set
        const { condition_obj: filter, reviews: newReview, ...otherFields } = req.body;

        // First check that the product exists
        const existingProduct = await ProductModel.findOne(filter);
        if (!existingProduct) {
            return res.status(404).json({ status: false, message: 'Product not found.' });
        }

        // ── Handle review submission ──────────────────────────────
        if (newReview) {
            // Add the new review to the reviews array
            await ProductModel.updateOne(filter, {
                $push: { reviews: newReview },
            });

            // Re-fetch so we have the updated reviews list
            const productWithNewReview = await ProductModel.findOne(filter);

            // Recalculate and save the new average rating
            const avgRating = calculateAverageRating(productWithNewReview.reviews);
            await ProductModel.updateOne(filter, {
                $set: { ratings: avgRating },
            });
        }

        // ── Handle general field updates (title, price, etc.) ─────
        if (Object.keys(otherFields).length > 0) {
            const updateResult = await ProductModel.updateOne(filter, {
                $set: otherFields,
            });

            if (updateResult.modifiedCount === 0) {
                return res.status(400).json({ status: false, message: 'Nothing was updated. Values may be the same.' });
            }
        }

        res.status(200).json({ status: true, message: 'Product updated successfully.' });

    } catch (err) {
        console.error('UpdateProduct failed:', err.message);
        res.status(500).json({ status: false, message: err.message });
    }
};