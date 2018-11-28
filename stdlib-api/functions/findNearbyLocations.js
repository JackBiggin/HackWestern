/**
* A simple "hello world" function
* @param {string} location
* @param {number} radius
* @param {string} searchType
*/

module.exports = async (location = 'ERROR', radius = 1500, searchType = 'restaurant') => {

    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyAP-eseNb45FAKy0B-CA4bdi8z3AE9DN1Y',
      Promise: Promise
  });

    let locationData = await googleMapsClient.findPlace({
      input: location,
      inputtype: 'textquery'
    }).asPromise()


    searchedPlaceId = locationData.json.candidates[0].place_id

    let locationCoords = await googleMapsClient.place({
      placeid: searchedPlaceId
    }).asPromise()

    searchCoords = locationCoords.json.result.geometry.location.lat + ',' + locationCoords.json.result.geometry.location.lng

    let nearbyPlaces = await googleMapsClient.placesNearby({
      location: searchCoords,
      radius: radius,
      type: searchType
    }).asPromise()

    places = []

    var i = 0
    for(var location in nearbyPlaces.json.results) {
      places.push({
        name: nearbyPlaces.json.results[i].name,
        photo: "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + nearbyPlaces.json.results[i].photos[0].photo_reference + "&sensor=false&maxheight=1280&maxwidth=720&key=AIzaSyAP-eseNb45FAKy0B-CA4bdi8z3AE9DN1Y",
        place_id: nearbyPlaces.json.results[i].place_id,
        rating: nearbyPlaces.json.results[i].rating,
        icon: nearbyPlaces.json.results[i].icon,
        address: nearbyPlaces.json.results[i].vicinity
      });

      i++;
    }

    return places

};
