const axios = require("axios");

async function sendGIF(msg, searchTerm){
    let GIF = await generateGIF(searchTerm);
    msg.reply(GIF);
}

async function generateGIF(searchTerm){
    const LIMIT = 15;
    const searchURL =
        searchTerm
            ?
            `https://g.tenor.com/v1/search?q=${searchTerm}&key=${process.env.TENOR_TOKEN}&limit=${LIMIT}`
            :
            `https://g.tenor.com/v1/search?key=${process.env.TENOR_TOKEN}&limit=${LIMIT}`;
    let response = await axios.get(searchURL);
    let gifIndex = Math.floor(Math.random() * response.data.results.length);
    return response.data.results[gifIndex].url;
}

module.exports = {
    sendGIF,
    generateGIF
}
