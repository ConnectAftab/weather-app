import React, { useState } from 'react';
import "./weather.css"

const api = {
    key: '9b9640562349392c0d155bbcb7adf32e',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", 
                      "May", "June", "July", "August", 
                      "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
                    "Thursday", "Friday", "Saturday"];
        
        let day = days[d.getDay()];
        let date = d.getDate();            
        let month = months[d.getMonth()];
        let year = d.getFullYear();        

        return `${day} ${date} ${month} ${year}`;
    }

    return (
        <div className={(typeof weather.main !="udefined")?((weather.main?.temp >16)? "app warm" :"app"): "app"}>
            <main>
                <div className='search-box'>
                    <input
                        className='search-bar'
                        type='text'
                        placeholder='Search...'
                        onKeyPress={search}  
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
               
                {weather.name && weather.sys && (
                    <div>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name}, {weather.sys.country}
                                <div className='date'>
                                    {dateBuilder(new Date())}
                                </div>
                                <div className='weather-box'>
                                <div className='temp'>
                               {Math.round(weather.main.temp)}°C 
                                </div>
                                <div className='weather'>
                                    {weather.weather[0].main}
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Weather;
