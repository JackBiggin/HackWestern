/**
* A simple "hello world" function
* @param {string} placeid
*/

module.exports = async (placeid = 'ERROR') => {

    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyAP-eseNb45FAKy0B-CA4bdi8z3AE9DN1Y',
      Promise: Promise
  });


    let locationData = await googleMapsClient.place({
      placeid: placeid
    }).asPromise()

    locationData = locationData.json.result
    
    // setting up reviews array
    var reviews = []
    var i = 0
    for(var items in locationData.reviews){
      reviews.push({
        author: locationData.reviews[i].author_name,
        picture: locationData.reviews[i].profile_photo_url,
        rating: locationData.reviews[i].rating,
        comment: locationData.reviews[i].text
      })
      i++
    }
    // --------------------------
    // setting opening hours and closing hours arrays
    // 0 = Sunday ; 1 = Monday ...
    
    var openingHours = []
    var closingHours = []
    var days = 0
    
    for(var items in locationData.opening_hours.periods){
      day = locationData.opening_hours.periods[days],
      openingHours[day.open.day] = day.open.time
      closingHours[day.close.day] = day.close.time
      days++
    }
    
    
    placeData =  {
      name: locationData.name,
      address: locationData.adr_address,
      phone: locationData.international_phone_number,
      icon: locationData.icon,
      photo: "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + locationData.photos[0].photo_reference + "&sensor=false&maxheight=1280&maxwidth=720&key=AIzaSyAP-eseNb45FAKy0B-CA4bdi8z3AE9DN1Y",
      price: locationData.price_level,
      website: locationData.website,
      review: reviews,
      open_now: locationData.open_now,
      opening: openingHours,
      closing: closingHours
      
    }
    
    return placeData
  };
