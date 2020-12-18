const server_endpoint = "http://localhost:8080/api/"


export async function createGame(gameParams) {

    const response = await fetch(server_endpoint + "/game", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameParams)
    });
    return await response.json();
}

export async function getGame(gameid){


    const response = await fetch(server_endpoint + "/game/"+gameid, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export async function updateGame(updateParams){

    const response = await fetch(server_endpoint + "/game", {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateParams)
    });
    return await response.json();
}
