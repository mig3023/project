import fetch from 'node-fetch';

const scheduleCoinDecrement = () => {
  // Decrement coins every 10 minutes
  setInterval(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/board/decrementCoins', {
        method: 'POST',
      });

      if (res.ok) {
        console.log('Coins decremented successfully');
      } else {
        console.error('Failed to decrement coins');
      }
    } catch (error) {
      console.error('Error decrementing coins:', error);
    }
  }, 6000); // 600,000 ms = 10 minutes
};

export default scheduleCoinDecrement;