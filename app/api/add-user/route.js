import connectMongo from "@/app/utils/connectDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export async function POST(req, res) {
  try {
    const data = await req.json();
    const { name, userName, password } = data;

    await connectMongo();

    const regex = /^(?=[a-zA-Z0-9._]{2,40}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (!name || name.length < 2 || name.length > 40)
      return NextResponse.json({
        error: true,
        name: "Name should be in between 2 to 40 characters",
      });
    if (!userName || userName.length < 2 || userName.length > 40)
      return NextResponse.json({
        error: true,
        userName: "User Name should be in between 2 to 40 characters",
      });
    if (!regex.test(userName))
      return NextResponse.json({
        error: true,
        userName: "User Name should be in specified format (Click Info)",
      });
    if (!password || password.length < 8 || password.length > 60)
      return NextResponse.json({
        error: true,
        password: "Password should be in between 8 to 60 characters",
      });
    const existingUser = await User.findOne({ userName });

    if (!existingUser) {
      try {
        const hash = await argon2.hash(password);

        data.password = hash;
        const user = await User.create(data);

        const token = jwt.sign(
          {
            name: user.name,
            userName: user.userName,
          },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        return NextResponse.json({ success: true, token });
      } catch (err) {}
    } else {
      if (await argon2.verify(existingUser.password, password)) {
        const token = jwt.sign(
          {
            name: existingUser.name,
            userName: existingUser.userName,
          },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        return NextResponse.json({ success: true, token });
      } else {
        return NextResponse.json({
          error: true,
          password: "Incorrect Password",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
