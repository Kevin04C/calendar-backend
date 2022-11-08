import jwt from "jsonwebtoken";

export const generateToken = (uid, name) => {
  const payload = { uid, name };
  return jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: "8h" });
};
