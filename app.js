const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const config = require('./config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.all('/user', (req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/error', (req, res) => {
    res.sendFile(__dirname + '/public/error.html')
})

app.get('/productos', (req, res) => {
    res.sendFile(__dirname + '/public/shop.html')
})

app.get('/nosotros', (req, res) => {
    res.sendFile(__dirname + '/public/about.html')
})

app.get('/servicio', (req, res) => {
    res.sendFile(__dirname + '/public/services.html')
})

app.get('/contactar', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html')
})

app.get('/carro', (req, res) => {
    res.sendFile(__dirname + '/public/cart.html')
})

app.get('/pagar', (req, res) => {
    res.sendFile(__dirname + '/public/checkout.html')
})

app.get('/politica', (req, res) => {
    res.sendFile(__dirname + '/public/politicas.html')
})


app.get('/pagado', (req, res) => {
    res.sendFile(__dirname + '/public/thankyou.html')
})



app.post('/signup', (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, country, role, address, phone } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    if (email === 'ejemplo@example.com' && password === '1234') {
        const user = {
            email,
            firstName,
            lastName,
            country,
            role,
            address,
            phone
        };

        jwt.sign({ user }, config.secret, { expiresIn: '5m' }, (error, token) => {
            if (error) {
                res.status(500).json({ message: 'Error generando el token' });
            } else {
                res.json({ token });
            }
        });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

app.post('/signin', verifyToken, (req, res) => {
    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.sendStatus(401)
        } else {
            res.json({
                mensaje: "Usuario Logeado",
                authData: authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    } else {
        res.status(401)
    }
}


module.exports = app

app.listen(config.port, () => {
    console.log(`Server port on ${config.port}, http://localhost:3000`)
})