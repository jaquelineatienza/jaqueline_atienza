import { createOrder, getOrders } from "../models/order.model.js";
import { connectDB } from "../db/database.js";
// import {validarJw}

export const createOrderCtrl = async (req, res) => {
  const userId = req.user.id;
  const { coffee } = req.body;
  try {
    const connection = await connectDB();

    const order = await connection.query("INSERT INTO PEDIDOS(coffee,userId)", [
      coffee,
      userId,
    ]);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: "error", err });
  }
};

export const getOrdersCtrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const connection = await connectDB();
    const results = await connection.query(
      "SELECT * FROM pedidos WHERE userId =?",
      [userId]
    );

    if (results) {
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ msg: "error", error });
  }
};
