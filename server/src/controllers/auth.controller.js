import { createJwt } from "../helpers/createJwt.js";
import { createUser, getUserByCredentials } from "../models/user.model.js";
import { validationResult } from "express-validator";

export const signInCtrl = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Establecer conexión con la base de datos
    const connection = await connectDB();

    // Realizar consulta para verificar el usuario
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [password, email]
    );

    // Verificar si se encontró el usuario
    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = rows[0];

    // Generar token JWT
    const token = await createJwt(user.id);

    // Almacenar el token en la sesión del servidor
    req.session.token = token;

    // Almacenar el token en una cookie segura
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000, // 1 hora
    });

    return res.json({
      message: "Inicio de sesión exitoso",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ message: "Error inesperado" });
  }
};
//registro
export const signUpCtrl = async (req, res) => {
  const { username, contraseña } = req.body;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json(errores);
    }

    // Establecer conexión con la base de datos
    const connection = await connectDB();

    // Verificar si el nombre de usuario ya existe
    const [existUser] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    // Encriptar la contraseña
    const password = bcrypt.hashSync(contraseña, 10);

    if (existUser.length > 0) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    // Insertar el nuevo usuario en la base de datos
    const [result] = await connection.execute(
      "INSERT INTO users (username,email password) VALUES (?, ?)",
      [username, password, email]
    );

    if (result.affectedRows === 1) {
      return res.status(201).json({ message: "Usuario creado exitosamente" });
    } else {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ message: "Error inesperado" });
  }
};

//controlador para cerrar sesion
export const signOutCtrl = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: "error al cerrar la sesion" });
      }
    });
    res.clearCookie("authToken");
    res.status(200).json({ message: "cierre de sesion exitoso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeCtrl = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
