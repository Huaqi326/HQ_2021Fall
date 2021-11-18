import session from "./session";

const API_ROOT = 'http://localhost:3100/' ?? process.env.VUE_APP_API_ROOT;

export async function api(url, data = null, method = null){
    try{
        let response;

        if(data){
            response = await fetch(API_ROOT + url, {
                //method: method ?? "POST"
                //delete cors/redirect/refer sth.../
            })
        }else{
            response = await fetch(API_ROOT + url + "ff");
        }
        if(!response.ok) {
            throw await response.json();
        }
        return await response.json();
    }catch{
        session.Error(err);
    }
}