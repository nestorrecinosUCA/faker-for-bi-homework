const { faker } = require('@faker-js/faker');

const airlplanesFakeCreator = () => {
  return {
    code: faker.string.nanoid(6).toUpperCase(),
    model: faker.airline.airplane().name.split(' ').shift(),
    year: faker.number.int({min: 1970, max:2023})
  }
};

const airplaneQueriesCreator = (filteredByLength) => {
  let airplanesQueries = '';

const airplanesSearch = filteredByLength.reduce((acc, airplane) => {
  acc[airplane.model] = ++acc[airplane.model] || 1;
  return acc;
}, {});

const filteredAirplanesArray = Object.keys(airplanesSearch).reduce((acc, model) => {
  const airplaneObjects = filteredByLength.filter(airplane => airplane.model === model);
  if (airplaneObjects.length > 1) {
    acc.push(airplaneObjects[0]);
  } else {
    acc.push(...airplaneObjects);
  }
  return acc;
}, []);

  const airplainsArrayLength = filteredAirplanesArray.length;
  for (let i = 0; i < airplainsArrayLength; i++) {
    const { code, model, year } = filteredAirplanesArray[i];
    airplanesQueries += `insert into Airplane(code,model,year) values("${code}", "${model}", ${year});\n`;
  }
  return {airplanesQueries, arrayLength: airplainsArrayLength };
}

module.exports = { airlplanesFakeCreator, airplaneQueriesCreator };