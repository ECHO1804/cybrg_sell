import type { Request, Response } from 'express';
import orders from "../data/orders.json" assert { type: "json" };

export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
};

export const getOrderById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export const createOrder = (req: Request, res: Response) => {
  const newOrder = { id: Date.now(), ...req.body };
  orders.push(newOrder);
  res.json(newOrder);
};

export const updateOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  
  if (order) {
    Object.assign(order, req.body);
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export const deleteOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = orders.findIndex(o => o.id === id);
  
  if (index !== -1) {
    orders.splice(index, 1);
    res.json({ message: "Order deleted" });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};