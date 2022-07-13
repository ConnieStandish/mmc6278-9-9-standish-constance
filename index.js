// Your code here
const weatherSection = document.getElementById('weather')

const form = document.querySelector('form')

form.onsubmit = async e => {
    e.preventDefault()
    const userLocation = form.search.value
    form.search.value = ""
    weatherSection.innerHTML = ""
    try {
        const URL = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&units=imperial&appid=cbf6a4540c5e167330be7dd558d11f9a`)
        if (!userLocation) return
        
            if (response.status !== 200) throw new Error ('Location not found')
            
        const weather = await response.json()
        renderWeatherData(weather)
    } catch (err) {
        const errMessage = document.createElement('h2')
        errMessage.innerHTML = err.message
        weatherSection.appendChild(errMessage)
    }
}
   
    
    // console.log(weather)


function lineBreaks() {
    const p = document.createElement('p')
    p.innerHTML = '&nbsp'
    weatherSection.appendChild(p)
}

function renderWeatherData() {
    const locHeader = document.createElement('h2')
    locHeader.textContent = weather.name + ', ' + weather.sys.country
    weatherSection.appendChild(locHeader)

    const googleMaps = document.createElement('a')
    const lat = weather.coord.lat
    const lon = weather.coord.lon
    googleMaps.href = 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lon
    googleMaps.textContent = 'Click to view map'
    weatherSection.appendChild(googleMaps)

    const icon = document.createElement('img')
    const iconCode = weather['weather'][0]['icon']
    icon.src = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png'
    icon.alt = weather['weather'][0]['description']
    weatherSection.appendChild(icon)

    const desc1 = weather['weather'][0]['description']
    const arr = desc1.split(' ')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    const desc2 = arr.join(' ')
    const description = document.createElement('p')
    description.textContent = desc2
    weatherSection.appendChild(description)
    lineBreaks()

    const currentTemp = document.createElement('p')
    currentTemp.textContent = 'Current: ' + weather.main.temp + '\u00B0 F'
    weatherSection.appendChild(currentTemp)

    const perceivedTemp = document.createElement('p')
    perceivedTemp.textContent = 'Feels like: ' + weather.main.feels_like + '\u00B0 F' 
    weatherSection.appendChild(perceivedTemp)
    lineBreaks()

    const time = weather.dt * 1000
    const date = new Date(time)
    const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
    })
    const lastUpdate = document.createElement('p')
    lastUpdate.textContent = 'Last updated: ' + timeString
    weatherSection.appendChild(lastUpdate)
    }