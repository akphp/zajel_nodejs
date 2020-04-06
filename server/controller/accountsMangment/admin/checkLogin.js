const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const { getAdmin } = require('../../../database/queries/admin/checkAdmin');

exports.checkAdmin = (req, res) => {
  const { userName, password } = req.body;

  if (!(userName && password)) {
    return res.status(400).send({ error: 'Bad Request' });
  }

  getAdmin(userName)
    .then(({ rowCount, rows }) => {
      if (!rowCount) {
        res.status(401).send({ error: 'اسم المستخدم او كلمة السر خاطئة' });
      } else {
        compare(password, rows[0].password)
          .then((success) => {
            if (success) {
              const { id, role, user_name } = rows[0];

              const payload = sign({ id, role, user_name }, process.env.SECRET);

              res.cookie('jwt', payload, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

              res.status(200).send({ result: 'login success' });
            } else {
              res.status(401).send({ error: 'اسم المستخدم او كلمة السر خاطئة' });
            }
          })
          .catch(() => {
            res.status(500).send({ error: 'Internal Server Error' });
          });
      }
    })
    .catch(() => {
      res.status(500).send({ error: 'Internal Server Error' });
    });
};
