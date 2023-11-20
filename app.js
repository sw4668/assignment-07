const express = require('express');
const app = express();
const port = 3000;

// in middleware, the order matters...
// check the hour first!
app.use(workingHours);
// serving our static files like always
app.use(express.static('public'));

app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
});

// our custom middleware function
function workingHours(req, res, next) {

  // get the current time
  const currentTime = new Date();
  // get the hour
  const currentHour = currentTime.getHours();

  // hour
  const openHour = 2;
  const closeHour = 3;

  // day 
  const currentDay = currentTime.getDay(); 

  //const normalBusinessHours = {
    // 24 hour time
   // open: 2,
   // close: 3,
 // };

  const openDays = [0, 2, 3]; // Sunday, Tuesday, Wednesday
  
  const isOpenDay = openDays.includes(currentDay);

  // check if within normal business hours
  if (
    //currentHour >= normalBusinessHours.open &&
    //currentHour <= normalBusinessHours.close
    isOpenDay && currentHour >= openHour && currentHour < closeHour
  ) {

    // if so, point the request to our static files
    console.log('Open!');
    req.url = 'chauncey-gardiner-resume.pdf';
    next();

  } else {
    
    // otherwise, return the denial
    console.log('Closed 🔒');
    req.url = 'denied.html';
    next();

  }
}
