// it is a middleware, that is, it is a simple function that is performed between any two process
// for example if we try to login, rather than directly giving access to the account checking if the log in and passwords are right or not 

// above was the description of a middleware
// here we are creating a middleware which wraps our normal function in an try-catch block and also makes it asynchronous 
// thus we can say we are creating a higher order function here
// what is higher order function? So it is a function that accepts a function as an argument


const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).
    catch((error)=>next(error))
  }
}
export { asyncHandler };


// const asyncHandler = () => {}
// const asyncHandler = (fn) => {async() => {}}
// const asyncHandler = (fn) => async() => {}

// in this way we wrap a fn in a try-catch block and make it async above promise code is written  

// const asyncHandler = (fn) => async(req,res,next) => {
//   try {
//     await fn(req,res,next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message, 
//     })
//   }
// }