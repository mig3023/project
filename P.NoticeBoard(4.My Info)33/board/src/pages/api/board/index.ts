import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const conn = await connection.getConnection();
    const [rows] = await conn.query('SELECT * FROM posts ORDER BY created_at DESC');

    res.status(200).json(rows);
    conn.release();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;