import React from 'react'
import { collection, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore"; 
import { db } from '../firebase'

import Item from './Item';

const ItemsList = ({ items, setItems, fetchData, user }) => {


  const deleteData = async(id) => {
    await deleteDoc(doc(db, "items", id));
    fetchData();
  }

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(items)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  const importData = async e => {
    let file;
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      file = JSON.parse(e.target.result);
    };

    const toDelete = await getDocs(collection(db, "items"));
    toDelete.forEach((item) => {
      const ID = item.id;
      deleteDoc(doc(db, "items", ID));
    })

    const importJSONtoDB = async (item) => {
      try {
        const docRef = await setDoc(doc(db, "items", item.id), {
          id: item.id,    
          text: item.text,
          checked: item.checked
    
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }   

    file.forEach(item => {
      importJSONtoDB(item);
    })
    fetchData();

  };

  return (
    <div className="flex flex-col justify-center">
      <div className='h-[58vh] lg:h-[70vh] overflow-y-auto overflow-x-hidden mx-5'>
        {items == "" && <p className='my-10'>Seznam je prazen</p>}

        <div className="w-[300px] md:w-[500px] m-auto my-5 mx-5 md:mx-14 lg:mx-[180px]">          
            { items?.map((item) => (
              <Item key={item.id} item={item} deleteData={deleteData} fetchData={fetchData} user={user} />
            ))}              
        </div>
      </div>
      {user &&
      <div className='flex gap-2 justify-center mt-5'>
        <div className='border w-60 md:w-[300px] px-4 py-2 bold flex flex-col' >Uvozi JSON<input type="file" onChange={importData}/></div>
        <button className='border px-4 py-2 bold' onClick={() => exportData()}>Izvozi JSON</button>
      </div>
      }
    </div>
  )
}

export default ItemsList