const urllib = require('urllib');

class WebhookController {
    async index(ctx) {

        // Dialogflow api V1
        const { result = {} } = ctx.request.body;
        const { action, parameters, inputContexts } = result;

        const response = {};

        if (action === 'qunarWeather') {
            const city = parameters['geo-city'];
            if(city) {
                // 天气查询
                // http://qapi.qunar.com/api/weather/current?city=%E5%8C%97%E4%BA%AC
                const requestResult = await urllib.request(`http://qapi.qunar.com/api/weather/current?city=${city}`);
                if (requestResult.data && requestResult.data.status === 0) {
                    const weatherData = requestResult.data.data;
                    const speech = `今天${city}天气${weatherData.symbol}.`;
                    response.speech = response.displayText = speech;
                }
            }
        }
        
        ctx.body = response;
    }
};

module.exports = WebhookController;