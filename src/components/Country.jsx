import '../App.css';

export default function Country({ countries, isLoading}) {
    const DisplayData = () => {
        if (isLoading) return <p>Loading...</p>;

        return (
            <div className="countryContainer">
                {countries.map((country, i) => (
                    <div key={i} className="indContainer">
                        <div className="flagName">
                            <div className="flag">
                                <img 
                                    src={country.flags?.png}
                                    alt="country's flag"
                                />
                            </div>
                            <div className="commonName">
                                <h2>{country.name?.common}</h2>
                            </div>
                        </div>
                        <div className="countryInfo">
                            <ul>
                                <li><span>Official Name: </span>{country.name?.official}</li>
                                <li><span>Capital: </span>{country.capital?.[0] || 'None'}</li>
                                <li><span>Population: </span>{country.population?.toLocaleString()}</li>
                                <li><span>Languages:{' '} </span>{country.languages
                                    ? Object.values(country.languages).join(', ')
                                    : 'None'}</li> 
                                <li><span>Currency: {''} </span>{country.currencies
                                    ? Object.values(country.currencies).map((currency) => currency.name).join(', ')
                                    : 'None'}</li>
                                <li><span>Area &#40;mi²&#41;: </span>{country.area}</li>
                                <li><span>Subregion: </span>{country.subregion}</li>
                                <li><span>Continent: </span>{country.continents?.[0]}</li>
                            </ul>
                        </div>
                        <p className="googleMap">
                            <a href={`https://www.google.com/maps/search/${country.name?.common}`} target="_blank" rel="noopener noreferrer">Show on Google Maps</a>
                        </p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <div>
                <DisplayData />
            </div>
        </>
    );
}