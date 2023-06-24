const fs = require('fs');

const { flightFakesCreator, flightsQueriesCreator } = require('./flight');
const { airlplanesFakeCreator, airplaneQueriesCreator } = require('./airplane');

async function booststrap() {
  let airplanes = [];
  let flights = [];
  for (let i = 0; i < 100; i++) {
    airplanes.push(airlplanesFakeCreator());
  };
  const filteredByLength = airplanes.filter(item => item.model.length <= 10);
  let { airplanesArrayLenght, airplanesQueries} = airplaneQueriesCreator(filteredByLength);

  for (let i = 0; i < 100; i++) {
    flights.push(await flightFakesCreator(airplanesArrayLenght));
  };
  const flightQueries = await flightsQueriesCreator(flights)

  fs.writeFileSync('airplanes.txt', airplanesQueries, 'utf-8');
  fs.writeFileSync('flights.txt', flightQueries, 'utf-8');
    console.log('running');
}

booststrap();