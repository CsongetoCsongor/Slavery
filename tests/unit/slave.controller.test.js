const SlaveController = require("../../controller/slave.controller")
const slaveModel = require("../../model/slave.model")
const SlaveModel = require("../../model/slave.model")
const httpMocks = require("node-mocks-http")

slaveModel.create = jest.fn()

let req, res, next
beforeEach(() => {
    req = httpMock.createRequest()
    res = httpMocks.createResponse()
    next = null
})

// slave.controller.js

const slaveModel = require("../model/slave.model");

module.exports = {
    getAllSlaves: async (req, res, next) => {
        try {
            const slaves = await slaveModel.find(); // Assuming `find()` fetches all slaves
            res.status(200).json(slaves);
        } catch (err) {
            next(err);
        }
    },

    getSlaveById: async (req, res, next) => {
        try {
            const slave = await slaveModel.findById(req.params.id); // Assuming `findById()` finds a slave by ID
            if (!slave) {
                return res.status(404).json({ message: "Slave not found" });
            }
            res.status(200).json(slave);
        } catch (err) {
            next(err);
        }
    }
};













