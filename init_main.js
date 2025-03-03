const express = require('express');
const axios = require('axios'); // To make HTTP requests
const app = express();
const port = 3001;

app.use(express.json());



app.post('/rating/check-balance', async (req, res) => {
    const { email, type } = req.body;
  
    try {
      // Call the other pod to get the balance of the user
      const balanceResponse = await axios.post('http://localhost:3000/auth/show-balance', {
        email: email
      });
  
      const balance = balanceResponse.data.balance;
  
      // Determine the cost based on the type
      let cost = 0;
      if (type === 'movie') {
        cost = 2;
      } else if (type === 'image') {
        cost = 1;
      } else {
        return res.status(400).json({ message: 'Invalid type', code: 400 });
      }
  
      // Check if the balance is sufficient
      if (balance >= cost) {
        // Proceed to decrease balance by calling the decrease-balance API
        const decreaseResponse = await axios.post('http://localhost:3000/auth/decrease-balance', {
          email: email,
          amount: cost
        });
    
        // Log the success message with the usage type
        console.log({
          message: 'Access granted',
          code: 200,
          previousBalance: balance,
          usage: type  // Log the type of usage
        });
  
        // Send the response with status code 200
        res.status(200).json({
          message: 'Access granted',
          code: 200,
          previousBalance: balance,
          usage: type,  // Include the type in the response
        });
      } else {
        // Log the denial message and status code (201 for access denied)
        console.log({
          message: 'Access denied',
          code: 201
        });
  
        // Send the response with status code 201
        res.status(201).json({
          message: 'Access denied',
          code: 201
        });
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'Error occurred while checking balance', code: 500 });
    }
  });
  







app.listen(port, () => {
  console.log(`Rating Engine running at http://localhost:${port}`);
});
