// app/api/todo/route.js
import clientPromise from '@/app/lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('myapp');
    const collection = db.collection('tasks');
    const tasks = await collection.find({}).toArray();

    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
