const moment = require('moment');
/**
 * 询问时间
 * @param {*} result 
 * @param {*} response 
 */
module.exports = async (result, response) => {
    const { parameters } = result;
    const time = parameters.time;
    const date = parameters.date;
    const today = moment().format('YYYY-MM-DD');
    if (date === today) {
        response.speech = response.displayText = `今天是${moment().format('YYYY年MM月DD日')}`;
    }
}