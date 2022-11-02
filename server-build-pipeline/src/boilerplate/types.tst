import { Redis } from "ioredis";
import { Request as ExpressRequest, Response } from "express";
import { Session, SessionData } from "express-session";
import { ObjectId } from "mongoose";

export interface Request extends ExpressRequest {
  session: Session & Partial<{
    email: string,
    userId: ObjectId,
    data?: {
      token: string,
    }
  }>
}

export interface Context {
  req: Request,
  redis: Redis
  res: Response,
}