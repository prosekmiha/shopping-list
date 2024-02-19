import React, { useState } from 'react'
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; 
import { db } from '../firebase'

const AddItem = ({ fetchData }) => {

    const [newItem, setNewItem] = useState("");

    const addNewItem = async () => {
      try {
        const docRef = await addDoc(collection(db, "items"), {
          id: "",    
          text: newItem,
          checked: false
    
        });
        const newDocRef = doc(db, "items", docRef.id);
        await updateDoc(newDocRef, {
          id: docRef.id
        });
        setNewItem("");
        fetchData();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
        
    }

  return (
    <div className='flex gap-1 justify-center'>
        <input className='border p-2' type="text" onChange={(e) => setNewItem(e.target.value)} value={newItem} placeholder='Izdelek'/>
        <button className='border font-bold text-white px-5 py-2 bg-blue-600 hover:bg-blue-800 uppercase rounded-sm' onClick={() => addNewItem()}>Dodaj</button>
    </div>
  )
}

export default AddItem