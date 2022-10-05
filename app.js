document.querySelector('#greeting').innerHTML = "<h1 style='letter-spacing: 1.5px; text-align: center; color: #fff; text-transform: uppercase; opacity: 1; font-family: Poppins; '>Weather Forecast</h1>"; // Greeting

let soundTracks = {
    Rain: ['/soundtracks/rain/rain_sound_1.mp3','/soundtracks/rain/rain_sound_2.mp3'],
    Clear: ['/soundtracks/wind/wind_sound_1.mp3','/soundtracks/wind/wind_sound_2.mp3'],
    Clouds: ['/soundtracks/clouds/cloud_sound_1.mp3']
}

function playSound(val) {
    let defaultMusic = 'test default';
    let body = document.body;
    switch(val) {
        case 'Rain':
            body.innerHTML += `<audio autoplay loop id="audio" src='${soundTracks.Rain[Math.floor(Math.random() * soundTracks.Rain.length)]}'></audio>`
            break;
        case 'Clear':
            body.innerHTML += `<audio autoplay loop id="audio" src='${soundTracks.Clear[Math.floor(Math.random() * soundTracks.Clear.length)]}'></audio>`
            break;
        case 'Clouds':
            body.innerHTML += `<audio autoplay loop id="audio" src='${soundTracks.Clouds[Math.floor(Math.random() * soundTracks.Clouds.length)]}'></audio>`
            break;
        default:
            defaultMusic = 'music not found!'
            console.log(defaultMusic);
            break;
    }
    
}

let soundtrack_determined_by_weather = '';

function getAudio(type) {
    switch(type) {
        case 'Rain':
            playSound('Rain');
            console.log('Rain work')
            break;
        case 'Clear':
            playSound('Clear');
            console.log('Clear work')
            break;
        case 'Clouds':
            playSound('Clouds');
            console.log('Clouds work')
            break;
        case 'Mist':
            playSound('Rain');
            console.log('playing mist');
            break;
        default:
            //playSound('wind')
            console.log('default work')
            break;
    }
}


const API_KEY = '534404fd2bdae1f0d64b1dd14a5806a7';
const units = 'metric';

let weather = {
    displayWeather(data) {
        const { name } = data;
        const { icon, description } = data.weather[0]; 
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector('.city').innerText = 'Weather in ' + name;
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
        // document.querySelector('.icon').setAttribute('width', '125px');
        // document.querySelector('.icon').setAttribute('height','125px');
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = units === 'imperial' ? Math.ceil(temp).toFixed(0) + '°F' : Math.ceil(temp).toFixed(0) + '°C';
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%' ;
        document.querySelector('.wind').innerText = 'Wind speed: ' + speed + 'km/h' ;

        switch(data.weather[0].main) {
            case 'Rain':
                soundtrack_determined_by_weather = 'Rain';
                break;
            case 'Mist':
                soundtrack_determined_by_weather = 'Mist';
            case 'Clear':
                soundtrack_determined_by_weather = 'Clear';
                break;
            case 'Clouds':
                soundtrack_determined_by_weather = 'Clouds';
                break;
            default:
                console.log('music off');
                break;
        }

        // getAudio(data.weather[0].main) // to play sound
    },
    toCelcius(fahrenheit) {
        return Math.floor((fahrenheit - 32) * (5/9).toFixed(1)) + '°C'; 
    },
    toFahrenheit(celcius) {
        return Math.ceil((celcius * 9 / 5) + 32).toFixed(0) + '°F';
    },
    search() {
        forecast(document.querySelector('.search-bar').value);
    }
}


let forecast = async (city) => {
    try {
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + units + '&appid=' + API_KEY);

        let data = response.json();

        if (!response.ok) {
            alert('No weather data found.')
            throw new Error('No weather data found.')
        }
        
        return data.then((forecast_data) => weather.displayWeather(forecast_data))

    } catch(err) {
        console.log(err)
    }
}

//forecast('London')

//
document.querySelector('.search button').onclick = () => weather.search();

document.querySelector('.search-bar').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});

// window.addEventListener("DOMContentLoaded", event => {
//     const audio = document.querySelector("#audio1");
//     audio.volume = 1;
//     audio.play();
//   });
  