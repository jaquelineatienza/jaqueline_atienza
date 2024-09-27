import { body } from "express-validator";

export const signUpValidation = [
  body("username")
    .isString()
    .withMessage("El nombre debe ser un String")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("email")
    .isEmpty()
    .withMessage("El correo electronico es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un correo electronico valido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Debe ingresar un correo electronico valido"),
  ,
];

export const signInValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];
