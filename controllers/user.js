const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  // create array of products.  This array of products has count, unlike the product model, which does not.  Same with color, which we allowed the user to change in save to cart
  let products = [];

  // find the user
  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist.  It is possible the user added items to cart earlier and left.  No duplicates
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();  // mongoose remove method
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart", newCart);
  res.json({ ok: true });  // if we get the true response, user is taken from cart to checkout page
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};