const { expect } = require('chai');
const request = require('supertest');
const server = require('../app');
const faker = require('faker');
const mbtiEnum = require('../src/enums/mbti.enum');
const enneagramEnum = require('../src/enums/enneagram.enum');
const zodiacEnum = require('../src/enums/zodiac.enum');
const commentModel = require('../src/models/comment.model');
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
}

const commentData = {
    comment_by: faker.datatype.number(1),
    title: faker.name.title(),
    comment: faker.name.title(),
    mbti: faker.random.arrayElement(mbtiEnum),
    enneagram: faker.random.arrayElement(enneagramEnum),
    zodiac: faker.random.arrayElement(zodiacEnum),
};

describe('Create User Comments', () => {
    it('should create comments', async () => {
        const user = await userProfileModel.create(userData);
        const commenter = await userProfileModel.create(userData);
        commentData.comment_by = commenter.id;

        const response = await request(server)
            .post(`/api/users/${user.id}/comments`)
            .send(commentData)
            .expect(201);

        expect(response.body.data).to.be.an('object');
    });

    it('should handle create comments validation errors and return a 422 status code', async () => {
        const user = await userProfileModel.create(userData);

        const response = await request(server)
            .post(`/api/users/${user.id}/comments`)
            .send({})
            .expect(422);

        expect(response.body).to.be.an('object').that.has.property('errors');
    });
});

describe('Get User Comments List', () => {
    it('should get comments list', async () => {
        const user = await userProfileModel.create(userData);
        const commenter = await userProfileModel.create(userData);
        commentData.comment_by = commenter.id;

        const response = await request(server)
            .get(`/api/users/${user.id}/comments`)
            .send({})
            .expect(200);

        expect(response.body.data).to.be.an('array');
    });
});

describe('Get User Comment', () => {
    it('should get comment', async () => {
        const user = await userProfileModel.create(userData);
        const commenter = await userProfileModel.create(userData);
        commentData.comment_by = commenter.id;
        commentData.user_id = user.id;
        const comment = await commentModel.create(commentData);

        const response = await request(server)
            .get(`/api/users/${user.id}/comments/${comment.id}`)
            .send({})
            .expect(200);

        expect(response.body.data).to.be.an('object');
    });
});
