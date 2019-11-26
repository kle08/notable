Back-end services

## Directions
1. Clone the rep on github
2. Run command 'npm install' in the terminal
3. Run command 'npm run start' or 'nodemon server/index.js' in the terminal
4. Use postman to see the http request being used on http://localhost:3000/ (http request endpoints)

###Get request for all doctors
visit http://localhost:3000/physicians/

###Get a list of all appointments for a particular doctor and particular day:
visit http://localhost:3000/physicians/appointments
body format:
```
{
	"physiciansId":1,
	"date":"11/11/19"
}
```
###Delete an existing appointment from a doctor's calendar
visit http://localhost:3000/physicians/appointments/:id

###Add a new appointment to a doctor's calendar
visit http://localhost:3000/physicians/appointments
body format:
```
{
   "physiciansId": 2,
   "patient": {
      "firstName": "Sterling",
      "lastName": "Archer"
   },
   "date": "11/11/19",
   "time": "08:00AM",
   "kind": "New Patient"
}
```


Thank you for letting me have this opportunity!

