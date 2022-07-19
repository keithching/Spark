const eventProviderModel = require("./event_provider.model");

module.exports = {
    async getAll(req, res) {
        const eventProviders = await eventProviderModel.getAll();
        res.send(eventProviders).status(200);
    }
}