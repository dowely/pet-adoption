const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/LOT/69,54/forecast")
  const weatherData = await weatherPromise.json()

  const ourTemperatureF = weatherData.properties.periods[0].temperature
  const ourTemperatureC = Math.floor(((ourTemperatureF - 32) * 5) / 9)

  document.querySelector("#temperature-output").textContent = ourTemperatureC
}
start()

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()

  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name

    wrapper.appendChild(clone)
  })
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()
