import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"

import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



const Item = ({ item, deleteData, fetchData, user }) => {

    const [text, setText] = useState(item.text)
    const [checked, setChecked] = useState(item.checked)

    const updateChecked = async(id) => {   
        setChecked(!checked);
        const surveyDocRef = doc(db, "items", id);
        await updateDoc(surveyDocRef, {         
          checked: !checked,    
        })
    }

    const editItem = async(id) => {
        const surveyDocRef = doc(db, "items", id);
        await updateDoc(surveyDocRef, {         
          text: text
        })
        fetchData();
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>
        <div key={item.id} className='w-full border flex justify-between my-2 cursor-pointer hover:border-indigo-200 hover:shadow-sm'>
            <div onClick={() => updateChecked(item.id)} className='flex w-full flex-row items-center'>
                <div className='w-15'><Checkbox checked={checked} onClick={() => updateChecked(item.id)}/></div>
                <div className='w-full font-semibold capitalize'>{item.text}</div>
            </div>
            {user &&    
            <div className='flex flex-row items-center'>
                <div><button onClick={handleOpen} 
                    className="py-1 px-2 flex justify-center items-center text-blue-600 hover:text-blue-800 text-sm font-medium w-full transition ease-in duration-200 text-center uppercase"
                    >Uredi</button></div>      
                <div><button onClick={() => deleteData(item.id)}
                    className="py-1 px-2 flex justify-center items-center text-red-600 hover:text-red-700 text-sm font-medium w-full transition ease-in duration-200 text-center uppercase"
                    >Izbriši</button></div>
            </div>
            }
            
        </div>

        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box sx={style}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='border w-full h-[40px] p-4 font-semibold text-center capitalize' placeholder='Izdelek'/>
                <div className='flex gap-2 justify-center'>               
                    <button onClick={() => {editItem(item.id), handleClose()}} className="h-[40px] w-[60px] text-[12px] md:text-md flex items-center justify-center px-2 py-1 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 text-md md:px-10 uppercase">Potrdi</button>
                    <button onClick={handleClose} className="h-[40px] w-[60px] text-[12px] md:text-md flex items-center justify-center px-2 py-1 border border-transparent font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:px-10 uppercase">Prekliči</button>
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default Item

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px', 
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };