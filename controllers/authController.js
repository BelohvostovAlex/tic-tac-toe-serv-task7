import { validationResult } from "express-validator";
import { v4 } from "uuid";

import User from "../models/User.js";
import { serverClient } from "../stream/index.js";

class AuthController {
  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Login error, username can't be empty..",
          errors,
        });
      }

      const { username } = req.body;
      const candidate = await User.findOne({ username });

      if (!candidate) {
        const userId = v4();

        const user = new User({
          username,
          userId,
        });

        await user.save();

        const token = serverClient.createToken(userId);

        return res.json({ ...user, token });
      } else {
        await User.updateOne(
          { username: candidate.username },
          {
            $set: {
              dateOfLastEnter: Date.now(),
            },
          }
        );
        const token = serverClient.createToken(candidate.userId);

        return res.json({ ...candidate, token });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Whoops..login error" });
    }
  }
}

export default new AuthController();
