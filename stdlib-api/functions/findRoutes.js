/**
* A simple "hello world" function
* @param {string} startPlaceID
* @param {string} endPlaceID
* @param {string} travelType
*/

module.exports = async (startPlaceID = 'ERROR', endPlaceID = 'ERROR', travelType = 'ERROR') => {

    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyAP-eseNb45FAKy0B-CA4bdi8z3AE9DN1Y',
      Promise: Promise
  });

    // Get the origin info for lat, long
    let originData = await googleMapsClient.place({
        placeid: startPlaceID
    }).asPromise()
    // Get the destination info for lat, long
    let destinationData = await googleMapsClient.place({
        placeid: endPlaceID
    }).asPromise()
    
    // Make the correct format for both origin and destination into "lat,long"
    originData = originData.json.result.geometry.location.lat + ',' + originData.json.result.geometry.location.lng 
    destinationData = destinationData.json.result.geometry.location.lat + ',' + destinationData.json.result.geometry.location.lng 
    
    let routeData = await googleMapsClient.directions({
        origin: originData,
        destination: destinationData,
        mode: travelType
    }).asPromise()
    
    routeData = routeData.json.routes[0].legs[0]
    
    directionData = {
        startingPoint: routeData.start_address,
        destinationPoint: routeData.end_address,
        distance: routeData.distance.text,
        duration: routeData.duration.text
    }
    
    return directionData  
  };
