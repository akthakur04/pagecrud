// pages/api/items.js
export default async function handler(req, res) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`);
    const data = await response.json();
    res.status(200).json(data);
  }
  