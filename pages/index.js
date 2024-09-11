// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  function fetchData() {
    fetch('/api/items').then((response) => {
      return response.json();
    }).then((data) => { setItems(data) });
  }

  useEffect(() => {
    fetchData();
  }, []);
console.log(items)
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.task}</li>
        ))}
      </ul>
    </div>
  );
}
