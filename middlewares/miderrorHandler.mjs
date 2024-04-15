const middlewareInternalError = (err,req,res,next)=>{

    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({error:err.message, stack: process.env.NODE_ENV === "dev" ? err.Stack : null})
    
    console.log("error middleware");
}

export {middlewareInternalError}