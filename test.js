const fetch = require('node-fetch');


function getData(limit) {
    let finalArray = [];
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
    console.log(url);
    let settings = { method: "Get" };
    fetch(url, settings)
        .then(res => res.json())
        .then((mainJson) => {
            // do something with JSON
            let i = -1;
            let next = () => {
                i++;
                if (i < limit) {
                    let url = mainJson.results[i].url;
                    let settings = { method: "Get" };
                    fetch(url, settings)
                        .then(res => res.json())
                        .then((Json) => {
                            let currentObj = { sprites: {} }
                            let {
                                name,
                                abilities,
                                id,
                                types,
                                height,
                                weight,
                                sprites,
                            } = Json

                            currentObj.name = name;
                            currentObj.abilities = abilities;
                            currentObj.id = id;
                            currentObj.types = types;
                            currentObj.height = height;
                            currentObj.weight = weight;
                            currentObj.sprites.back_default = sprites.back_default
                            currentObj.sprites.front_default = sprites.front_default
                            currentObj.back_default = sprites.back_default;
                            currentObj.front_default = sprites.front_default;
                            finalArray.push(currentObj)
                            next();
                        });
                } else {
                    //  here..
                    console.log("final array:", finalArray);
                    // 
                }
            }
            next();
        });

}

getData(4);