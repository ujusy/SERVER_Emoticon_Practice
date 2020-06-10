const authUtil = {
    successTrue: (data) => {
        return {
            data
        }
    },
    successFalse: (status, message) => {
        return {
            status: status,
            success: false,
            message: message
            }
        },
    }
module.exports = authUtil;