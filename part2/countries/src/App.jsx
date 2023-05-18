/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Countrie = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <>
        {filteredCountries.map((countrie) => (
          <Name
            key={countrie.cca3}
            name={countrie.name.common}
            countrie={countrie}
          />
        ))}
      </>
    );
  } else if (filteredCountries.length === 1) {
    return (
      <>
        {filteredCountries.map((countrie) => (
          <FullCountrie
            key={countrie.cca3}
            name={countrie.name.common}
            capital={countrie.capital}
            population={countrie.population}
            languages={countrie.languages}
            flag={countrie.flags}
          />
        ))}
      </>
    );
  }
};

const FullCountrie = ({ name, capital, population, languages, flag }) => {
  /* console.log(Object.values(languages)); */
  return (
    <>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h1>Languages</h1>
      <Languages languages={Object.values(languages)} />
      <Flags flag={Object.values(flag)} />

      <Weather name={name} /> 
    </>
  );
};

 const Weather = ({name}) => {

  const [weather, setWeather] = useState([])

 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  const access_key= import.meta.env.VITE_API_KEY; 
  
  

  useEffect(() => {

    axios.get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${name}`).then((response) => { 
    
      setWeather(response.data)
    });
  }, [access_key, name]);


  return(
    <>
    <h2> Weather in {weather.location.name}</h2>
     <p>Temperature= {weather.current.temperature} </p> 
     <img src={weather.current.weather_icons}/>
     <p>wind= {weather.current.wind_speed} direction= {weather.current.wind_dir}</p>
    
    </>
  )



} 
const Flags = ({ flag }) => {
  return <img src={flag[0]} alt={flag[2]} width="100px" />;
};

const Languages = ({ languages }) => {
  return (
    <>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const Name = ({ name, countrie }) => {


  const [show, setShow] = useState(false);
 
  const handleClick = () =>{
    setShow(!show)
  }

  return (
    <>
      <p>{name}</p>
      <button onClick={handleClick}>show</button>
      {show && <FullCountrie
        key={countrie.cca3}
        name={countrie.name.common}
        capital={countrie.capital}
        population={countrie.population}
        languages={countrie.languages}
        flag={countrie.flags}
      />}
    </>
  );
};

const Searcher = ({ onChange, value }) => {
  return (
    <form>
      find countries
      <input onChange={onChange} value={value}></input>
    </form>
  );
};
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleCountries = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      

      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((countrie) =>
    countrie.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Searcher onChange={handleCountries} value={search} />
      <Countrie filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
