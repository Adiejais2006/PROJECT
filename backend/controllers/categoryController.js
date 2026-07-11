  import categoryModel from "../models/categoryModel.js";
  const addCategory = async (req, res) => {
    try {
      const { name, subCategories } = req.body;
      if (!name?.trim()) {
        return res.json({
          success: false,
          message: "Category name is required",
        });
      }
      const existingCategory = await categoryModel.findOne({
        name: name.trim(),
      });
      if (existingCategory) {
        return res.json({
          success: false,
          message: "Category already exists",
        });
      }
      const category = new categoryModel({
        name: name.trim(),
        subCategories,
      });
      await category.save();
      return res.json({
        success: true,
        message: "Category added successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
  const listCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      return res.json({
        success: true,
        categories,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
  const removeCategory = async (req, res) => {
    try {
      const { id } = req.body;
      await categoryModel.findByIdAndDelete(id);
      return res.json({
        success: true,
        message: "Category removed successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };

  const updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, subCategories } = req.body;
      const category = await categoryModel.findById(id);
      if (!category) {
        return res.json({
          success: false,
          message: "Category not found",
        });
      }
      const existingCategory = await categoryModel.findOne({
        name: name.trim(),
      });
      if (existingCategory && existingCategory._id.toString() !== id) {
        return res.json({
          success: false,
          message: "Category already exists",
        });
      }
      category.name = name.trim();
      category.subCategories = subCategories;
      await category.save();
      return res.json({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
  export { addCategory, listCategories, removeCategory, updateCategory };
