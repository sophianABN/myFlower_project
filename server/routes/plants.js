const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Plant = require('../models/Plant');
const upload = require('../middleware/uploads');


router.post('/add', auth, upload.single('image'), async (req, res) => {
  try {
    const newPlant = new Plant({
      user: req.user.id,
      ...req.body,
      image: req.file ? req.file.filename : null // Stocke le nom du fichier
    });

    const plant = await newPlant.save();
    res.json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.user.id });
    res.json(plants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// GET une plante spécifique
router.get('/:id', auth, async (req, res) => {
  try {
    const plant = await Plant.findOne({ _id: req.params.id, user: req.user.id });
    if (!plant) {
      return res.status(404).json({ msg: 'Plante non trouvée' });
    }
    res.json(plant);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Plante non trouvée' });
    }
    res.status(500).send('Erreur serveur');
  }
});

// POST arroser une plante
router.post('/:id/water', auth, async (req, res) => {
  try {
    const plant = await Plant.findOne({ _id: req.params.id, user: req.user.id });
    if (!plant) {
      return res.status(404).json({ msg: 'Plante non trouvée' });
    }

    const wateringDate = new Date();
    plant.lastWatered = wateringDate;
    plant.wateringHistory.push({
      date: wateringDate,
      quantity: plant.waterNeeds.quantity
    });

    await plant.save();
    res.json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;