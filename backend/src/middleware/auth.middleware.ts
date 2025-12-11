
import type { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export function mockAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers["x-user-id"];

  // Assign a fake user if header present
  if (userId && typeof userId === "string") {
    req.user = { id: userId };
  }

  // If not provided, still continue (public routes allowed)
  next();
}
