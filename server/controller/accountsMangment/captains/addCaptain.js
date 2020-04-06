const path = require('path');
const { hash } = require('bcryptjs');
const Joi = require('@hapi/joi');

const { insertCaptain } = require('../../../database/queries/captain/addCaptain');
const { schema } = require('../../utils/addCaptainSchema');

const addCaptain = (req, res) => {
  const { file } = req.files;
  const { error: validationError } = Joi.validate(req.body, schema);
  if (validationError !== null) {
    return res.status(400).send({ error: 'Bad Request' });
  }
  const {
    name, email, phone, address, IDNumber, licenceNumber, status, password,
  } = req.body;
  const extName = path.extname(file.name).slice(1);
  const newName = `${new Date().getTime()}id_photo.${extName}`;
  if (['png', 'jpg', 'jpeg'].some(ext => ext === extName.toLowerCase())) {
    req.files.file.mv(path.join(__dirname, '..', '..', '..', 'upload', `${newName}`), (err) => {
      if (err) res.status(500).send({ error: 'Internal Server Error' });
      else {
        hash(password, 5, (error, pass) => {
          if (error) res.status(500).send({ error: 'Internal Server Error' });
          else {
            insertCaptain([name, email, phone, address, IDNumber, licenceNumber, status, newName, 1, pass])
              .then((response) => {
                res.send({ result: response.rows });
              })
              .catch((errorInsert) => {
                if (errorInsert.constraint === 'tuser_s_email_key') {
                  res.status(409).send({ error: 'الايميل مستخدم' });
                } else { res.status(500).send({ error: 'Internal Server Error' }); }
              });
          }
        });
      }
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
};

module.exports = { addCaptain };
