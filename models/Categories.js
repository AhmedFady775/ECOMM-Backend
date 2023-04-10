const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brands: [
            {
                name: {
                    type: String,
                    required: true,
                },
                logo: {
                    type: String,
                }
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
