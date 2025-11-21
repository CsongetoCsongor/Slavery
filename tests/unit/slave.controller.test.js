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

    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = null
})

jest.mock("../../model/slave.model");  // Mock the slave model

describe('SlaveController.createSlave tests', () => {
    it('should have a createSlave function', () => {
        expect(typeof SlaveController.createSlave).toBe('function');
    });

    it('should call slave.save() with the correct data', async () => {
        const newSlave = {
            name: 'John',
            age: 25,
            origin: 'Africa',
            masterId: 'master123', // Required field
            _id: 'slave123'
        };

        req.body = newSlave;

        // Mocking the slaveModel constructor and the save method on the returned instance
        const saveMock = jest.fn().mockResolvedValue({ id: 'slave123', ...newSlave });

        // Mock the model to return an object with the save method mocked
        slaveModel.mockImplementationOnce(() => {
            return { save: saveMock };  // Return an object with mocked save() method
        });

        await SlaveController.createSlave(req, res, next);

        // Ensure save() was called
        expect(saveMock).toHaveBeenCalled();  // Check that save was called

        // Ensure correct data was passed to save (i.e., the data from req.body)
        expect(saveMock).toHaveBeenCalledWith();  // No arguments passed, check if it's called with correct data

        // Verifying that the response is correct
        expect(res.statusCode).toBe(201);  // Expect status code 201 (Created)
        expect(res._getJSONData()).toEqual({ id: 'slave123', ...newSlave });  // Expect the returned slave data
    });

    it('should return 201 status code when slave is created successfully', async () => {
        const newSlave = {
            name: 'John',
            age: 25,
            origin: 'Africa',
            masterId: 'master123',  // Required field
            _id: 'slave123'
        };

        req.body = newSlave;

        // Mock the slaveModel constructor and the save method on the returned instance
        const saveMock = jest.fn().mockResolvedValue({ id: 'slave123', ...newSlave });
        slaveModel.mockImplementationOnce(() => {
            return { save: saveMock };  // Mocked instance with save method
        });

        await SlaveController.createSlave(req, res, next);

        expect(res.statusCode).toBe(201);  // Status code should be 201 for successful creation
        expect(res._getJSONData()).toEqual({ id: 'slave123', ...newSlave });  // Check returned slave data
    });

    it('should return 400 status code if required fields are missing', async () => {
        const invalidSlave = { name: 'John', age: 25 };  // Missing required fields (e.g., masterId, _id)

        req.body = invalidSlave;
        
        // Mocking validation error from save()
        const error = new Error('slave validation failed: _id: Path `_id` is required., masterId: Path `masterId` is required.');
        slaveModel.mockImplementationOnce(() => {
            return { save: jest.fn().mockRejectedValue(error) };  // Mock rejected promise for save()
        });

        await SlaveController.createSlave(req, res, next);

        expect(res.statusCode).toBe(400);  // 400 status code for bad request
        expect(res._getJSONData()).toEqual({ message: 'slave validation failed: _id: Path `_id` is required., masterId: Path `masterId` is required.' });
    });
});

describe('SlaveController.updateSlave tests', () => {

    it('should have an updateSlave function', () => {
        expect(typeof SlaveController.updateSlave).toBe('function');
    });

    it('should call slaveModel.findByIdAndUpdate with the correct data', async () => {
        const updatedSlave = { id: '1', name: 'Adam', age: 30, origin: 'Africa' };
        req.params.id = '1';
        req.body = updatedSlave;

        // Mock the findByIdAndUpdate to return a successful update
        slaveModel.findByIdAndUpdate.mockResolvedValue(updatedSlave);

        await SlaveController.updateSlave(req, res, next);

        // Ensure the correct data is passed to findByIdAndUpdate
        expect(slaveModel.findByIdAndUpdate).toHaveBeenCalledWith(
            '1', // ID parameter
            updatedSlave, // Updated fields
            { new: true, runValidators: true } // Options
        );
    });

    it('should return 200 status code when the slave is updated successfully', async () => {
        const updatedSlave = { id: '1', name: 'Adam', age: 30, origin: 'Africa' };
        req.params.id = '1';
        req.body = updatedSlave;

        slaveModel.findByIdAndUpdate.mockResolvedValue(updatedSlave);

        await SlaveController.updateSlave(req, res, next);

        expect(res.statusCode).toBe(200);  // Status code should be 200 (OK)
        expect(res._getJSONData()).toEqual(updatedSlave);  // Response should contain updated slave data
    });

    it('should return 404 status code when slave is not found', async () => {
        req.params.id = '999';  // Non-existent slave ID
        req.body = { name: 'John', age: 25, origin: 'Africa' };

        slaveModel.findByIdAndUpdate.mockResolvedValue(null);  // Simulate no slave found

        await SlaveController.updateSlave(req, res, next);

        expect(res.statusCode).toBe(404);  // 404 for not found
        expect(res._getJSONData()).toEqual({ message: 'Nem található ilyen ID-jű rabszolga.' });
    });

    it('should return 400 status code if update fails due to validation error', async () => {
        const invalidData = { name: '', age: -5 };  // Invalid data (e.g., empty name and invalid age)
        req.params.id = '1';
        req.body = invalidData;

        const error = new Error('slave validation failed');
        slaveModel.findByIdAndUpdate.mockRejectedValue(error);  // Simulate validation error

        await SlaveController.updateSlave(req, res, next);

        expect(res.statusCode).toBe(400);  // 400 for bad request
        expect(res._getJSONData()).toEqual({ message: 'slave validation failed' });
    });
});
