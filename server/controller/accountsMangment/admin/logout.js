exports.logout = (req, res) => {
  const { jwt } = req.cookies;
  if (jwt) {
    res.clearCookie('jwt');
    res.send({ result: 'logout successful' });
  } else {
    res.status(400).send({ error: 'bad request' });
  }
};
