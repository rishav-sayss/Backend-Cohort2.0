import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app = express()
app.use(morgan("combined"));

app.get("/api/status/healthz",(req,res)=>{
    res.status(200).json({status:'ok'});
})

app.get("/api/status/readyz",(req,res)=>{
    res.status(200).json({status:'ready'});
})

app.use((req,res,next) => {
    
    const host = req.headers.host;
    const sandboxid = host.split(".")[0];
    const target =  `http://sandbox-service-${sandboxid}`

    return createProxyMiddleware({
        target,
        changeOrigin:true,
        ws:true,
    })(req,res,next);

})

export default app
