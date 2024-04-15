import { compileCPP,compileCPPWithInput,compilePython,compilePythonWithInput,compileJava,compileJavaWithInput,compileCS,compileCSWithInput,init} from "compilex";
import asyncHandler from "express-async-handler";



if(process.env.NODE_ENV === "dev"){
    init({stats: true})
}


const responseHandler = function(data,response){
    if(data.output){
        response.status(200).json(data)
    }
    else if(data.error){
        response.status(405).json(data)
    }
    else{
        response.status(400).json({error: "invalid code entered!"})
    }
}

const compiler = asyncHandler(
    async(req,res)=>{
        const programCode = req.body.programCode;
        const userInput = req.body.userInput;
        const language = req.body.language;

        const env_details = undefined

        if(userInput && process.env.NODE_ENV === "dev"){
            console.log("userInput : yes")

        }
        try{
            switch(language){
                case "python":
                    env_details = {OS: process.env.OS}

                    if(userInput){
                        compilePythonWithInput(env_details,programCode,userInput,(data)=>{
                            responseHandler(data,res)
                        })
                    }else{
                        compilePython(env_details,programCode,(data) => {
                            responseHandler(data,res)
                        })
                    }
                    break;
                case "c_cpp":
                    if(process.env.OS == "windows"){
                        env_details = {OS: process.env.OS, cmd:"g++", options:{timeout: 5000} }
                    }else{
                        env_details = {OS: process.env.OS, cmd: "gcc", options: {timeout:5000} }

                    }

                    if(inputs){
                        compileCPPWithInput(env_details,programCode,userInput,(data)=>{
                            responseHandler(data,res)
                        })
                    }else{
                        compileCPP(env_details,programCode,(data) => {
                            responseHandler(data,res)
                        })
                    }
                    break;
                default:
                    res.status(404).json({error:"unsupported language code provided "})
                    break;
            }
        }catch(error){
            res.status(404).json(error)
        }

    }
)

export { compiler }