export const authMiddleware = (req, res, next) => {
  // obtener la informacion de una cookie, a traves de passport
  req.user = { email: "fhkashfkl", password: "ahfklsa" };
  next();
};
