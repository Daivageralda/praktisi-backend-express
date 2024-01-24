const response = (statusCode, data, message, res, token) => {
    // Default Payload
    const responseObject = {
      message: message,
      datas: data,
    };
  
    // Additional payload for user authorization
    if (token) {
      responseObject.token = token;
    }
    res.status(statusCode).json(responseObject);
  };
  
  module.exports = response;
  