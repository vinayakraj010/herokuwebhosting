const button = document.getElementById('button');
const viewChange = document.querySelector('.desktop_view')
const bars = document.querySelectorAll('.menu_bar');
let isActive = false;

button.addEventListener('click', () => {
    viewChange.classList.toggle('mobile_view')
    if (!isActive) {
        bars[0].style.transform = "rotate(36deg)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-36deg)";
        isActive = true;
    } else {
        bars[0].style.transform = "rotate(0deg)";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "rotate(0deg)";
        isActive = false;
    }
})

// WEATHER PAGE JAVASCRIPT 
const dayName = document.getElementById('day');
const dateName = document.getElementById('date')
const d = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = weekday[d.getDay()];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[d.getMonth()];
dayName.innerHTML = day;
dateName.innerHTML = `${d.getDate()} ${month}`

// WEATHER API JAVASCRIPT
const submitBtn = document.getElementById('sub_btn');
const search = document.getElementById('search');
const cityName = document.getElementById('city_name');
const temp = document.getElementById('temp');
const tempStatus = document.getElementById('temp_status');
const searchBox = document.getElementById('searched_box')



const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = search.value;
    if (cityVal === "") {
        cityName.innerText = "Please write the name of city";
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=c2b6634e88e6ad9cef1555d29c015d2e&units=metric`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            console.log(arrData)
            temp.innerHTML = `${arrData[0].main.temp}</span><sup>o</sup>C`;
            cityName.innerHTML = `${arrData[0].name} ${arrData[0].sys.country}`;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood)
            if (tempMood == 'Clear') {
                tempStatus.innerHTML = '<i class="fa-solid fa-sun" style="color:yellow;"></i>';
                searchBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1598965914211-6ec6872593a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80')"
            } else if (tempMood == 'Clouds') {
                tempStatus.innerHTML = '<i class="fa-solid fa-cloud" style="color:white;"></i>';
                searchBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1611928482473-7b27d24eab80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWR5JTIwd2VhdGhlcnxlbnwwfHwwfHw%3D&w=1000&q=80')";
                cityName.style.color = 'white';
            } else if (tempMood == 'Rain') {
                tempStatus.innerHTML = '<i class="fa-solid fa-raindrops"></i>'
                searchBox.style.backgroundImage = "url('https://images.unsplash.com/photo-1520609798519-2e1e8c18df3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
            } else {
                tempStatus.innerHTML = tempMood;
            }
        } catch {
            cityName.innerText = "Please write the correct name of city";
        }
    }
}
submitBtn.addEventListener('click', getInfo);