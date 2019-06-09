const express = require('express');
const bodyParser = require('body-parser');
const modelUser = require('./../models/user');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


/* POST is authorzed. */
router.post('/register', (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (!login || !password || !passwordConfirm) {
    res.json({
      ok: false,
      error: 'Все поля должны быть заполнены!',
      fields: ['login', 'password', 'passwordConfirm']
    });
  } else if (login.length < 3 || login.length > 16) {
    res.json({
      of: false,
      error: 'Длина логина от 3 до 16 символов!',
      fields: ['login']
    });
  } else if (password !== passwordConfirm) {
    res.json({
      ok: false,
      error: 'Пароли не совпадают!',
      fields: ['password', 'passwordConfirm']
    });
  } else {
    modelUser.findOne({
      login
    }).then(user => {
      if (!user) {
        bcrypt.hash(password, null, null, (err, hash) => {
          modelUser.create({
            login,
            password: hash
          }).then(user => {
            console.log(user);
            res.json({
              ok: true
            });
          }).catch(err => {
            console.log(err);
            res.json({
              ok: false,
              error: 'Ошибка попробуйте позже!'
            });
          });
        });
      } else {
        res.json({
          ok: false,
          error: 'Имя занято',
          fields: ['login']
        })
      }
    })
  }
});

module.exports = router;
