const Slave = require('../model/slave.model');

// 1️⃣ Összes rabszolga lekérése
exports.getAllSlaves = async (req, res) => {
    try {
        const slaves = await Slave.find();
        res.status(200).json(slaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2️⃣ Egy adott ID-jű rabszolga lekérése
exports.getSlaveById = async (req, res) => {
    try {
        const slave = await Slave.findById(req.params.id);
        if (!slave) {
            return res.status(404).json({ message: 'Nem található ilyen ID-jű rabszolga.' });
        }
        res.status(200).json(slave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3️⃣ Új rabszolga hozzáadása
exports.createSlave = async (req, res) => {
    const slave = new Slave({
        _id: req.body._id,
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        price: req.body.price,
        masterId: req.body.masterId
    });

    try {
        const newSlave = await slave.save();
        res.status(201).json(newSlave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4️⃣ Rabszolga módosítása
exports.updateSlave = async (req, res) => {
    try {
        const updatedSlave = await Slave.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedSlave) {
            return res.status(404).json({ message: 'Nem található ilyen ID-jű rabszolga.' });
        }
        res.status(200).json(updatedSlave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 5️⃣ Rabszolga törlése
exports.deleteSlave = async (req, res) => {
    try {
        const deletedSlave = await Slave.findByIdAndDelete(req.params.id);
        if (!deletedSlave) {
            return res.status(404).json({ message: 'Nem található ilyen ID-jű rabszolga.' });
        }
        res.status(200).json({ message: 'Sikeresen törölve.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
