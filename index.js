// Your code here
const weatherSection = document.getElementById('weather')

const form = document.querySelector('form')

form.onsubmit = async e => {
    e.preventDefault()
    const userLocation = form.search.value
    form.search.value = ""
    weatherSection.innerHTML = ""
    if (!userLocation) return
    try {
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&units=imperial&appid=cbf6a4540c5e167330be7dd558d11f9a`)
        
        if (response.status !== 200) throw new Error ('Location not found')
            
        const weather = await response.json()
        renderWeatherData(weather)
        console.log(weather)
    } catch (err) {
        const errMessage = document.createElement('h2')
        errMessage.innerHTML = err.message
        weatherSection.appendChild(errMessage)
    }
}

function lineBreaks() {
    const p = document.createElement('p')
    p.innerHTML = '&nbsp'
    weatherSection.appendChild(p)
}

function renderWeatherData(weather) {
    weatherSection.innerHTML = `<h2>${weather.name}, ${weather.sys.country}</h2>`

    const googleMaps = document.createElement('a')
    googleMaps.href = `https://www.google.com/maps/search/?api=1&query=${weather.coord.lat},${weather.coord.lon}`
    googleMaps.textContent = 'Click to view map'
    weatherSection.appendChild(googleMaps)

    const icon = document.createElement('img')
    icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    icon.alt = weather['weather'][0]['description']
    weatherSection.appendChild(icon)

    const description = document.createElement('p')
    description.textContent = weather.weather[0].description
    description.style.textTransform = 'capitalize'
    weatherSection.appendChild(description)
    lineBreaks()

    const currentTemp = document.createElement('p')
    currentTemp.textContent = `Current: ${weather.main.temp}\u00B0 F`
    weatherSection.appendChild(currentTemp)

    const perceivedTemp = document.createElement('p')
    perceivedTemp.textContent = `Feels like: ${weather.main.feels_like}\u00B0 F`
    weatherSection.appendChild(perceivedTemp)
    lineBreaks()

    const time = weather.dt * 1000
    const date = new Date(time)
    const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
    })
    const lastUpdate = document.createElement('p')
    lastUpdate.textContent = `Last updated: ${timeString}`
    weatherSection.appendChild(lastUpdate)
    }