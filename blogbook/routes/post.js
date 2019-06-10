const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const modelPost = require('./../models/post');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


/* GET add post. */
router.get('/add', function (req, res, next) {
    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render('post/add', {
        user: {
            id,
            login
        }
    });
});

router.post('/add', (req, res) => {
    const title = req.body.title.trim().replace(/ +(?=)/g, '');
    const body = req.body.body;

    if (!title || !body) {
        const fields = [];

        if (!title) fields.push('title')
        if (!body) fields.push('body')

        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields
        });
    } else {
        modelPost.create({
            title,
            body
        }).then(post => {
            console.log(post);
            res.json({
                ok: true
            });
        }).catch(error => {
            console.log(error);
            res.json({
                ok: false
            });
        });
    }
});

module.exports = router;
