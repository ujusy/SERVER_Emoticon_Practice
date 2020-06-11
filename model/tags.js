const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const db = require('../module/poolAsync');
const resMessage = require('../module/responseMessage');

const table = 'tags';
module.exports = {
    readAll: () => {

    },
    read: () => {

    },
    delete: () => {

    },
    create: ({name}) => {
        return new Promise(async(resolve, reject)=>{
            
            //존재하는 tag 명인지 확인하고 존재한다면 request 보내준다. 
            const checkName = `SELECT name FROM tags WHERE name = ?`; //name 중복 check 예외처리 
            const checkNameResult = await db.queryParam_Parse(checkName, [name]);
            if(checkNameResult.length != 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse([{"response":resMessage.ALREADY_EXIST}])
                });

                return;
            }
            //추후 확장을 위해 따로 변수를 두어 관리
            const field = `name`; 
            const values = [name];
            const query = `INSERT INTO ${table} (${field}) VALUES(?) `;
            console.log("ddfdf");
            const result = await db.queryParam_Parse(query, values);
            console.log(result)
            const checkQuery = `SELECT id, name FROM tags WHERE name = ?`;
            const checkResult = await db.queryParam_Parse(checkQuery, values);
            console.log(checkResult);
            resolve({
                code : statusCode.OK,
                json : util.successTrue(checkResult)
         
            });
        })

    }
}