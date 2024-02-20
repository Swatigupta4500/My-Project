import { DevdEnvironment } from "./environment.dev";
import { ProdEnvironment } from "./environment.prod";


 export interface Environment{
    db_url: string
    SECRET_KEY: string
    SECRET_KEY_JWT:string
    Sendgrid_api_key?:string
    
    gmail_auth?:{
        user:string,
        Pass:string
    }
 };

export function getEnvironmentVariable(){
    if(process.env.NODE_ENV==='production'){
        return ProdEnvironment
    }
    return DevdEnvironment;
}