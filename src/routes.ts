import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Create User
router.post("/users", new CreateUserController().handle);
//Login User
router.post("/session", new AuthUserController().handle);
//User
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Create Category
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
// List Category
router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Create Product
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
// List Product
router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

// Create Order
router.post("/order", isAuthenticated, new CreateOrderController().handle);

// Delete Order
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

// Add Item to Order
router.post("/order/add", isAuthenticated, new AddItemController().handle);

// Remove item from Order
router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle
);

// Send Order
router.put("/order/send", isAuthenticated, new SendOrderController().handle);

// List Order
router.get("/orders", isAuthenticated, new ListOrderController().handle);

// Details Order
router.get(
  "/order/details",
  isAuthenticated,
  new DetailOrderController().handle
);

// FInish Order
router.put(
  "/order/fInish",
  isAuthenticated,
  new FinishOrderController().handle
);

export { router };
