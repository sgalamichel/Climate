//PARA CONOCER POSICION

const log = (position) => {
    console.log(position)
}

//KEY OBTENIDA DE LA API QUE ME VA A PERMITIR HACER LLAMADAS PARA OBTENER LA INFO DEL CLIMA
const APP_ID = '7654fde58c13b273929077eb8cf9d501';

//OBTENER DATA DEL LUGAR - POR COORDENADAS GEOGRAFICAS

const fetchData = position => { 
    const {latitude, longitude} = position.coords;  //obtener posicion de latitud y longitud que va a ser igual a la posicion
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`) //cambio variables por las dos key del objeto
    .then(response => response.json()) //paso el response al siguiente json
    .then(data => setWeatherData(data)) //para poder mostrar la info al usuario
};

const setWeatherData = data => {
    console.log(data)
    const weatherData = {
        location : data.name,
        description : data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }
    //itero las key de mi objeto y las seteo con cada uno de los nombres con la info que tiene cada key
    Object.keys(weatherData).forEach(key => {  //hago un recorrido del objeto para que me devuelva las key
        document.getElementById(key).textContent = weatherData [key]; 
    });

    cleanUp (); 
}

//para que se muestre el loader primero hasta que la info se cargue.
const cleanUp = () =>{
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

//Obtener fecha
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

//Obtener ubicacion del usuario
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}



