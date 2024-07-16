import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/db';
import { hashPassword } from '../../../utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password, nickname } = req.body;
    if (!nickname) {
      return res.status(400).json({ message: 'Nickname is required' });
    }
    const hashedPassword = await hashPassword(password);
    try {
      await connection.query('INSERT INTO users (email, nickname, password, coin) VALUES (?, ?, ?, ?)', [email, nickname, hashedPassword, 0]);
      res.status(201).json({ message: 'User created' });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;