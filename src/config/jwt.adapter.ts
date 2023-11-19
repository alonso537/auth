import * as jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JwtAdapter {
  static async generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SECRET,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(false);
          return resolve(token);
        }
      );
    });

    // const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: duration });
    // return token;
  }

  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded as T);
      });
    })
  }
}
