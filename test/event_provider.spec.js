const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const fixtures = require("./fixtures");
const eventProviderModel = require("../src/event_provider/event_provider.model");
const EVENT_PROVIDER_TABLE = eventProviderModel.EVENT_PROVIDER_TABLE;

describe("event provider", () => {
    let eventProviderFixture;

    before(async () => {
      eventProviderFixture = fixtures.getEventProvider();
      await knex(EVENT_PROVIDER_TABLE)
            .insert(eventProviderFixture)
            .returning("id")
            .then(result => {
              console.log("inserted test eventProvider");
            })
            .catch(console.error);
    });
  
    after(async () => {
      await knex(EVENT_PROVIDER_TABLE)
        .where("id", eventProviderFixture.id)
        .returning("id")
        .del()
        .then(result => {
          console.log("removed test eventProvider");
        })
        .catch(console.error);
    });
  
    describe("setup", () => {
      it("should connect to database", () => {
         knex
          .raw("select 1 as result")
          .catch(() => {
            assert.fail("unable to connect to database");
          });
      });
  
      it("has run the initial migration", () => {
        knex(EVENT_PROVIDER_TABLE)
          .select()
          .catch(() => assert.fail("eventProvider table is not found."));
      });
    });

    describe("getAll", () => {
        it("should return an array of event providers", async () => {
            const eventProviders = await eventProviderModel.getAll();
            expect(eventProviders).to.be.an.instanceOf(Array);
        });

        it("should accept a limit argument", async () => {
            const eventProviders = await eventProviderModel.getAll(3);
            expect(eventProviders.length).to.be.at.most(3);
        });
    });

    describe("getByIdOrName", () => {
        describe("when eventProvider exists", () => {
          it("should get eventProvider by id", async () => {
            const eventProvider = await eventProviderModel.getByIdOrName(eventProviderFixture.id);
            expect(eventProvider).to.exist;
            expect(eventProvider.id).to.eq(eventProviderFixture.id);
          });

          it("should get eventProvider by name", async () => {
            const eventProvider = await eventProviderModel.getByIdOrName(eventProviderFixture.name);
            console.log(eventProvider);
            expect(eventProvider).to.exist;
            expect(eventProvider.id).to.eq(eventProviderFixture.id);
          });
        });
    
        describe("when eventProvider doesn't exist", () => {
          it("should return undefined", async () => {
            const eventProvider = await eventProviderModel.getByIdOrName(45000);
            expect(eventProvider).to.be.undefined;
          });
        });
    });

    describe("create", () => {
        const newId = 9999;
    
        after(async () => {
          await knex.from(EVENT_PROVIDER_TABLE)
            .where("id", newId)
            .del()
            .catch(console.error);
    
          console.log("Deleted test eventProvider");
        });
    
        describe("with valid properties", () => {
          it("should be able to create a new eventProvider", async () => {
            const newEventProvider = {
              id: newId, // TODO
              name: 'Fake Event Provider',
              email: 'test@example.com',
              password: 'testing123'
            };
    
            const id = await eventProviderModel.create(newEventProvider);
            const eventProvider = await knex(EVENT_PROVIDER_TABLE)
                  .select()
                  .where("id", newId)
                  .first();
            expect(eventProvider).to.exist;
            expect(eventProvider.id).to.eq(newId);
          });
        });
    
        describe("with invalid parameters", () => {
          it("should throw an error", () => {
            assert.throws(() => {
              eventProviderModel.create({
                bad_param: "HELLO!"
              });
            }, "Invalid field: bad_param");
          });
        });
      });

      describe("update", () => {
        it("should return the id", async () => {
          const id = await eventProviderModel.update(eventProviderFixture.id, {
            name: "A new and improved name"
          });
          expect(id).to.eq(eventProviderFixture.id);
        });
    
        it("should update the eventProvider", async () => {
          const eventProvider = await eventProviderModel.getByIdOrName(eventProviderFixture.id);
          expect(eventProvider.name).to.eq("A new and improved name");
        });
      });

      describe("remove", () => {    
        it("should remove the eventProvider", async () => {
            const newProvider = {
                id: 3000,
                name: "remove tester",
                email: "removetester@example.com",
                password: "unsafepassword"
            };

            await eventProviderModel.create(newProvider);
            await eventProviderModel.remove(newProvider.id);

            const providerFromDB = await eventProviderModel.getByIdOrName(newProvider.id);

            expect(providerFromDB).to.be.undefined;
        });
    });
});