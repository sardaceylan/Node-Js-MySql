const Product = require("../models/product");
const Category = require("../models/category");

exports.getIndex = (req, res, next) => {
  Product.findAll({
    attributes: ["id", "name", "price", "imageUrl"],
  })
    .then((products) => {
      Category.findAll()
        .then((categories) => {
          res.render("shop/index", {
            title: "Shopping",
            products: products,
            categories: categories,
            path: "/",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      Category.findAll()
        .then((categories) => {
          res.render("shop/products", {
            title: "Products",
            products: products,
            categories: categories,
            path: "/",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategoryId = (req, res, next) => {
  const categoryid = req.params.categoryid;
  const products = Product.getProductsByCategoryId(categoryid);
  const categories = Category.getAll();

  res.render("shop/products", {
    title: "Products",
    products: products,
    categories: categories,
    selectedCategory: categoryid,
    path: "/products",
  });
};

exports.getProduct = (req, res, next) => {
  Product.findAll({
    attributes: ["id", "name", "price", "imageUrl", "description"],
    where: { id: req.params.productid },
  })
    .then((products) => {
      res.render("shop/product-detail", {
        title: products[0].name,
        product: products[0],
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    title: "Cart",
    path: "/cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
  });
};
