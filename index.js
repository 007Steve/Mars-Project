const API_KEY = "KXoBIzxNWyOgeHC1hE3HAeUCE5cfc6dS0ayvGz1N"
const url = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

const currentSolElement = document.querySelector("[data-current-sol]")
const currentSolTempHigh = document.querySelector("[data-current-temp-high]")
const currentSolTempLow = document.querySelector("[data-current-temp-low]")
const currentSolElementDate = document.querySelector("[data-current-date]")


let selectedSolIndex
getWeather().then(sols => {
 selectedSolIndex = sols.length - 1
 displaySelectedSol(sols)
})

function displaySelectedSol(sols) {
const selectedSol = sols[selectedSolIndex]
console.log(selectedSol.maxTemperature)
currentSolElement.innerHTML= selectedSol.sol
currentSolTempHigh.innerHTML = displayTemperture(selectedSol.maxTemperature)
currentSolTempLow.innerHTML =  displayTemperture(selectedSol.minTemperature)
currentSolElementDate.innerHTML = displayDate(selectedSol.date)

}

function displayTemperture(temp) {
    return Math.round(temp)
}

function displayDate(date) {
    return date.toLocaleDateString(
        undefined,
        {day: 'numeric', month: "long"}
    )
}
function getWeather(){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        const {
            sol_keys,
            validity_checks,
            ...solData
        } = data
        return Object.entries(solData).map(([sol,data]) => {
            return {
                sol: sol,
                maxTemperature: data.AT.mx,
                minTemperature: data.AT.mn,
                windSpeed: data.HWS.av,
                windDirection: data.WD.most_common.compass_point,
                date: new Date(data.First_UTC)
            }
        })
        
    })
   
}
