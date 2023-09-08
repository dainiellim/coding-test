const { expect } = require('chai');
const request = require('supertest');
const server = require('../app');
const faker = require('faker');
const mbtiEnum = require('../src/enums/mbti.enum');
const enneagramEnum = require('../src/enums/enneagram.enum');
const userProfileModel = require('../src/models/userProfile.model');

const userData = {
    name: faker.name.findName(),
    description: faker.name.title(),
    mbti: faker.random.arrayElement(mbtiEnum),
    enneagram: faker.random.arrayElement(enneagramEnum),
    variant: faker.name.title(),
    tritype: faker.name.title(),
    socionics: faker.name.title(),
    sloan: faker.name.title(),
    psyche: faker.name.title(),
    image: faker.internet.avatar(),
};

describe('Create User Profile', () => {
    it('should create user profile', async () => {
        const response = await request(server)
            .post('/api/users')
            .send(userData)
            .expect(201);

        expect(response.body.data).to.be.an('object');
    });
    it('should handle create user profile validation errors and return a 422 status code', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({})
            .expect(422);

        expect(response.body).to.be.an('object').that.has.property('errors');
    });
});


describe('Get User Profile List', () => {
    it('should get user profiles', async () => {
        const user = await userProfileModel.create(userData);
        const response = await request(server)
            .get('/api/users')
            .send()
            .expect(200);

        expect(response.body.data).to.be.an('array');
    });
    it('should get user profiles and filter', async () => {
        const user = await userProfileModel.create(userData);
        const response = await request(server)
            .get('/api/users')
            .send({
                q: userData.name
            })
            .expect(200);

        expect(response.body.data).to.be.an('array');
    });
});

describe('Find User Profile', () => {
    it('should get user profile', async () => {
        const user = await userProfileModel.create(userData);
        const response = await request(server)
            .get(`/api/users/${user.id}`)
            .send()
            .expect(200);

        expect(response.body.data).to.be.an('object');
        expect(response.body.data.name).to.equal(user.name);
    });
    it('should response 404 if user profile does not exist', async () => {
        const response = await request(server)
            .get(`/api/users/0`)
            .send()
            .expect(404);

        expect(response.body).to.be.an('object');
    });
});

describe('Update User Profile', () => {
    it('should update user profile', async () => {
        const user = await userProfileModel.create(userData);
        const response = await request(server)
            .put(`/api/users/${user.id}`)
            .send(userData)
            .expect(200);

        expect(response.body.data).to.be.an('object');
        expect(response.body.data.name).to.equal(user.name);
    });
    it('should handle create user profile validation errors and return a 422 status code', async () => {
        const user = await userProfileModel.create(userData);
        const response = await request(server)
            .put(`/api/users/${user.id}`)
            .send({})
            .expect(422);

        expect(response.body).to.be.an('object').that.has.property('errors');
    });
    it('should response 404 if user profile does not exist', async () => {
        const response = await request(server)
            .put(`/api/users/0`)
            .send(userData)
            .expect(404);

        expect(response.body).to.be.an('object');
    });
});