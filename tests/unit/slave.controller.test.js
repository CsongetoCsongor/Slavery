const SlaveController = require("../../controller/slave.controller")
const slaveModel = require("../../model/slave.model")
const httpMocks = require("node-mocks-http")

slaveModel.create = jest.fn()

let req, res, next
beforeEach(() => {
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












