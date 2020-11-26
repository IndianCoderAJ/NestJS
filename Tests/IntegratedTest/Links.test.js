const supertest = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose')
const { LinksModule } = require('../../Model/Links');


let link = {
    OriginalURL: 'https://www.google.com/search?q=do+a+barrel+roll',
    urlHash: 'abc',
    shortUrl: process.env.BASE_URL,
}
beforeAll(async() => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
})

beforeEach(async() => {
    await LinksModule.deleteMany();
    await LinksModule(link).save();
});

afterEach(async() => {
    await LinksModule.deleteMany();
})

test('should get all links', async() => {
    await supertest(app)
        .get('/links')
        .expect(200)
})

test('should add the links', async() => {
    await supertest(app)
        .post('/links')
        .send({
            url: "https://www.google.com/search?q=do+a+barrel+roll"
        })
        .expect(200)
})

test('should update the links', async() => {
    await supertest(app)
        .put('/links')
        .send({
            url: "https://www.google.com/search?q=do+a+barrel+roll"
        })
        .expect(200)
})

test('should delete the links', async() => {
    await supertest(app)
        .delete('/links')
        .send({
            url: "https://www.google.com/search?q=do+a+barrel+roll"
        })
        .expect(200)
})

test('should redirect to the links', async() => {
    await supertest(app)
        .get('/abc')
        //.query({code:''})
        .expect(302)
})