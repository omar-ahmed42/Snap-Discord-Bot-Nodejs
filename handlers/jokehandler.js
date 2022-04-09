const axios = require("axios");

async function generateJoke(searchTerm){
    var url;
    var joke;
    if (searchTerm.length === 0){
        url = "https://api.chucknorris.io/jokes/random"
        let response = await axios.get(url);
        joke = response.data.value;
    } else{
        url = `https://api.chucknorris.io/jokes/search?query=${searchTerm}`
        let response = await axios.get(url);
        let jokeIndex = Math.floor(Math.random() * response.data.total);
        joke = Object.keys(response.data.result).length !== 0 ? response.data.result[jokeIndex].value : 'No joke was found, please try a different keyword';
    }

    return joke;
}

async function sendJoke(msg, searchTerm){
    let joke = await generateJoke(searchTerm);
    msg.reply(`${joke}`);
}

module.exports = {
    sendJoke,
    generateJoke
}
