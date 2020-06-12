/* eslint-disable no-empty */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

// router-> [POST] /tags
router.post('/', async (req, res) => {
  try {
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
