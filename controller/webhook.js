const urllib = require('urllib');

class WebhookController {
    async index(ctx) {

        // Dialogflow api V1
        const { result = {} } = ctx.request.body;
        const { action, parameters, inputContexts } = result;
        const response = {};
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
        if (action === 'qunarWeather') {
            const city = parameters['geo-city'];
            if(city) {
                // 天气查询
                // https://www.heweather.com/documents/api/s6/weather-now
                
                const requestResult = await urllib.request(`https://free-api.heweather.com/s6/weather/now?key=b8f5102bfd89486d99555f4bba87739a&location=${encodeURIComponent(city)}`, {
                    dataType: 'json'
                });

                if (requestResult.data && requestResult.data.HeWeather6.length > 0) {
                    const heWeatherData = requestResult.data.HeWeather6[0];
                    if (heWeatherData.status === 'ok') {
                        const nowWeather = heWeatherData.now;
                        const speech = `今天${city}天气${nowWeather.cond_txt},${nowWeather.wind_dir}${nowWeather.wind_sc}级,温度${nowWeather.tmp}摄氏度.`;
                        response.speech = response.displayText = speech;
                    }
                }
            }
        }
        ctx.body = response;
        console.log(response);
    }
};

module.exports = WebhookController;