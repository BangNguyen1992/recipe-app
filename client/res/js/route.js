var request = new Request('http://www.sodexo.fi/ruokalistat/output/daily_json/5875/2017/03/10/fi', {
  method: 'GET',
  mode: 'no-cors',
  redirect: 'follow',
  headers: new Headers({
    'Content-Type': 'text/plain'
  })
});
// Now use it!
function testFunction() {
  fetch('http://www.sodexo.fi/ruokalistat/output/daily_json/5875/2017/03/10/fi', {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      // redirect: 'follow',
      headers: {

        'Access-Control-Request-Method': 'GET',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data.json())
      return data.json();
    })
    .then(result => {
      console.log("result is", result);
    })
    .catch((err) => {
      console.log(err)
    })
}
// testFunction();