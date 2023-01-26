import "./countries.css";
import { useState } from "preact/hooks";
import Dropdown from "./dropdown";

type CardProps = {
  country: Country;
};

const Card = ({ country }: CardProps) => {
  return (
    <a href={`/${country.name.common}`} aria-label={country.name.common}>
      <article class='card'>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <div class='flow'>
          <h3>{country.name.common}</h3>
          <p>
            <strong>Population:</strong> {country.population}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
        </div>
      </article>
    </a>
  );
};

type CountriesProps = {
  countries: Country[];
};

export default function Countries({ countries }: CountriesProps) {
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("");

  const filteredCountries = countries.filter(country => {
    if (option.length > 0) {
      return (
        country.region.toLowerCase().includes(option.toLowerCase()) &&
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    }
  });

  return (
    <>
      <section class='region flex-between'>
        <form class='search-box'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            aria-hidden={true}
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            ></path>
          </svg>
          <input
            type='text'
            id='search-box'
            name='search-box'
            placeholder='Search for a country...'
            value={query}
            onInput={e => setQuery(e.currentTarget.value)}
          />
        </form>

        <Dropdown option={option} setOption={setOption} />
      </section>

      <section class='region auto-grid'>
        {filteredCountries.map(country => (
          <Card country={country} />
        ))}
      </section>
    </>
  );
}
