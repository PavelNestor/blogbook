const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/', function(req, res, next) {
  const id = req.session.userId;
  const login = req.session.userLogin;
  res.render('index', {
    user: {
      id,
      login
    }
  });
});

module.exports = router;
