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

    clone.querySelector(".pet-card").dataset.species = pet.species

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)
    clone.querySelector(".pet-card-photo img").src = pet.photo ?? "images/fallback.jpg"
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`

    wrapper.appendChild(clone)
  })
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age === 1) {
    return "1 year old"
  }
  if (age === 0) {
    return "Less than a year old"
  }
  return `${age} years old`
}

document.querySelectorAll(".pet-filter button").forEach((el, index, arr) => {
  el.addEventListener("click", (e) => {
    arr.forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    currentFilter = e.target.dataset.filter

    document.querySelectorAll(".pet-card").forEach((el) => {
      if (currentFilter === el.dataset.species || currentFilter === "all") {
        el.style.removeProperty("display")
      } else {
        el.style.display = "none"
      }
    })
  })
})
