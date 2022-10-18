const express = require("express");
const router = express.Router();
const userModel = require("./user.model");

router.get("/", async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.send(users).status(200);
    } catch (err) {
        res.send(err).status(404);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await userModel.create(req.body);
        res.send("user created").status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/:idOrName", async (req, res) => {
    try {
        const idOrName = req.params.idOrName;
        const user = await userModel.getByIdOrName(idOrName);
        res.send(user).status(200);
    } 
    catch(err) {
        res.send(err).status(404);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        // TODO: name support
        const id = parseInt(req.params.id);
        await userModel.update(id, req.body);
        res.send("user updated").status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // TODO: name support
        const id = parseInt(req.params.id);
        await userModel.remove(id);
        res.send("user deleted").status(204);
    } catch(err) {
        res.send(err).status(404);
    }
});

module.exports = router;