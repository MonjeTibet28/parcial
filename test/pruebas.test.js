const request = require('supertest');
const app = require('../app');




describe('GET /', () => {
    it('debe devolver el archivo index.html', async () => {
        const res = await request(app).get('/');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});


describe('GET /register', () => {
    it('debe devolver el archivo register.html', async () => {
        const res = await request(app).get('/register');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});


describe('GET /login', () => {
    it('debe devolver el archivo login.html', async () => {
        const res = await request(app).get('/login');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});


describe('GET /error', () => {
    it('debería devolver el archivo error.html', async () => {
        const res = await request(app).get('/error');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});


describe('GET /productos', () => {
    it('debería devolver el archivo shop.html', async () => {
        const res = await request(app).get('/productos');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});

describe('GET /nosotros', () => {
    it('debería devolver el archivo about.html', async () => {
        const res = await request(app).get('/nosotros');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});

describe('GET /servicio', () => {
    it('debería devolver el archivo services.html', async () => {
        const res = await request(app).get('/servicio');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});

describe('GET /contactar', () => {
    it('debería devolver el archivo contact.html', async () => {
        const res = await request(app).get('/contactar');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});

describe('GET /carro', () => {
    it('debería devolver el archivo cart.html', async () => {
        const res = await request(app).get('/carro');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});

describe('GET /pagar', () => {
    it('debería devolver el archivo checkout.html', async () => {
        const res = await request(app).get('/pagar');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});

describe('GET /politica', () => {
    it('debería devolver el archivo politicas.html', async () => {
        const res = await request(app).get('/politica');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});

describe('GET /pagado', () => {
    it('debería devolver el archivo thankyou.html', async () => {
        const res = await request(app).get('/pagado');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('text/html');
    });
});


describe('POST /signup', () => {
    it('debe devolver un token si las credenciales son válidas', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                email: 'ejemplo@example.com',
                password: '1234',
                confirmPassword: '1234',
                firstName: 'Dario',
                lastName: 'Test',
                country: 'Argentina',
                role: 'Empresario',
                address: 'Calle Falsa 123',
                phone: '123456789'
            });
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('debe devolver un error 401 si las credenciales son inválidas', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                email: 'usuario_invalido@example.com',
                password: 'contraseña_invalida',
                confirmPassword: 'contraseña_invalida',
                firstName: 'Invalido',
                lastName: 'Usuario',
                country: 'Argentina',
                role: 'Empresario',
                address: 'Calle Falsa 123',
                phone: '123456789'
            });
        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Credenciales inválidas');
    });
});

describe('POST /signin', () => {
    it('debe devolver un mensaje de éxito si el token es válido', async () => {

        const tokenResponse = await request(app)
            .post('/signup')
            .send({
                email: 'ejemplo@example.com',
                password: '1234',
                confirmPassword: '1234',
                firstName: 'Dario',
                lastName: 'Test',
                country: 'Argentina',
                role: 'Empresario',
                address: 'Calle Falsa 123',
                phone: '123456789'
            });
        const token = tokenResponse.body.token;

        const res = await request(app)
            .post('/signin')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('mensaje', 'Usuario Logeado');
    });

    it('debe devolver un error 401 si el token es inválido', async () => {
        const token = 'token_invalido';

        const res = await request(app)
            .post('/signin')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(401);
    });
});