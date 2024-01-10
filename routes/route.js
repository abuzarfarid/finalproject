const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const customerController = require("../controller/customerController");
const mail = require("../helper/mail");
const upload = require("../helper/storage");
const checkAuth = require("../middleware/checkAuth");
const cartController = require("../controller/cartController");
const orderController = require("../controller/orderController");

// Home route
router.get("/", (req, res) => {
    res.send("Server is up and running...");
});

// Admin routes
router.post("/admin/register", adminController.register);
router.post("/admin/login", adminController.login);
router.post("/admin/delete", checkAuth, adminController.delete);
router.get("/admin", checkAuth, adminController.get);

// User routes
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.post("/user/update", checkAuth, userController.update);
router.post("/user/update/address", checkAuth, userController.updateAddress);
router.post("/user/delete", checkAuth, userController.delete);
router.get("/user", checkAuth, userController.get);
router.get("/user/list", checkAuth, userController.getAll);

// Product routes
router.post("/product/add", checkAuth, upload.single("image"), productController.add);
router.post("/product/update", checkAuth, upload.single("image"), productController.update);
router.post("/product/delete", checkAuth, productController.delete);
router.get("/product", productController.get);

// Customer routes
router.post("/customer/add", customerController.add);
router.get("/customer", customerController.get);

// Mail routes
router.post("/mail/send", mail.send);

// Cart routes
router.post("/cart/add", checkAuth, cartController.add);
router.post("/cart/update", checkAuth, cartController.update);
router.post("/cart/delete", checkAuth, cartController.delete);
router.get("/cart", checkAuth, cartController.get);
router.get("/cart/list", checkAuth, cartController.getAll);

// Order routes
router.post("/order/create", checkAuth, orderController.create);
router.post("/order/cancel", checkAuth, orderController.cancel);
router.get("/order", checkAuth, orderController.get);

// Check authentication
router.post("/auth", checkAuth, (req, res) => {
    res.send({
        message: "Authentication successful!",
    });
});

module.exports = router;
