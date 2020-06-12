/* eslint-disable no-async-promise-executor */
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const db = require('../module/poolAsync');
const resMessage = require('../module/responseMessage');

const table = 'tags';

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
    const query = `SELECT  * FROM ${table} WHERE id = ?`;
    const result = await db.queryParam_Parse(query, [id]);
    // 해당 id가 존재하지 않는 경우
    if (result.length === 0) {
      resolve({
        code: statusCode.NOT_FOUND,
        json: util.successFalse([{
          response: resMessage.NO_EXIST,
        }]),
      });
    }
    resolve({
      code: statusCode.OK,
      json: util.successTrue(result),
    });
  }),
  delete: (id) => new Promise(async (resolve) => {
    const checkQuery = `SELECT * FROM ${table} WHERE id = ?`;
    const checkResult = await db.queryParam_Parse(checkQuery, [id]);
    if (checkResult.length === 0) {
      resolve({
        code: statusCode.NOT_FOUND,
        json: util.successFalse([{
          response: resMessage.NO_EXIST,
        }]),
      });
    }
    const query = `DELETE  FROM ${table} WHERE id = ?`;
    await db.queryParam_Parse(query, [id]);
    const query2 = 'DELETE FROM emoticons WHERE tagId = ?';
    await db.queryParam_Parse(query2, [id]);
    resolve({
      code: statusCode.OK,
      json: util.successTrue(),
    });
  }),
  create: ({
    name,
  }) => new Promise(async (resolve) => {
    // 존재하는 tag 명인지 확인하고 존재한다면 request 보내준다.
    const checkName = `SELECT name FROM ${table} WHERE name = ?`; // name 중복 check 예외처리
    const checkNameResult = await db.queryParam_Parse(checkName, [name]);
    if (checkNameResult.length !== 0) {
      resolve({
        code: statusCode.NOT_FOUND,
        json: util.successFalse([{
          response: resMessage.ALREADY_EXIST,
        }]),
      });

      return;
    }
    // 추후 확장을 위해 따로 변수를 두어 관리
    const field = 'name';
    const values = [name];
    const query = `INSERT INTO ${table} (${field}) VALUES(?) `;
    await db.queryParam_Parse(query, values);
    const checkQuery = 'SELECT id, name FROM tags WHERE name = ?';
    const checkResult = await db.queryParam_Parse(checkQuery, values);

    resolve({
      code: statusCode.OK,
      json: util.successTrue(checkResult),
    });
  }),
};
