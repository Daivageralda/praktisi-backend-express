const logMiddleware = (req,res,next) => {
    console.log(`[${new Date().toISOString()}] Recieved ${req.method} request at ${req.url}`);
    next();
}

module.exports = logMiddleware;