import { DevdEnvironment } from "./environment.dev";
import { ProdEnvironment } from "./environment.prod";


 export interface Environment{
    db_url: string
    SECRET_KEY: string
 };

export function getEnvironmentVariable(){
    if(process.env.NODE_ENV==='production'){
        return ProdEnvironment
    }
    return DevdEnvironment;
}