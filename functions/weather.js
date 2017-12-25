const urllib = require('urllib');
const KEY = 'b8f5102bfd89486d99555f4bba87739a';
const HOST = 'https://free-api.heweather.com';

async function getPM25(city) {
    const data = await fetch(`${HOST}/s6/air/now?key=${KEY}&location=${(city)}`);
    return data.air_now_city || {};
}

async function getNow(city) {
    const data = await fetch(`${HOST}/s6/weather/now?key=${KEY}&location=${(city)}`);
    return data.now || {};
}

async function fetch(url) {
    const requestResult = await urllib.request(url, {
        dataType: 'json'
    });

    if (requestResult.data && requestResult.data.HeWeather6.length > 0) {
        const heWeatherData = requestResult.data.HeWeather6[0];
        if (heWeatherData.status === 'ok') {
            return heWeatherData;
        }
    }
    return {};
}
module.exports = async (result, response) => {
    const { parameters } = result;
    const city = parameters['geo-city'];
    if(city) {
        // 天气查询
        // https://www.heweather.com/documents/api/s6/weather-now

        const weatherData = await getNow(encodeURIComponent(city));
        const pm25Data = await getPM25(encodeURIComponent(city));

        if (weatherData.cond_txt && pm25Data.pm25) {
            const speech = `今天${city}天气${weatherData.cond_txt},${weatherData.wind_dir}${weatherData.wind_sc}级,温度${weatherData.tmp}摄氏度,PM25:${pm25Data.pm25},空气质量${pm25Data.qlty}.`;
            response.speech = response.displayText = speech;
        }
    }
}