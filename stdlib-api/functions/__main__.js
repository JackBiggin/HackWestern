/**
* A simple "hello world" function
*/

// You should import node package
const googleMaps = require('@google/maps');

module.exports = async (location = 'london, ontario') => {
  // Fetch geo data from googleMaps.
  
  return `This is searching for ${location} on google maps`;
};