const { getBalance, decreaseBalance } = require('./balanceService');

// Business logic for checking balance and decreasing balance
const checkAndUpdateBalance = async (email, type) => {
    const cost = type === 'image' ? process.env.IMAGE_COST : type === 'video' ? process.env.VIDEO_COST : 0;

  if (cost === 0) {
    throw new Error('Invalid type');
  }

  const balance = await getBalance(email);

  if (balance >= cost) {
    await decreaseBalance(email, cost);
    return { message: 'Access granted', code: 200, previousBalance: balance, usage: type };
  } else {
    return { message: 'Access denied', code: 201 };
  }
};

module.exports = { checkAndUpdateBalance };
