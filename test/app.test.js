const request = require('supertest')
const app = require('../src/app')

const sampleRequestSuccess = require('./test_data/sample-request-success.json')
const sampleRequestIncorrectData = require('./test_data/sample-request-incorrect-data.json')
const sampleRequestMissingFields = require('./test_data/sample-request-missing-fields.json')
const sampleRequestInvalid = require('./test_data/sample-request-invalid.json')
const sampleResponseSuccess = require('./test_data/sample-response-success.json')
const sampleResponseMissingFields = require('./test_data/sample-response-missing-fields.json')

describe('Test app is running', () => {
  test('Positive ping test', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200)
      });
  });
});

describe('Test filtering and formatting shows', () => {
  test('Positive filtering test ', () => {
    return request(app)
      .post('/')
      .send(sampleRequestSuccess)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(sampleResponseSuccess)
      });
  });
  test('Incorrect field data types', () => {
    return request(app)
      .post('/')
      .send(sampleRequestIncorrectData)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({response: []})
      });
  });
  test('Missing fields', () => {
    return request(app)
      .post('/')
      .send(sampleRequestMissingFields)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(sampleResponseMissingFields)
      });
  });
  test('Invalid JSON', () => {
    return request(app)
      .post('/')
      .send(sampleRequestInvalid)
      .then(res => {
        expect(res.statusCode).toBe(400)
      });
  });
});