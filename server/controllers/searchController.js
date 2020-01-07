const swag = require('../models/swag');

module.exports = {
   search: (req, res) => {
      //check for category from request.query
      const {category} = req.query
      if (category) {
         //if category exists, filter swag by that category (i.e, each one has its own swag property)
         const filteredSwag = swag.filter(swag => swag.category === category);
         // res.status(200).json(filteredSwag);
         res.status(200).send(filteredSwag);
      } else {
         res.status(200).json(swag);
      }
   }
}