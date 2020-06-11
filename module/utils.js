const authUtil = {
    successTrue: (data) => {
        return {
            data
        }
    },
    successFalse: (response) => {
        return {
            response
            }
        },
    }
module.exports = authUtil;