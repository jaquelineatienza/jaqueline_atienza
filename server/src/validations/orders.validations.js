import { body } from "express-validator";

// ? CREAR LAS VALIDACIONES PARA LAS ORDERS AQUÍ
export const ordervalidatios = [
  body("coffe")
    .isString()
    .withMessage("El nombre debe ser un String")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
];
