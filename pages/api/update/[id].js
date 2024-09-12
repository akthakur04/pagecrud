// pages/api/updateTask/[id].js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const client = await clientPromise;
      const db = client.db('myapp');
      const { id } = req.query;
      const { task, description } = req.body;

      // Update the task in the collection
      const result = await db.collection('tasks').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            task,
            description,
          },
        }
      );

      if (result.matchedCount === 1) {
        res.status(200).json({ message: 'Task updated successfully' });
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
