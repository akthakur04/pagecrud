'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  function fetchData() {
    fetch('/api/todo').then(response => response.json()).then((data) => { setItems(data) });
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(items)
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {items && items?.map((item) => (
          <li key={item._id}>{item.title} -  {item.description}</li>  
        ))}
      </ul>
    </div>
  );
}
