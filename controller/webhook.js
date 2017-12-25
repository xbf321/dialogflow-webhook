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
                // 
                // const qunarWeatherResult =  await urllib.request(`http://qapi.qunar.com/api/weather/current?city=%E5%8C%97%E4%BA%AC`);
                // const requestResult = await urllib.request(`http://php.weather.sina.com.cn/xml.php?city=%B1%B1%BE%A9&password=DJOYnieT8234jlsK&day=0`);
                
                const requestResult = await urllib.request(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=E4805d16520de693a3fe707cdc962045`);

                if (requestResult.data && requestResult.data.error === 0) {
                    const weatherData = requestResult.results[0];
                    const currentWeather = weatherData.weather_data[0];
                    const speech = `今天${city}天气${currentWeather.weather},${currentWeather.wind},${currentWeather.temperature},PM25值${weatherData.pm25}.`;
                    response.speech = response.displayText = speech;
                    
                }
            }
        }
        
        ctx.body = response;
        console.log(response);
    }
};

module.exports = WebhookController;