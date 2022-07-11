// Your code here
var weatherSection = document.getElementById('weather')

var form = document.querySelector('form')

form.onsubmit = function(e) {
    e.preventDefault()
    var userLocation = form.search.value
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + "&units=imperial&appid=cbf6a4540c5e167330be7dd558d11f9a"
    if (!userLocation) return
    form.search.value = ""
    fetch(URL)
    .then(function(response) {
        if (response.status !== 200) {
            throw new Error ('Location not found')
        }
        return response.json()
    })
    .then(function(weather){
        console.log(weather)
        weatherSection.innerHTML = ""
        
    var locHeader = document.createElement('h2')
    locHeader.textContent = weather.name + ', ' + weather.sys.country
    weatherSection.appendChild(locHeader)

    var googleMaps = document.createElement('a')
    var lat = weather.coord.lat
    var lon = weather.coord.lon
    googleMaps.href = 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lon
    googleMaps.textContent = 'Click to view map'
    weatherSection.appendChild(googleMaps)

    var icon = document.createElement('img')
    var iconCode = weather['weather'][0]['icon']
    icon.src = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png'
    icon.alt = weather['weather'][0]['description']
    weatherSection.appendChild(icon)

    var desc1 = weather['weather'][0]['description']
    var arr = desc1.split(' ')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    var desc2 = arr.join(' ')
    var description = document.createElement('p')
    description.textContent = desc2
    weatherSection.appendChild(description)
    lineBreaks()

    var currentTemp = document.createElement('p')
    currentTemp.textContent = 'Current: ' + weather.main.temp + '\u00B0 F'
    weatherSection.appendChild(currentTemp)

    var perceivedTemp = document.createElement('p')
    perceivedTemp.textContent = 'Feels like: ' + weather.main.feels_like + '\u00B0 F' 
    weatherSection.appendChild(perceivedTemp)
    lineBreaks()

    var time = weather.dt * 1000
    var date = new Date(time)
    var timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
    })
    var lastUpdate = document.createElement('p')
    lastUpdate.textContent = 'Last updated: ' + timeString
    weatherSection.appendChild(lastUpdate)
    })

    .catch(function(err) {
    weatherSection.innerHTML = ""
    var errMessage = document.createElement('h2')
    errMessage.innerHTML = err.message
    weatherSection.appendChild(errMessage)
    })
}

function lineBreaks() {
    var p = document.createElement('p')
    p.innerHTML = '&nbsp'
    weatherSection.appendChild(p)
}