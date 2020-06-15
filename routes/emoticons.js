/* eslint-disable no-empty */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const Emoticons = require('../model/emoticons');

// router-> [POST] /emoticons
router.post('/', async (req, res) => {
  try {
    const {
      name,
      filename,
      sales,
      tagId,
    } = req.body;
    if (!name || !filename || !sales) {
      res.statusCode(statusCode.OK)
        .send(util.successFalse('인자에 NULL값은 불허합니다.'));
    }

    Emoticons.create({
      name,
      filename,
      sales,
      tagId,
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
// router-> [GET] /emoticons
router.get('/', async (req, res) => {
  try {
    Emoticons.readAll()
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
// router-> [GET] /emoticons/:id -> 추천: 판매랑 높은것 3개/ 동일한 경우 먼저 등록된것.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    Emoticons.read(id)
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
    Emoticons.delete(id)
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

module.exports = router;
