// pages/api/items/[id].js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('myapp');
      const { id } = req.query;

      const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });

      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
