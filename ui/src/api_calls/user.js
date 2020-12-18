import Cookies from "js-cookie";
const server_endpoint = "http://localhost:8080/api"


export async function login(username){


    const response = await fetch(server_endpoint + "/login/"+username, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export async function handle_login(username){

    let returnValue = undefined;

    return await login(username).then(data=>{
        if(data["response_status"] === "OK"){
            Cookies.set("username", data["user_details"]["username"]);
            returnValue = {loggedIn: true, response: data["response"]};
            return returnValue;
        }else{
            returnValue = {loggedIn: false, response: data["response"]};
            return returnValue;
        }
    });
}

export async function signup(username){


    const response = await fetch(server_endpoint + "/signup/"+username, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export function handle_signup(username){
    signup(username).then(data=>{
        alert(JSON.stringify(data));
    });
}
