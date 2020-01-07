module.exports = {
   checkSession: (req, res, next) => {
      const {session} = req;
      //does req.session.user exist?
      if (!session.user) {
         //creates one if it doesn't exist
         session.user = {username: '', cart: [], total: 0};
      }
      
      //request now can reach the endpoint 
      next();
   }
}