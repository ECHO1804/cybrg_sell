import orders from "../data/orders.json";

export const getOrders = (req, res) => {
  res.json(orders);
};

export const getOrderById = (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export const createOrder = (req, res) => {
  const newOrder = { id: Date.now(), ...req.body };
  orders.push(newOrder);
  res.json(newOrder);
};

export const updateOrder = (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  
  if (order) {
    Object.assign(order, req.body);
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export const deleteOrder = (req, res) => {
  const id = Number(req.params.id);
  const index = orders.findIndex(o => o.id === id);
  
  if (index !== -1) {
    orders.splice(index, 1);
    res.json({ message: "Order deleted" });
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};