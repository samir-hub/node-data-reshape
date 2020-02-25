var http = require("http");
var fetch = require("node-fetch");

async function fetchJsonData() {
  const URI = "https://rendering.house/bucket/2020-02-18-allClients.json";
  const response = await fetch(URI);
  const data = await response.json();
  return data;
}

const server = http.createServer().listen(8080);
server.on("request", async (req, res) => {
  console.log("Got request for:", req.url);
  const jsonData = await fetchJsonData();

  let newData = jsonData.data.allClients[0].communities[0].cityLocationcityLocation;


  // The URL in the built-in browser can also be opened externally, which will
  // allow you to use your browser's Devtools.
  //
  // You can browse the API JSON data externally as well. We recommend Firefox for
  // navigating the JSON data.
  //
  // Task 1 (100%): Take the JSON data in this "jsonData" object, and reshape it so that
  // communities are grouped by common cities.
  //
  // The intial JSON data has a shape like this:
  //
  // {
  // "data": {
  //   "allClients": [
  //     {
  //       "id": 71,
  //       "name": "Alvarez Construction",
  //       "altName": "alvarezconstruction",
  //       "directoryName": "alvarezconstruction",
  //       "logo": "unnamed_36de01a7b927d160.jpg",
  //       "communities": [
  //         {
  //           "id": 2,
  //           "name": "All Plans",
  //           "bonafide": false,
  //           "clientName": "alvarezconstruction",
  //           "latitude": 30.635264,
  //           "longitude": -91.194246,
  //           "logo": null,
  //           "thumb": null,
  //           "plans": [
  //             <-- snip -->
  //           ],
  //           "cityLocation": {
  //             "id": 14718,
  //             "name": "Baton Rouge",
  //             "lat": 30.3633,
  //             "lon": -91.0919,
  //             "stateCode": "LA",
  //             "zip": "70810",
  //             "metroName": "Baton Rouge",
  //             "__typename": "CityInfo"
  //           },
  //           "__typename": "Community"
  //         }
  //       ],
  //       "__typename": "Client"
  //     },
  //  <-- snip -->
  //
  //
  // The resulting JSON should have this shape:
  // {
  //   "data": {
  //     "cities": [
  //       {
  //         "id": 14718,
  //         "name": "Baton Rouge",
  //         "lat": 30.3633,
  //         "lon": -91.0919,
  //         "stateCode": "LA",
  //         "zip": "70810",
  //         "metroName": "Baton Rouge",
  //         "__typename": "CityInfo",
  //         "communities": [
  //           {
  //             "id": 2,
  //             "name": "All Plans",
  //             "bonafide": false,
  //             "clientName": "alvarezconstruction",
  //             "latitude": 30.635264,
  //             "longitude": -91.194246,
  //             "logo": null,
  //             "thumb": null,
  //             " plans": [...]
  //           }
  //         ],
  //       },
  //     ],
  //   }
  // }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(newData, null, 2));
});
