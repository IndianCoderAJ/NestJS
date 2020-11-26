const supertest = require('supertest');
const app = require('../../app');
const is_url = require('../../utils/is_url');

test('Link is valid or not',() => {
    expect(is_url('www.google.com')).toBe(true);
})
