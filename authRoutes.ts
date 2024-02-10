import { Request, Response, NextFunction } from 'express';
import { verifySignUp } from '../middlewares';
import { signup, signin } from '../controllers/authController';

export default function(app: any) {
  app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    signup
  );

  app.post('/api/auth/signin', signin);
}
