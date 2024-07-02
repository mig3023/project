import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import sequelize from "../../lib/sequelize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      await sequelize.sync();

      const userExists = await User.findOne({ where: { username } });

      if (userExists) {
        return res.status(422).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User created" });
    } catch (error) {
      console.error("Error during user creation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
