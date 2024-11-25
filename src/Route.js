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
                    console.log(await result.json());
                    resolve(result.json);
                }).catch(failure);
            }
        });        
    }


    route(coord1, coord2, vehicle) {

    }

}