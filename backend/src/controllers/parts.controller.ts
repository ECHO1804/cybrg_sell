import parts from "../data/parts.json";

export const getAllParts = (req, res) => {
  res.json(parts);
};

export const getPartById = (req, res) => {
  const id = Number(req.params.id);
  const part = parts.find(p => p.id === id);
  
  if (part) {
    res.json(part);
  } else {
    res.status(404).json({ message: "Part not found" });
  }
};

export const createPart = (req, res) => {
  const newPart = { id: Date.now(), ...req.body };
  parts.push(newPart);
  res.json(newPart);
};

export const updatePart = (req, res) => {
  const id = Number(req.params.id);
  const part = parts.find(p => p.id === id);
  
  if (part) {
    Object.assign(part, req.body);
    res.json(part);
  } else {
    res.status(404).json({ message: "Part not found" });
  }
};

export const deletePart = (req, res) => {
  const id = Number(req.params.id);
  const index = parts.findIndex(p => p.id === id);
  
  if (index !== -1) {
    parts.splice(index, 1);
    res.json({ message: "Part deleted" });
  } else {
    res.status(404).json({ message: "Part not found" });
  }
};