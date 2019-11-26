const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let { physiciansList, physiciansApt } = require('../exampleData');

app.use(bodyParser());
app.use(express.json());

app.get('/physicians', function (req, res) {
  res.send(physiciansList);
});

app.get('/physicians/appointments', function (req, res) {
  const appt = physiciansApt.filter(app => {
    return app.physiciansId === req.body.physiciansId && app.date === req.body.date;
  })
  res.send(appt);
});

app.delete('/physicians/appointments/:aptID', function (req, res) {
  const remainsApt = physiciansApt.filter(apt => {
    return apt.aptID != req.params.aptID;
  });
  physiciansApt = remainsApt;
  res.send(physiciansApt);
});

app.post('/physicians/appointments', function (req, res) {
  const physiciansId = req.body.physiciansId;
  const time = req.body.time;
  const date = req.body.date;
  let maxID = -Infinity;
  for (apt of physiciansApt) {
    maxID = Math.max(apt.aptID, maxID);
  }
  let availableID = maxID + 1;

  let min = time.substr(3, 2);
  min = parseInt(min);
  if (min % 15 !== 0) {
    res.send('Appointment must be in intervals of 15 mins');
  }
  const scheduleCheck = physiciansApt.filter(apt => {
    return apt.physiciansId == physiciansId && apt.time == time && apt.date == date;
  });
  if (scheduleCheck.length >= 3) {
    res.send('Doctors is full at this time');
  } else {
    physiciansApt.push({
      physiciansId,
      aptID: availableID,
      patient: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      },
      date,
      time,
      kind: req.body.kind
    })
  }
  res.send(physiciansApt);
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});