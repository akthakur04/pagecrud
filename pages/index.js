// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.title} - {item?.description}</li>
        ))}
      </ul>
    </div>
  );
}
