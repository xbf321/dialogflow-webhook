const functions = require('../functions');
class HomeController {
    async index(ctx) {
        const response = {};
        await functions.weather({
            parameters: { date: '', 'geo-city': '北京' }
        }, response);
        ctx.body = response;
    }
}
module.exports = HomeController;