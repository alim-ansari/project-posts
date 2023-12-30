import jwt from "jsonwebtoken";

export const getUserName = (token) => {
  var decoded = jwt.verify(token, process.env.SECRET_KEY);
  return { name: decoded.name, userName: decoded.userName };
};
