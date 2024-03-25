import { CustomAPIError } from "../errors/custom-error.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if(err instanceof CustomAPIError){
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err });
}


export default errorHandlerMiddleware;