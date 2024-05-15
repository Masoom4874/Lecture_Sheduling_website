import {getToken} from "./tokenservice"
export class HttpService{

   constructor(){}

   static async post(url,body) {
    try {
        const response  = await fetch(url,{
            method:'GET',
            body :JSON.stringify(body),
            headers:{
                "Content-Type": "application/json",
                // "Authorization" : `Bearer ${getToken()}`
            }   
        })
        return  response.json();
        
    } catch (error) {
         throw error;
    }
   }

   static async get(url) {
    try {
        const response  = await fetch(url,{
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${getToken()}`
            }
        })
        return response;
        
    } catch (error) {

         throw error;
        
    }
   
    
   }

}