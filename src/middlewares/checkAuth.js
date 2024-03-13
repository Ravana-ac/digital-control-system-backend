import jwt from 'jsonwebtoken';

const checkAuth = async (req, res, next) => {
  const toekn = req.header('x-auth-token');

  if (!toekn) {
    return res.json({ error: 'authorization token not provided' });
  }

  const secret = process.env.JWT_SECRET;

  try {
    const user = jwt.verify(toekn, secret);
    req.user = user;
    return next();
  } catch (error) {
    return res.json({ error: 'invalid token' });
  }
};

export default checkAuth;