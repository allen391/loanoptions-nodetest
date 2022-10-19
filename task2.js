const url = 'https://api.publicapis.org/entries';
const https = require('https');

const [category, limit] = process.argv.slice(2);

let data = '';
const request = https.get(url, (response) => {
  response.setEncoding('utf8');

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end',  () => {
    const result = JSON.parse(data);
    //get the values of 'API' decreasing alphabetically
    const { entries } = result;
    // sort the array with the alphabetically
    entries.sort((a, b) => b.API.localeCompare(a.API));
    // print the value of 'API'
    entries.map((item) => {
      console.log(item.API);
    });

    //find the matching category in the array
    const filteredEntries = entries.filter((item) => item.Category === category);
    //if nothing matched
    if (filteredEntries.length === 0) {
      console.log('No results');
      return;
    }
    //get the limit number of items if exist
    const finalResult = filteredEntries.slice(0, limit);
    finalResult.map(item => console.log(item));
  });
});

request.end();
