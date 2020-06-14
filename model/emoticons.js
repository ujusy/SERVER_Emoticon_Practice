/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */
const util = require('../module/utils');
const db = require('../module/poolAsync');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');

const table = 'emoticons';

module.exports = {
  readAll: () => new Promise(async (resolve) => {
    const query = `SELECT * FROM ${table}`;
    const result = await db.queryParam_Parse(query, [0]);

    resolve({
      code: statusCode.OK,
      json: util.successTrue(result),
    });
  }),
  read: (
    id,
  ) => new Promise(async (resolve) => {
    // eslint-disable-next-line no-new-object
    const final = new Object();
    const recommendation = [];
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    const result = await db.queryParam_Parse(query, [id]);

    if (result.length === 0) {
      resolve({
        code: statusCode.NOT_FOUND,
        json: util.successFalse([{
          response: resMessage.NO_EXIST,
        }]),
      });
      return;
    }
    const querySales = `SELECT * FROM ${table} WHERE id NOT IN (?) ORDER BY sales DESC,id  limit 3`;
    const salesResult = await db.queryParam_Parse(querySales, [id]);
    if (salesResult.length === 0) {
      resolve({
        code: statusCode.OK,
        json: util.successFalse(statusCode.NOT_FOUND, resMessage.NO_EXIST),
      });
      return;
    }
    for (i = 0; i < salesResult.length; i++) {
      recommendation.push(salesResult[i]);
    }
    result[0].recommendation = recommendation;
    resolve({
      code: statusCode.OK,
      json: util.successTrue(result),
    });
  }),
  delete: (id) => new Promise(async (resolve) => {
    const checkQuery = `SELECT tagId FROM ${table} WHERE id = ?`;
    const checkResult = await db.queryParam_Parse(checkQuery, [id]);

    if (checkResult.length === 0) {
      resolve({
        code: statusCode.NOT_FOUND,
        json: util.successFalse([{
          response: resMessage.NO_EXIST,
        }]),
      });
      return;
    }
    const tag = checkResult[0].tagId;
    if (tag !== 0) {
      const updateQuery = 'UPDATE tags SET emoticons = emoticons - 1 WHERE id = ? ';
      await db.queryParam_Parse(updateQuery, [tag]);
    }
    const query = `DELETE FROM ${table} WHERE id = ?`;
    await db.queryParam_Parse(query, [id]);
    resolve({
      code: statusCode.OK,
      json: util.successTrue(),
    });
  }),
  create: ({
    name,
    filename,
    sales,
    tagId,
  }) => new Promise(async (resolve) => {
    const checkQuery = `SELECT name FROM ${table} WHERE name = ? `;
    const checkResult = await db.queryParam_Parse(checkQuery, [name]);

    if (checkResult.length !== 0) {
      resolve({
        code: statusCode.ALREADY_EXIST,
        json: util.successFalse([{
          response: resMessage.ALREADY_EXIST,
        }]),
      });
      return;
    }

    if (tagId) {
      const checkExist = 'SELECT id FROM tags WHERE id = ?';
      const existResult = await db.queryParam_Parse(checkExist, [tagId]);
      if (existResult.length === 0) {
        resolve({
          code: statusCode.NOT_FOUND,
          json: util.successFalse([{ response: '알맞은 Tag가 존재하지 않습니다' }]),
        });
        return;
      }
      const updateQuery = 'UPDATE tags SET emoticons = emoticons + 1 WHERE id = ?';
      await db.queryParam_Parse(updateQuery, [tagId]);
    }

    const field = 'name, filename, sales, tagId';
    const values = [name, filename, sales, tagId];
    const query = `INSERT INTO ${table} (${field}) VALUES(?,?,?,?)`;
    await db.queryParam_Parse(query, values);
    const resQuery = `SELECT * FROM ${table} WHERE name = ? AND filename = ?`;
    const resResult = await db.queryParam_Parse(resQuery, [name, filename]);

    resolve({
      code: statusCode.OK,
      json: util.successTrue(resResult),
    });
  }),
};
