import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/firebase"
import ShoppingList from './pages/ShoppingList'
import MainMenu from './pages/MainMenu';

import './App.css'


function App() {

  const [user, setUser] = useState("");

  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    navigate("/");
  }, [])

  const fetchData = async () => {
    setItems([]);
    let list = [];
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc) => {
      list.push({...doc.data()})
    });
    setItems(list);
    console.log(items)
  }

  return (
    <>
      <Routes>
        <Route index path='/' element={<MainMenu user={user} setUser={setUser} />} />
        <Route path='list' element={<ShoppingList items={items} setItems={setItems} fetchData={fetchData} user={user} setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
