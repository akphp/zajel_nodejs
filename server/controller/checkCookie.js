exports.checkCookie = (req, res) => {
  if (req.payload) {
    res.send({ result: true });
  } else {
    res.send({ result: false });
  }
};
