const api_key = "791550d7268c458ae2e3d40881b7f913" ; 
async function getData(){
    let city = document.getElementById("cityname").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
   try{
    let res = await fetch(url);
    let users = await res.json();
    // console.log(data)
    append(users)

    getData2(users)

   }catch(err){
    console.log(err)
   }
}


let getData2 = async (data) => {
    let lat = data.coord.lat ; 
    let lon = data.coord.lon ; 
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={hourly}&appid=${api_key}` ; 
    try{
        let res = await fetch(url) ; 
        let users = await res.json() ; 
        append2(users.daily) ; 
    }catch(err){
        console.log(err)
    }
}


function append(data){
   
        let div = document.getElementById("container") ; 
        div.innerHTML = null ;

        let h3 = document.createElement("h2") ; 
        h3.innerText = data.name ; 
      
        let temp_P = document.createElement("p") ;
        temp_P.innerText = "Temprature - "+Math.floor(data.main.temp-273)+"° C" ; 
       
        let weather = document.createElement("p") ;
        if(data.weather[0].main=="Haze"){
            weather.innerHTML = data.weather[0].main+" " +`<span class="material-symbols-outlined">cloudy_snowing</span>` ;
        }
        else if(data.weather[0].main=="Clear"){
            weather.innerHTML =  data.weather[0].main+" "+" " +`<span class="material-symbols-outlined">sunny</span>` ; 
        }
        else if(data.weather[0].main==="Rain"){
            weather.innerHTML =  data.weather[0].main + " " +`<span class="material-symbols-sharp">rainy</span>` ; 
        }
        else if(data.weather[0].main==="Clouds"){
            weather.innerHTML =  data.weather[0].main + " " +`<span class="material-symbols-sharp">cloudy</span>` ; 
        }



        let temp_Min = document.createElement("p") ; 
        temp_Min.innerText = "Min. Temprature - "+Math.floor(data.main.temp_min-273)+"° C" ; 
        let temp_Max = document.createElement("p") ;
        temp_Max.innerText = "Max. Temprature - "+Math.floor(data.main.temp_max-273)+"° C" ; 
        let pressure = document.createElement("p") ; 
        pressure.innerText = "Pressure - "+data.main.pressure ; 
      
        div.append(h3,weather,temp_P,temp_Min,temp_Max,pressure)
        let iframe = document.querySelector("iframe") ; 
        iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

        let laltitude = data.coord.lat ; 
        let longitude = data.coord.lon ; 

    
}

let append2 = (data) =>{

    let weeklyDiv = document.getElementById("weeklyDiv")
    weeklyDiv.innerHTML = null ; 
   data.forEach(function(el,i){

    console.log(data)
        let day = new Date(el.dt*1000).toLocaleString("en-US",{weekday:"short"}) ;
        let div = document.createElement("div") ; 
        div.setAttribute("id","dayDiv") ; 
        let dayName = document.createElement("h3") ; 
        dayName.innerText = day ; 
        console.log(el.weather[0].main) ; 
        let icon = document.createElement("object") ; 
        if(el.weather[0].main=="Rain"){
            icon.data = "rainy-6.svg"
        }
        else if(el.weather[0].main=="Clouds"){
            icon.data = "cloudy-day-3.svg"
        }
        else if(el.weather[0].main=="Clear"){
            icon.data = "day.svg" ; 
        }
        else if(el.weather[0].main=="Snow"){
            icon.data = "snowy-6.svg" ; 
        }
        let min = document.createElement("p") ; 
        min.innerText = Math.floor(el.temp.min-273)+"° C"
        let max = document.createElement("p") ; 
        max.innerText = Math.floor(el.temp.max-273)+"° C"
       
        div.append(dayName , icon , min , max) ; 
        weeklyDiv.append(div)

   })
}


