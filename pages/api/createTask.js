// pages/api/createTask.js

import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('myapp');

      const { title, description } = req.body;

      // Insert task into the tasks collection
      const result = await db.collection('tasks').insertOne({
        title: title,
        description,
        createdAt: new Date(),
      });

      res.status(201).json({ message: 'Task created', taskId: result.insertedId });
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
