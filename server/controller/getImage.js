const fs = require('fs');
const path = require('path');

exports.getImage = (req, res) => {
  const { name } = req.params;
  const extName = path.extname(name).slice(1);
  if (['png', 'jpg', 'jpeg'].some(ext => ext === extName.toLowerCase())) {
    fs.readFile(path.join(__dirname, '..', 'upload', name), (error, buffer) => {
      if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      } else {
        let base64 = Buffer.from(buffer).toString('base64');
        base64 = `data:image/${extName};base64,${base64}`;
        res.send(base64);
      }
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
};
