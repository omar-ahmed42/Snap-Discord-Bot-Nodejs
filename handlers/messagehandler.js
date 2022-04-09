async function deleteMessages(channel, size){
    size = parseInt(size);
    await channel.bulkDelete(size + 1);
}

module.exports = {
    deleteMessages
}
