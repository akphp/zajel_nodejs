exports.getName = (req, res) => {
  const { user_name } = req.payload;
  res.send({ result: user_name });
};
