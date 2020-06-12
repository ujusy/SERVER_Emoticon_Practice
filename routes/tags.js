/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const Tags = require('../model/tags');
// router-> [POST] /tags
router.post('/', async (req, res) => {
  try {
    const {
      name,
    } = req.body;
    // name이 null일 경우 예외처리
    if (!name) {
      res.status(statusCode.OK)
        .send(util.successFalse('Tag 명은 필수로 입력해주세요'));
    }
    Tags.create({
      name,
    })
      .then(({
        code,
        json,
      }) => res.status(code).send(json.data[0]))
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});
// router-> [GET] /tags
router.get('/', async (req, res) => {
  try {
    Tags.readAll()
      .then(({
        code,
        json,
      }) => res.status(code).send(json.data))
      .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.successFalse('서버에러'));
      });
  } catch (err) {
    console.log(err);
  }
});
// router-> [GET] /tags/:id tag의 id 의미
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    Tags.read(id)
      .then(({
        code,
        json,
      }) => res.status(code).send(json.data))
      .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.successFalse('서버에러'));
      });
  } catch (err) {
    console.log(err);
  }
});
// router-> [DELETE] /tags/:id tag의 id 의미
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    Tags.delete(id)
      .then(({
        json,
      }) => res.status().send(json.data))
      .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.successFalse('서버에러'));
      });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
});

module.exports = router;
