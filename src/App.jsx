import { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [continent, setContinent] = useState([]);
  const [subregion, setSubregion] = useState([]);


  const [fetchStatus, setFetchStatus] = useState('idle');

  const [selectContinent, setSelectContinent] = useState('');
  const [selectSubregion, setSelectSubregion] = useState('');
  const [population, setPopulation] = useState(false);
  const [area, setArea] = useState(false);
  const [alphabet, setAlphabet] = useState();

  const isLoading = fetchStatus === 'loading';

  useEffect(() => {
    async function fetchData() {
      try {
        setFetchStatus('loading');
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        setCountries(data);

        const continents = [...new Set(data.map(country => country.continents?.[0]))];
        setContinent(continents);
        const subregions = [...new Set(data.map(country => country.subregion))];
        setSubregion(subregions);

        setFetchStatus('idle');
      } catch (e) {
        setFetchStatus('error');
        console.log(e.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    
  })

  const filteredCountries = countries.filter(country => {
    const displayContinent = selectContinent ? country.continents?.[0] === selectContinent : true;
    const displaySubregion = selectSubregion ? country.subregion === selectSubregion : true;
    return displayContinent && displaySubregion;
  });
  
  const sortedCountries = alphabet
    ? [...filteredCountries].sort((a, b) => {
      const nameA = a.name?.common || '';
      const nameB = b.name?.common || '';
      return nameA.localeCompare(nameB);
    })
    : filteredCountries;
  
    const sortingFilter = sortedCountries.sort((a, b) => {
      if (population) {
        return b.population - a.population;
      }
      if (area) {
        return b.area - a.area;
      }
      return 0;
    });

  function handleContinentChange(e) {
    setSelectContinent(e.target.value);
  }

  function handleSubregionChange(e) {
    setSelectSubregion(e.target.value);
  }

  function handleAlphabeticalChange(e) {
    setAlphabet(e.target.checked);
  }

  function handlePopulationChange(e) {
    setPopulation(e.target.checked);
    setArea(false);
  }

  function handleAreaChange(e) {
    setArea(e.target.checked);
    setPopulation(false);
  }

  return (
    <>
    <div className="container">
        <h1>Countries of the World</h1>
        {isLoading && <p>Loading...</p>}
        {fetchStatus === 'error' && <p>Error loading data..</p>}
        <label>Filter & Sort</label>
        <form className="formContainer">
          <div className="alphabeticalContainer">
            <input type="checkbox" onChange={handleAlphabeticalChange} checked={alphabet}/>
            <p>Alphabetical</p>
          </div>
          <div className="topTenContainer">
            <p>Top 10</p>
            <div className="topTenFilter">
              <div>
                <div>
                  <input type="checkbox" onChange={handlePopulationChange} checked={population}/>
                  <p>by population</p>
                </div>
                <div>
                  <input type="checkbox" onChange={handleAreaChange} checked={area}/>
                  <p>by area</p>
                </div>
              </div>
            </div>
          </div>
          <div className="filter">
            <div className="filterContainer">
              <div className="continentContainer">
                <p>By Continent</p>
                <select onChange={handleContinentChange} value={selectContinent}>
                  <option value="">All</option>
                  {continent.map((cont, i) => (
                    <option key={i} value={cont}>{cont}</option>
                  ))}
                </select>
              </div>
              <div className="subregionContainer">
                <p>By Subregion</p>
                <select onChange={handleSubregionChange} value={selectSubregion}>
                  <option value="">All</option>
                  {subregion.map((sub, i) => (
                    <option key={i} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              </div>
          </div>
        </form>

        {filteredCountries.length === 0 ? (
          <p>N/A</p>
        ) : (
        <Countries countries={sortingFilter} isLoading={isLoading} />)}
      </div>
    </>
  );
}

