const express = require('express');
const { checkAndUpdateBalance } = require('../services/ratingService');

const router = express.Router();

router.post('/check-balance', async (req, res) => {
  const { companyName, type } = req.body;

  try {
    const result = await checkAndUpdateBalance(companyName, type);
    console.log(result); // Log the result before sending response
    res.status(result.code).json(result);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: error.message, code: 500 });
  }
});

module.exports = router;
