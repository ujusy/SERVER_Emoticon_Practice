const util = require('../module/utils');
const db = require('../module/pool');

module.exports = {
    readAll: () => {

    },
    read: () => {

    },
    delete: () => {

    },
    create: ({name}) => {
        return new Promise(async(resolve, reject)=>{
            const checkName = `SELECT name FROM tags WHERE name = ?`;
            const checkNameResult = await db.queryParam_Parse(checkName, [name]);
            if(checkNameResult.length != 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_X(email_c))
                });
            }
        })

    }
}