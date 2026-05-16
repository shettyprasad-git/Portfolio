import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "flowpilot-dev-secret");
    req.userId = payload.id;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
