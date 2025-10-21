/* global $ */
(async function(){
    'use strict';

    const weatherTable = $('#weatherTable');

    // const url = 'https://open-weather13.p.rapidapi.com/city?city=new%20york&lang=EN';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-key': '60b1f81f0amshf5a65a13de55e83p1f1582jsnf2646198bbd0',
    //         'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    //     }
    // };

    try {
        // const response = await fetch(url, options);
        // const result = await response.json();

        const response = await fetch('weatherObject');
        const result = await response.json();
        addWeather(result);
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    function updateBackground (images,result){
        switch (expression) {
            case result.weather.main.clouds:
        
            break;

            case value2:
                
            break;

            default:
        }
    }

    function addWeather(result) {

         $("#weatherTable tbody").empty();

        const row = $(`<tr>
                        <td>${result.main.feels_like}</td>
                        <td>${result.main.temp_max}</td>
                        <td>${result.main.temp_min}</td>
                        <td>${result.main.humidity}</td>
                        <td></td>
                        </tr>`);

        weatherTable.append(row);
    }


}());