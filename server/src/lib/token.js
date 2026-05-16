import jwt from "jsonwebtoken";

export function createToken(user) {
  const id = user.id || user._id.toString();
  return jwt.sign({ id }, process.env.JWT_SECRET || "flowpilot-dev-secret", {
    expiresIn: "7d"
  });
}
