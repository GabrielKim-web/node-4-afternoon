const swag = require('../models/swag');

module.exports = {
   add: (req, res) => {
      const {id} = req.params;
      const {user} = req.session;
      //searches index swag and returns a result named swag; why are they the same name?
      let index = swag.findIndex(swag => swag.id == id);
      if (index !== -1) {
         user.cart.push(swag[index]);
         user.total += swag[index].price;
      }
      res.status(200).send(user);
   },
   delete: (req, res) => {
      //basically the same as add method but delete instead
      const {id} = req.params;
      const {user} = req.session;

      //searches user cart for the item
      let index = user.cart.findIndex(swag => swag.id == id);

      if (index !== -1) {
         //subtracts price of that item from the total
         user.total -= user.cart[index].price;
         //then deletes it from the cart
         user.cart.splice(index, 1);
      }
      res.status(200).send(user);
   },
   checkout: (req, res) => {
      const {user} = req.session;
      user.cart = [];
      user.total = 0;
      res.status(200).json(user);
   }
}