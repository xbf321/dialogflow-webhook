const urllib = require('urllib');
module.exports = async (result, response) => {
    const { parameters } = result;
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