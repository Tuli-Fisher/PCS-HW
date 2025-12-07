import './WeatherWidget.css';

export default function WeatherWidget(props){

    console.log('props-',props);
    let weather = props.weather || {};
    return(
        <>
            <div className='widget'>
                <h2>{props.name}</h2>
                <p>{weather.weather[0].main}</p>
                <p>{weather.weather[0].description}</p>
                <p>Temperture: {weather.main.temp} &#8457;</p>
                <p>Temperture: {weather.main.feels_like} &#8457;</p>
            </div>
        </>
    )
}