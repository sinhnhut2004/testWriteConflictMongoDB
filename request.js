const axios = require('axios');

let one = "http://localhost:3000/user";
let two = "http://localhost:3000/user";

const requestOne = axios.get(one);
const requestTwo = axios.get(two);

axios
  .all([requestOne, requestTwo])
  .then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      // use/access the results
      console.log(responseOne, responseTwo);
    })
  )
  .catch(errors => {
    console.error(errors);
  });
