async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/LOT/69,54/forecast")
  const weatherData = await weatherPromise.json()

  const ourTemperatureF = weatherData.properties.periods[0].temperature
  const ourTemperatureC = Math.floor(((ourTemperatureF - 32) * 5) / 9)

  document.querySelector("#temperature-output").textContent = ourTemperatureC
}
start()
