import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        Products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
