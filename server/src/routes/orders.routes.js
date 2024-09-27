import { Router } from "express";
import {
  createOrderCtrl,
  getOrdersCtrl,
} from "../controllers/order.controller.js";
import { applyValidations } from "../validations/apply.validations.js";
import { ordervalidatios } from "../validations/orders.validations.js";

const ordersRouter = Router();

// ! NO FUNCIONA LA RUTA /orders
ordersRouter.get("/orders", getOrdersCtrl);

// ! FALTAN VALIDACIONES DE DATOS
ordersRouter.post(
  "/orders",
  ordervalidatios,
  applyValidations,
  createOrderCtrl
);

export { ordersRouter };
