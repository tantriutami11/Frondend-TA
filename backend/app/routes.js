const express = require('express');
const router = express.Router();
const connection = require('../config/mysql');
const multisensorController = require('./controller');

// Middleware for parsing JSON bodies
router.use(express.json()); 

// Endpoint untuk menerima data dari Arduino (gunakan /sensor)
router.post('/sensor', (req, res) => {
  const { sensor_ph, sensor_suhu, sensor_do, sensor_amonia, sensor_suhu_baterai, sensor_arus, sensor_tegangan } = req.body;
  const sql = `INSERT INTO multisensor (sensor_ph, sensor_suhu, sensor_do, sensor_amonia, sensor_suhu_baterai, sensor_arus, sensor_tegangan) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [sensor_ph, sensor_suhu, sensor_do, sensor_amonia, sensor_suhu_baterai, sensor_arus, sensor_tegangan], (error, results) => {
    if (error) {
      console.error('Failed to insert data:', error);
      res.status(500).send({ status: 'failed', response: 'Failed to insert data' });
    } else {
      console.log('Data inserted successfully:', results);
      res.status(200).send({ status: 'success', response: 'Data inserted successfully' });
    }
  });
});

// Endpoint untuk mendapatkan data dari tabel multisensor (gunakan /multisensor)
router.get('/multisensor', multisensorController.index);
router.get('/multisensor/day', multisensorController.day);
router.get('/multisensor/week', multisensorController.week);
router.get('/multisensor/month', multisensorController.month);

module.exports = router;
