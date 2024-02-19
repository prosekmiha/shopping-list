import React from 'react'
import { useNavigate } from 'react-router-dom';

import { collection, doc, deleteDoc, getDocs } from "firebase/firestore"; 
import { db } from '../firebase'

import AddItem from '../components/AddItem'
import ItemsList from '../components/ItemsList';



const ShoppingList = ({ items, setItems, fetchData, user, setUser }) => {


  const navigate = useNavigate();

  const logoutUser = () => {
    sessionStorage.removeItem("user");
    setUser("");
    navigate("/");
  }

  const deleteAll = async() => {
    const toDelete = await getDocs(collection(db, "items"));
    toDelete.forEach((item) => {
      const ID = item.id;
      deleteDoc(doc(db, "items", ID));
    })
    setItems([]);
  }

  return (
    <div className='w-screen h-screen bg-indigo-600 flex justify-center p-10 items-center'>     
      <div className='bg-white h-screen flex-col'>  
        <div className='flex justify-between pt-5 px-5'>
          <div className='w-1/2 flex justify-start'>
            {user &&
            <button onClick={deleteAll} className="h-[30px] w-[90px] text-[12px] flex items-center justify-center px-2 py-1 border border-transparent font-medium rounded-sm text-white bg-red-600 hover:bg-red-800 uppercase"
              >Izbriši vse</button> 
            }
          </div>
          <div className='w-1/2 flex justify-end'>
            <button onClick={fetchData} className="h-[30px] w-[60px] text-[12px] flex items-center justify-center px-2 py-1 border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-800 uppercase"
              >Osveži</button> 
          </div>
        </div>    
        <h1 className='font-bold text-3xl'>Nakupovalni listek</h1>
        <div className='flex justify-center gap-5 items-center my-4'>
          {user &&  <>
                      <p className='font-medium'>Uporabnik: {user}</p>
                      <p onClick={() => logoutUser()} className="text-blue-600 hover:text-blue-800 text-sm font-medium transition ease-in duration-200 text-center uppercase cursor-pointer">Odjava</p>
                    </>}
        </div>
        {user && <AddItem fetchData={fetchData} /> }
        <ItemsList items={items} setItems={setItems} fetchData={fetchData} user={user} />
      </div>
    </div>
  )
}

export default ShoppingList

