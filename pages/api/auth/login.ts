// pages/api/auth/login.js
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import axios from "axios";
import { signToken } from "../../../utilities/auth";
import { Ip_port } from "@/constants";

const handler = (nc as any)();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const AUTH_URL = `${Ip_port.Adresse}/api/v1/auth/`;

  try {
    const { data: user } = await axios.post(`${AUTH_URL}email/login`, {
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const token = signToken(user);
      res.send({
        ...user,
        token,
      });
    }
  } catch (error) {
    // Adjust based on the error format returned by your RESTful API
    res.status(401).send({ message: "Invalid_email_or_password" });
  }
});

export default handler;
