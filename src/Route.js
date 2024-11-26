import fetch from "node-fetch";

export default class Route {

    static get API_KEY() {return "ac08a4ec270c4f59826a0b899c53a655"}
    static get COORD_37E() {return [47.43884406514186, 0.6852362850402961];}

    async getCoord(address) {
        return new Promise((resolve, failure)=> {
            if (address.indexOf("37e Parall") === 0) {
                resolve(Route.COORD_37E);
            }
            else {                
                let url = "https://api.geoapify.com/v1/geocode/search?text="+address+"&format=json&apiKey="+Route.API_KEY;        
                fetch(url).then(async result=>{
                    let json = await result.json();                    
                    resolve([json['results'][0]['lat'], json['results'][0]['lon']]);
                }).catch(failure);
            }
        });        
    }


    /**
{
  results: [
    {
      country_code: 'fr',
      housenumber: '6',
      street: 'Rue Du Lieutenant Maurice Henrion',
      country: 'France',
      county: 'Indre-et-Loire',
      datasource: [Object],
      postcode: '37550',
      state: 'Centre',
      district: 'Saint-Avertin',
      city: 'Saint-Avertin',
      lon: 0.740032,
      lat: 47.357327,
      result_type: 'building',
      formatted: '6 Rue Du Lieutenant Maurice Henrion, 37550 Saint-Avertin, France',
      address_line1: '6 Rue Du Lieutenant Maurice Henrion',
      address_line2: '37550 Saint-Avertin, France',
      department_COG: '37',
      timezone: [Object],
      plus_code: '8FV29P4R+W2',
      plus_code_short: '4R+W2 Saint-Avertin, Indre-et-Loire, France',
      rank: [Object],
      place_id: '5186cabf9657aee73f59287d21e4bcad4740c00203e203476f70656e6164647265737365733a616464726573733a66722f636f756e747279776964652d6164647265737365732d636f756e7472793a66656530316661396230376462633439'
    }
  ],
  query: {
    text: '6 rue du lieutenant Maurice Henrion, 37550 Saint Avertin',
    parsed: {
      housenumber: '6',
      street: 'rue du lieutenant maurice henrion',
      postcode: '37550',
      city: 'saint avertin',
      expected_type: 'building'
    }
  }
}


     */

    calculateRoute(coord1, coord2, vehicle) {        
        return new Promise((resolve, failure)=> {
            let url = "https://api.geoapify.com/v1/routing?waypoints="+coord1[0]+","+coord1[1]+"|"+coord2[0]+","+coord2[1]+"&mode="+vehicle+"&format=json&apiKey="+Route.API_KEY;    
            fetch(url).then(async result=>{
                let json = await result.json();                    
                let distance = Math.round(json['results'][0]['distance']/1000);
                let duree = Math.round(json['results'][0]['time']/60);
                resolve({"distance":distance,"duree":duree});
            }).catch(failure);    
        });

    }

    /*
    {
  results: [
    {
      mode: 'drive',
      waypoints: [Array],
      units: 'metric',
      distance: 14293,
      distance_units: 'meters',
      time: 919.001,
      legs: [Array],
      geometry: [Array]
    }
  ],
  properties: { mode: 'drive', waypoints: [ [Object], [Object] ], units: 'metric' }
}
*/

}