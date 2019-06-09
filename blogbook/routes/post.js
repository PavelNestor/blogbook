const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


/* GET add post. */
router.get('/add', function(req, res, next) {
    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render('post/add', {
        user: {
          id,
          login
        }
      });
});

module.exports = router;
