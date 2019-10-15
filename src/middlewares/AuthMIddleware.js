const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const header = req.headers.authorization;

    const [aux, token] = header.split(' ');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'No Token was provided' });
  }
};
