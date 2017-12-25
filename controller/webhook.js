const functions = require('../functions');

class WebhookController {
    async index(ctx) {
        console.info(functions);
        // Dialogflow api V1
        const { result = {} } = ctx.request.body;
        const { action } = result;
        const response = {};
        /**
         *  result: 
            {   source: 'agent',
                resolvedQuery: '北京天气怎么样',
                speech: '',
                action: 'qunarWeather',
                actionIncomplete: false,
                parameters: { date: '', 'geo-city': '北京' },
                contexts: [],
                metadata: 
                { 
                    intentId: '2d053e2c-a261-4e25-aec6-d3e76817b616',
                    webhookUsed: 'true',
                    webhookForSlotFillingUsed: 'false',
                    intentName: '询问天气' 
                },
                fulfillment: { 
                    speech: '对不起，我不知道你在说什么', 
                    messages: [Array] 
                },
                score: 0.8500000238418579 
            }
         */
        if(functions[action]) {
            await functions[action](result, response);
        }
        ctx.body = response;
    }
};

module.exports = WebhookController;