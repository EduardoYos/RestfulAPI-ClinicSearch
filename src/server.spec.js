const request = require('supertest');
const app = require('./server');

describe("Test of my app server", () => {
    it('getting main route', async () => {
        const res = await request(app).get('/api');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe("Application start");
    });
});
