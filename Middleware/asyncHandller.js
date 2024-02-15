const errorHandler = (err, req, res, next) => {
   //  console.error(err.stack);
    
    const error = err.message
    const stack = err.stack
  
     res.json({ 
        Message:error,
        Stack:stack
     })
  };
  
  module.exports = errorHandler;