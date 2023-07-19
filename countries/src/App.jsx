import { useEffect, useState } from 'react'
import { getWeather, getCountries } from './services/weather'
import Notification from './components/Notification'
import Card from './components/Card'
import './app.css'

function App() {

  //state variables
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryCard, setCountryCard] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handlechange = (e) => {

    setCountry(e.target.value)
    const filterCountries = countries.filter((elem) => elem.name.common.toLowerCase().includes(e.target.value))

    if (e.target.value === '') {
      setFilteredCountries([])
    }
    if (filterCountries.length > 10) {
      setFilteredCountries([])
      setCountryCard(null)
      setErrorMessage(`There are too many matches, please be more specific.`)
    }
    else if (filterCountries.length === 1) {
      const { name, capital, flags, population, area } = filterCountries[0]

      getWeather(`${import.meta.env.VITE_BASE_URL}/current.json?key=${import.meta.env.VITE_API_KEY}&q=${capital[0]}`)
        .then(response => {
          const { condition, humidity, temp_c, uv, wind_kph } = response.current

          setCountryCard({
            name: name.common,
            capital: capital[0],
            flags: flags.png,
            area,
            population,
            condition: condition.text,
            humidity,
            temp_c,
            uv,
            wind_kph
          })
        })

      setErrorMessage(null)
      setFilteredCountries([])
    }
    else if (filterCountries.length === 0) {
      setCountryCard(null)
      setErrorMessage(`No matching countries were found.`)
    }
    else {
      setErrorMessage(null)
      setCountryCard(null)
      setFilteredCountries(filterCountries)
    }
  }

  const handleClick = (country) => {
    const filterCountry = filteredCountries.filter((elem) => elem.name.common === country)
    const { name, capital, flags, population, area } = filterCountry[0]

    getWeather(`${import.meta.env.VITE_BASE_URL}/current.json?key=${import.meta.env.VITE_API_KEY}&q=${capital[0]}`)
      .then(response => {
        const { condition, humidity, temp_c, uv, wind_kph } = response.current
        setCountryCard({
          name: name.common,
          capital: capital[0],
          flags: flags.png,
          area,
          population,
          condition: condition.text,
          humidity,
          temp_c,
          uv,
          wind_kph
        })
      })
  }

  useEffect(() => {
    getCountries()
      .then(response => {
        setCountries(response)
      })
  }, [])

  useEffect(() => {
    if (country === '') {
      setErrorMessage(null)
    }
  }, [filteredCountries])

  return (
    <div className="App">
      <Notification message={errorMessage} />
      <label htmlFor='country'>Country: </label>
      <input value={country} onChange={handlechange} />
      <ul className='my-5'>
        {
          filteredCountries.map((elem) => (
            <li>
              {elem.name.common}
              <button className='p-1' onClick={() => handleClick(elem.name.common)} >show</button>
            </li>
          ))
        }
      </ul>
      <div>
        {
          countryCard &&
          <Card
            info={countryCard}
          />
        }
      </div>
    </div>
  )
}

export default App
