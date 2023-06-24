const xlsx = require('xlsx');

const getIataCodes = async () => {
  const streamData = xlsx.readFile('./data/IATA-Codes.csv', {type: 'string'});
  const data = streamData.Sheets[streamData.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(data, { header: 1 });
  const properties = jsonData.shift();
  const jsonMapped = jsonData.map(item => {
    return {
      [properties[0]]: item[0],
      [properties[1]]: item[1],
      [properties[2]]: item[2],
    }
  });
  return jsonMapped;
};

module.exports = { getIataCodes };
