import { body } from "express-validator";

export const signUpValidation = [
  body("username")
    .isString()
    .withMessage("El nombre debe ser un String")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Debe ingresar un correo electronico valido"),
  ,
];

export const signInValidation = [
  body("username").isString(),
  body("password").isLength({ min: 6 }),
];
