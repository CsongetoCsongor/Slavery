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












