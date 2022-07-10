import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(user, process.env.JET_SECRET, {
    expiresIn: "30d",
  });
};
