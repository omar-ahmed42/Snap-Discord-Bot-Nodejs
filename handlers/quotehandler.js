const axios = require("axios");

async function generateQuote(){
    const url = `https://zenquotes.io/api/random/${process.env.ZENQUOTES_TOKEN}`;
    let response = await axios.get(url);
    console.log("RESPONSE: " + response.data[0].q);
    return response.data[0];
}

async function sendQuote(msg){
    let quote = await generateQuote();
    msg.reply(`${quote.q} \n-${quote.a}`);
}

module.exports = {
    sendQuote,
    generateQuote
}

