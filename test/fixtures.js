const EVENT_PROVIDER_ID = 20;

module.exports = {
    getEventProvider() {
        return {
            id: EVENT_PROVIDER_ID,
            name: "I am a Fixture",
            email: "fixture@example.com",
            password: "randomPassword123"
        };
    }
};
