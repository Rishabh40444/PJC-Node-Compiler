import asyncHandler from "express-async-handler"
const indexPage = asyncHandler(
    async(req,res)=>{
        try{
            res.status(200).render("index")
        }catch(error){
            res.status(500).json(error)
        }
    }
)
export { indexPage }