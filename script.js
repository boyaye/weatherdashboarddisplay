var submit = document.querySelector(".inputcity")
var searchcity = document.querySelector(".entervalue")
var listhook = document.querySelector(".listhook")
var API_KEY = "02282889aaeff515d61fdec7f58d0ff4";
var asideclass = document.querySelector("#thirdcardclass")

var date_weather = document.querySelector(".weatherdate")
var imagtag  = document.querySelector(".imgtag")

var weathercard = document.querySelector(".card")

var secondaside = document.querySelector("#secondaside")

var helemettag =document.querySelector("#daysforcast")

var maindiv = document.querySelector("#maindiv")



var emptyarray = []
function inputfunction(event){        
    event.preventDefault()
   
    var cityName = searchcity.value.trim()
    if(!cityName){
        alert("please Eneter City Name")
        return
    }else{
        
        listfunction(cityName)
        savedetails(cityName)
searchcityfunction(cityName)      
     }
 
    searchcity.value = "";
    asideclass.textContent = "";
    secondaside.textContent = "";
    helemettag.textContent = "";
   
}

function searchcityfunction(value){
    
    var API_FETCH = "http://api.openweathermap.org/geo/1.0/direct?q="+value+"&limit=1&appid="+API_KEY

    fetch(API_FETCH).then(function(respond){
      
        return respond.json()
    }).then(function(data){
      
        if(!data.length){
            alert("no coordinate found for"+" "+value+" "+"please enter a corrent City")
      return
        }else{
           
          
        }
       

    
        
        var {lat , lon,} = data[0]
 
        fetchinglatlon(value, lat , lon)
    }).catch(function(error){
        return error
    })

}


function savedetails(cityName){

    var pushitem = JSON.parse(localStorage.getItem("Cityinfo")) || []
  pushitem.push(cityName.toUpperCase())
  localStorage.setItem("Cityinfo" ,JSON.stringify(pushitem))   
}

function listfunction(cityName){
    var li = document.createElement("li")
var button = document.createElement("button")
   button.textContent = cityName.toUpperCase()
   li.appendChild(button)
   listhook.appendChild(li)
}




function fetchinglatlon(cityName , lat ,lon){
  
    
    var SECOND_FETCH ="http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+API_KEY
    fetch(SECOND_FETCH).then(function(respond){
        return respond.json()
    }).then(function(data){

     
       
 var newforcastdate= [];
        var filterlist = data.list.filter(function(forecast){
            var forcastdate = new Date(forecast.dt_txt).getDate()
          
            if(!newforcastdate.includes(forcastdate)){
              return newforcastdate.push(forcastdate)
            }
            
        })

       weeather_functiondisplay(cityName,filterlist)

})

}
function weeather_functiondisplay(cityName,newelement){
  
    var newelementel = newelement.shift()
    
    var Element_Zero = newelementel
        var divel = document.createElement("div")
        divel.classList = "seconddiveflex";
        var hElementHeader = document.createElement("h1")
        var citynameupper = cityName.toUpperCase()
        hElementHeader.innerHTML = citynameupper+" "+"("+Element_Zero.dt_txt.split(" ")[0]+")";
        var imageicon = document.createElement("img");
        imageicon.setAttribute("src","https://openweathermap.org/img/wn/"+Element_Zero.weather[0].icon+"@2x.png" )
        var pel = document.createElement("p")
        if(Element_Zero.main.temp){
           
            pel.innerHTML +="Temp:"+" "+ Element_Zero.main.temp+"f <br/>" 
        }
        if(Element_Zero.wind.speed){
      
            pel.innerHTML +="Wind:"+" "+ Element_Zero.wind.speed+"MPH <br/>";
    
        }
        if (Element_Zero.main.humidity){
     
            pel.innerHTML +="Humidiy:"+" "+ Element_Zero.main.humidity+"%"
        }
        var hdescription = document.createElement("h5")
        hdescription.innerHTML = Element_Zero.weather[0].description;
      
        var divimag = document.createElement("div")
        divimag.classList = "imagediv"
        divimag.append(imageicon, hdescription)
        var divpara = document.createElement("div")
        divpara.append(pel,)
        divel.append(divpara , divimag)
        secondaside.append(hElementHeader, divel )
  
     var helement = document.createElement("h1");
     helement.textContent = "5-Day Forecast"
     helemettag.appendChild(helement)


    for(var i = 0;i < newelement.length;i++){
        var responddata = newelement[i]

        var div = document.createElement("div")
        div.classList = "card";
        var header = document.createElement("h4")
        header.innerHTML = "<h4>"+responddata.dt_txt.split(" ")[0]+"<h4/>"
        var imgicon = document.createElement("img")
        imgicon.setAttribute("src", "https://openweathermap.org/img/wn/"+responddata.weather[0].icon+"@2x.png");
    
        var p = document.createElement("p")
        if(responddata.main.temp){
            
            p.innerHTML = "<p>Temp:"+responddata.main.temp+"f <br/>"
        }
        if(responddata.wind.speed){
         p
    
            p.innerHTML += "<p>Wind:"+responddata.wind.speed.toFixed(2)+"MPH <br/>"
        } if(responddata.main.humidity){
         p
            p.innerHTML += "<p>Humidity:"+responddata.main.humidity+"% "
        }
        div.append(header,imgicon,p)
       asideclass.append(div)
        
    }
   
 
}



   
var clearbutton = document.querySelector("#clearbutton")


clearbutton.addEventListener("click", function(event){
    event.preventDefault()
    listhook.textContent = "";
    asideclass.textContent = "";
    secondaside.textContent = "";
    helemettag.textContent = "";
    
    localStorage.clear()
})

submit.addEventListener("click", inputfunction)


function init(){
var getitem = JSON.parse(localStorage.getItem("Cityinfo"))

if(getitem){
    for(var i =0;i < getitem.length;i++){
        var newCity = getitem[i]
        var li = document.createElement("li")
        li.classList = "demo"
    var button = document.createElement("button")
    button.classList = "eventbutton"
            button.textContent = newCity
            li.appendChild(button)
            listhook.appendChild(li)
    }
}
}
init()


listhook.addEventListener("click",demofunction)

function demofunction(event){
    var target = event.target
    //if(target.tagName.include("BUTTON"))
    if(target.matches("BUTTON")){
       var newtarget = target.innerText
       searchcityfunction(newtarget)
    }

    searchcity.value = "";
    asideclass.textContent = "";
    secondaside.textContent = "";
    helemettag.textContent = "";
}