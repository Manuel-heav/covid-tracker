import {useState,useEffect} from 'react';
import './App.css';
import {FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core'
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import { sortData } from './util'
import LineGraph from './LineGraph'


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData ] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json()
    .then(data => {
      setCountryInfo(data)
    }))
  }, [])

  // UseEffect
  useEffect(()=>{
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));


          const sortedData = sortData(data)
          setTableData(sortedData);
          setCountries(countries)
      })
    }

    console.log(tableData)
    getCountriesData();
  }, [])


  const onCountryChange = async (e)=>{
      const countryCode = e.target.value;
      const url = countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
      await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data);
      })
    }
    // console.log(countryInfo)
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>CSniffer Dashboard</h1>
        <FormControl className="app__dropdown">
            <Select variants="outlined" value={country} onChange={onCountryChange}>


              {/* Loop through the dropdown */}
              
          <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
        </FormControl>
      </div>
     
     {/* Title + select input field */}
              <div className="app__stats">
                  <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
                  <InfoBox title="Recovered"total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
                  <InfoBox title="Deaths"total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
              </div>

      {/* table */}
      {/* Graph */}

      {/* Map */}
      <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
              {/* Table */}
              <Table countries={tableData}/>
              <h3>Worldwide New cases</h3>
              {/* Graph */}

              <LineGraph />
          </CardContent>
      </Card>
    </div>
  );
}

export default App;
