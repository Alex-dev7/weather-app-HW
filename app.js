
//preloader function
window.addEventListener("load", () => {
    const loader = document.querySelector('.loader')
    const body = document.querySelector('body')
    setTimeout(
        ()=>{
            //loader will fade out after the func is executed
          loader.style.display = 'none' 
          body.style.overflow = 'scroll'
        },
        3000
    );

    
})

// saving my api-key in variable
const apiKey = "09097"


//main html tag
const footer = document.querySelector(".footer")
footer.style = "display: none"


function getWeather(city) {
    //constructing url for request
    const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=93be09e2a8029784917a7f15809b83f0`
    console.log(urlGeo)

    // geocoder api call
   $.ajax(urlGeo)
    .then((location) => {
        
        console.log(location[0].lon)

        //save the lon and lat data into a variable
        const lon = location[0].lon
        const lat = location[0].lat
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      


        //weather api call
        $.ajax(urlWeather)
        .then((weather) => {
            console.log(weather)

            //icon url
            const iconUrl = ` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

            const timezone = weather.timezone
            const rise = weather.sys.sunrise 
            const set = weather.sys.sunset

                $(".city").html(`${weather.name}, ${weather.sys.country}`)
                $(".temp").html(`${Math.floor(weather.main.temp)} &#8457`)
                $(".icon").html(`<img src="${iconUrl}">`)
                $(".main").html(`${weather.weather[0].main}`)
                $(".feels-like").html(`Feels like: ${`<span>${Math.floor(weather.main.feels_like)}&#8457</span>`} `)
                $(".weather").html(`Weather: ${`<span>${weather.weather[0].description}</span>`}`)
                $(".humidity").html(`Humidity: ${`<span>${weather.main.humidity} %</span>`} `)
                $(".wind").html(`Wind: ${`<span>${weather.wind.speed} mhp</span>`}`)
          
            


        })

    })

}


//click event on submit button
$("input[type=submit]").on("click", (event) => {

    //prevent refresh
    event.preventDefault()

    // show the footer
    footer.style = "display"
   //grab the text from the input
   const inputText = $("input[type=text]").val()
 
   // update the screen
   getWeather(inputText)

   //clear input space after submiting the form
   $("#myInput").val('')
 
 
 
 })


