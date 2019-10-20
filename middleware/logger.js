//First step for creating middleware, takes request, response, and next
const Logger = (req, res, next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

    //Always call next last so that you can use the next middleware function in the stack
    next();
};

module.exports = Logger;