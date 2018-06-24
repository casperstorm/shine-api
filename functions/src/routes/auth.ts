import { Router, Request, Response, NextFunction } from "express";
import * as functions from "firebase-functions";
import * as firebase from "firebase";
import * as jwt from "jsonwebtoken";
const router: Router = Router();

export default router;

router.post(
  "/create-api-token",
  async (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username || !password) {
      res.status(401).json({ error: "missing either username or password" });
    }

    try {
      await login(username, password);
      const token = await createToken(username);
      res.status(201).json({ api_token: token });
    } catch (err) {
      return next(err);
    }
  }
);

router.post("/verify-api-token", async (req: Request, res: Response) => {
  const token: string = req.body.token;
  if (!token) {
    res.status(401).json({ error: "missing token" });
  }

  try {
    await validateToken(token);
    res.status(201).json({ valid: true });
  } catch (err) {
    res.status(201).json({ valid: false });
  }
});

const login = async (username: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(username, password);
};

const createToken = async (username: string) => {
  const secret: string = functions.config().jwt.secret;
  return jwt.sign({ username }, secret);
};

const validateToken = async (token: string) => {
  const secret: string = functions.config().jwt.secret;
  return jwt.verify(token, secret);
};
