const SlaveController = require("../../controller/slave.controller")
const slaveModel = require("../../model/slave.model")
const httpMocks = require("node-mocks-http")

slaveModel.create = jest.fn()

let req, res, next
// Mock the slaveModel methods correctly before each test
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;

    // Properly mock `find` and `findById` methods
    slaveModel.find = jest.fn();
    slaveModel.findById = jest.fn();
});


// slave.controller.js

describe('SlaveController.getAllSlaves tests', () => {
    it('should have a getAllSlaves function', () => {
        expect(typeof SlaveController.getAllSlaves).toBe('function');
    });

    it('should call slaveModel.find', async () => {
        await SlaveController.getAllSlaves(req, res, next);
        expect(slaveModel.find).toHaveBeenCalled();
    });

    it('should return 200 status code on success', async () => {
        slaveModel.find.mockResolvedValue([]);
        await SlaveController.getAllSlaves(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    it('should return JSON data from the database', async () => {
        const slaves = [{ id: 1, name: 'Adam' }];
        slaveModel.find.mockResolvedValue(slaves);

        await SlaveController.getAllSlaves(req, res, next);

        expect(res._getJSONData()).toEqual(slaves);
    });
});


describe('SlaveController.getSlaveById tests', () => {
    it('should have a getSlaveById function', () => {
        expect(typeof SlaveController.getSlaveById).toBe('function');
    });

    it('should call slaveModel.findById with the given ID', async () => {
        req.params.id = '123';
        await SlaveController.getSlaveById(req, res, next);
        expect(slaveModel.findById).toHaveBeenCalledWith('123');
    });

    it('should return 200 status code when a slave is found', async () => {
        req.params.id = '1';
        slaveModel.findById.mockResolvedValue({ id: 1 });

        await SlaveController.getSlaveById(req, res, next);

        expect(res.statusCode).toBe(200);
    });

    it('should return 404 when no slave is found', async () => {
        req.params.id = '999';
        slaveModel.findById.mockResolvedValue(null);

        await SlaveController.getSlaveById(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Nem található ilyen ID-jű rabszolga.' });

    });
});














