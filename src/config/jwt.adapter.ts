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

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, envs.JWT_SECRET);
      return decoded;
    } catch (error) {
      return false;
    }
  }
}
