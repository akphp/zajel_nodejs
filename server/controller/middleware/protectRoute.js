exports.protectRoutes = (req, res, next) => {
  if (req.payload) {
    next();
  } else {
    res.status(401).send({ error: 'unauthorized' });
  }
};
