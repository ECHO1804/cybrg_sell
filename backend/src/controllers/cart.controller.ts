import cart from "../data/cart.json";

export const getCart = (req, res) => {
  res.json(cart);
};

export const addToCart = (req, res) => {
  const { id, name, price, quantity } = req.body;
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, name, price, quantity });
  }
  
  res.json(cart);
};

export const deleteFromCart = (req, res) => {
  const id = Number(req.params.id);
  const index = cart.findIndex(item => item.id === id);
  
  if (index !== -1) {
    cart.splice(index, 1);
    res.json({ message: "Item deleted", cart });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

export const updateCart = (req, res) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;
  const item = cart.find(item => item.id === id);
  
  if (item) {
    item.quantity = quantity;
    res.json(cart);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};