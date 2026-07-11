import userModel from "../models/userModel.js";
// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);
    const wishlist = userData.wishlist;

    if (wishlist.includes(itemId)) {
      return res.json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    wishlist.push(itemId);

    await userModel.findByIdAndUpdate(userId, { wishlist });

    res.json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);

    const wishlist = userData.wishlist.filter((id) => id !== itemId);

    await userModel.findByIdAndUpdate(userId, { wishlist });

    res.json({
      success: true,
      message: "Removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const userData = await userModel.findById(userId);

    res.json({
      success: true,
      wishlist: userData.wishlist,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToWishlist, removeFromWishlist, getWishlist };
