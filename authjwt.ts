import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import db from '../models';

export const User = db.user;


const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
     res.status(403).send({
      message: 'No token provided!'
    });
  }

  jwt.verify(token, config.auth.secret, (err: Error | null, decoded: JwtPayload | undefined): void => {
    if (err) {
       res.status(401).send({
        message: 'Unauthorized!'
      });
    }

    if (!decoded || typeof decoded.id !== 'number') {
       res.status(401).send({
        message: 'Invalid token payload!'
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    if (roles.some((role: { name: string }) => role.name === 'admin')) {
      next();
    } else {
      res.status(403).send({
        message: 'Require Admin Role!'
      });
    }
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
};

const isModerator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    if (roles.some((role: { name: string }) => role.name === 'moderator')) {
      next();
    } else {
      res.status(403).send({
        message: 'Require Moderator Role!'
      });
    }
  } catch (error) {
    console.error('Error in isModerator middleware:', error);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
};

const isModeratorOrAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    if (roles.some((role: { name: string }) => role.name === 'moderator' || role.name === 'admin')) {
      next();
    } else {
      res.status(403).send({
        message: 'Require Moderator or Admin Role!'
      });
    }
  } catch (error) {
    console.error('Error in isModeratorOrAdmin middleware:', error);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
};



export {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
 
};


