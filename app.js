document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();
	const input = document.querySelector('input');
	getData(input.value.trim());
});

getData('Almaty');
async function getData(city) {
	//appid-token можно получить в OpenWeather API: https://openweathermap.org/api
	//Более подробно: https://youtu.be/TG5TAB3zVAs

	const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=311a3aa6a4bd8d7d7c5dcde74043564d`);
	const data = await res.json();

	if (res.status !== 200) {
			alert(data.message);
	} else {
			createWeather(data);
	}
}

function createWeather(data) {
	console.log(data)
	document.querySelector('.weather').innerHTML = `
	<div class="left">
			<b class="city">${data.name}</b>
			<span>Влажность: <b>${data.main.humidity}%</b></span>
			<span>Ветер: <b>${Math.round(data.wind.speed)} m/s</b></span>
	</div>
	<div class="right">
			<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
			<span class="temp">${Math.round(data.main.temp - 273)}℃</span>
	</div>`;
}