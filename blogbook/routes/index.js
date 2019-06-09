const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'blogbook' });
});

module.exports = router;
