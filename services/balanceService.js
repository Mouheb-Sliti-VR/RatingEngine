const axios = require('axios');

// Get user balance from the auth service
const getBalance = async (companyName) => {
  try {
    const response = await axios.post(`${process.env.AUTH_API_URL}/auth/show-balance`, { companyName });
    return response.data.balance;
  } catch (error) {
    throw new Error('Error fetching balance');
  }
};

// Decrease user balance
const decreaseBalance = async (companyName, amount) => {
  try {
    const response = await axios.post(`${process.env.AUTH_API_URL}/auth/decrease-balance`, { companyName, amount });
    return response.data.updatedBalance;
  } catch (error) {
    throw new Error('Error decreasing balance');
  }
};

module.exports = { getBalance, decreaseBalance };
