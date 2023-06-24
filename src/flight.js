const { faker } = require('@faker-js/faker');

const { getIataCodes } = require('./iata-codes');

const getRandomNumber = (arrayOrNmber) => {
  return (arrayOrNmber?.length) ? Math.floor(Math.random() * arrayOrNmber.length) + 1 : Math.floor(Math.random() * arrayOrNmber) + 1;
}

const flightFakesCreator = async (airplanesLength) => {
  const iataCodes = await getIataCodes();
  const randomOriginIndex = getRandomNumber(iataCodes);
  const randomDestinationIndex = getRandomNumber(iataCodes);
  const randomAirplaneId = getRandomNumber(airplanesLength);

  return {
    airplane: randomAirplaneId,
    origin: iataCodes[randomOriginIndex].Code,
    destination: iataCodes[randomDestinationIndex].Code,
    departure: faker.date.recent(),
    arrival: faker.date.recent(),
    flightMiles: faker.number.float({min: 5, max: 100000}),
  }
}

const flightsQueriesCreator = async (flights) => {
  let flightQueries = '';
  flights.map(flight => {
    let { airplane, origin, destination, departure, arrival, flightMiles } = flight;
    flightQueries += `insert into flight(airplane, origin, destination, departure, arrival, flightMiles) values("${airplane}","${origin}","${destination}","${departure}","${arrival}", ${flightMiles});`
  })

  return flightQueries;
}


module.exports = { flightFakesCreator, flightsQueriesCreator };