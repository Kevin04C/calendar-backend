import { Router } from "express";
import { check } from "express-validator";
import { createUser, loginUser, renewToken } from "../controllers/auth.js";
import { fieldsValidate } from "../middlewares/fieldsValidate.js";
import { validateJWT } from "../middlewares/validateJWT.js";

/*
  Route /api/auth
*/  

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña debe tener 6 caracteres").isLength({min: 6}),
    fieldsValidate    
  ],
  createUser
);

router.post(
  "/",
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener 6 caracteres').isLength({min: 6}),
    fieldsValidate
  ],
  loginUser);

router.get("/renew", validateJWT, renewToken);

export default router;
