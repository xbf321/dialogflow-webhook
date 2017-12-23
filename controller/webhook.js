const urllib = require('urllib');

class WebhookController {
    async index(ctx) {

        // Dialogflow api V1
        const { result = {} } = ctx.request.body;
        const { action, parameters, inputContexts } = result;

        console.info(ctx.request.body);

        /**
         *    result: 
                { source: 'agent',
                    resolvedQuery: '北京天气怎么样',
                    speech: '',
                    action: 'qunarWeather',
                    actionIncomplete: false,
                    parameters: { date: '', 'geo-city': '北京' },
                    contexts: [],
                    metadata: 
                    { intentId: '2d053e2c-a261-4e25-aec6-d3e76817b616',
                        webhookUsed: 'true',
                        webhookForSlotFillingUsed: 'false',
                        intentName: '询问天气' },
                        fulfillment: { speech: '对不起，我不知道你在说什么', messages: [Array] },
                        score: 0.8500000238418579 },
                    status: { code: 200, errorType: 'success', webhookTimedOut: false },
                sessionId: 'ecaa5125-f322-49cc-9cb4-f7f7a48aacdb' }
         */
        const response = {};

        if (action === 'qunarWeather') {
            const city = parameters['geo-city'];
            if(city) {
                // 天气查询
                // http://qapi.qunar.com/api/weather/current?city=%E5%8C%97%E4%BA%AC
                const requestResult = await urllib.request(`https://qapi.qunar.com/api/weather/current?city=${encodeURIComponent(city)}`);
                
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