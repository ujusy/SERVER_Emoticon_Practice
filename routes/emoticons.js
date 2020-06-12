/* eslint-disable no-empty */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const Emoticons = require('../model/emoticons');
// router-> [POST] /tags
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
// router-> [GET] /tags
router.get('/', async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});
// router-> [GET] /tags/:id tag의 id 의미
router.get('/:id', async (req, res) => {
  try {

  } catch (err) {
    console.log(err);
  }
});
// router-> [DELETE] /tags/:id tag의 id 의미
router.delete('/:id', async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
