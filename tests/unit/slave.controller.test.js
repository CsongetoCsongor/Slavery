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









slaveModel.findByIdAndDelete = jest.fn();
describe('SlaveController.deleteSlave tests', () => {
    it('should have a deleteSlave function', () => {
        expect(typeof SlaveController.deleteSlave).toBe('function');
    });

    it('should call slaveModel.findByIdAndDelete with the correct ID', async () => {
        req.params.id = '123';
        await SlaveController.deleteSlave(req, res, next);
        expect(slaveModel.findByIdAndDelete).toHaveBeenCalledWith('123');
    });

    it('should return 200 status code when slave is deleted successfully', async () => {
        req.params.id = '123';
        slaveModel.findByIdAndDelete.mockResolvedValue({ id: '123', name: 'John' });

        await SlaveController.deleteSlave(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Sikeresen törölve.' });
    });

    it('should return 404 when no slave is found with the provided ID', async () => {
        req.params.id = '999';
        slaveModel.findByIdAndDelete.mockResolvedValue(null);

        await SlaveController.deleteSlave(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Nem található ilyen ID-jű rabszolga.' });
    });
});



