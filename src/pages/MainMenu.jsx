import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import homeImg from '../assets/shopping.png'

const MainMenu = ({ user, setUser }) => {

    useEffect(() => {
        setUser(null);
        sessionStorage.removeItem('user');
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateUser = (user) => {
        sessionStorage.setItem("user", user)
        setUser(user)
    }

  return (
    <div className='w-screen h-screen bg-indigo-600 flex justify-center p-10 items-center'>
        <div className='bg-white flex-col pt-10 w-[1280px]'>
            <h1 className='font-bold text-3xl'>Nakupovalni listek</h1>
            <div className='flex justify-between items-center flex-col lg:flex-row'>
                <div className='w-1/2'>
                    <img className='' src={homeImg} />
                </div>     
                <div className='w-1/2 flex justify-center my-20'>
                    <div className='flex flex-col gap-4 w-[300px]'>
                        <Link className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-md" 
                            to='/list'>Nakupovanje</Link>
                        <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 shadow-md" 
                            onClick={handleOpen}>Urejanje seznama</button>
                    </div>
                </div>
            </div>
            
        </div>



        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box sx={style}>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder='Vnesi ime'
                    className='border w-full h-[40px] p-4 font-semibold text-center'
                />
                <div className='flex gap-2 justify-center'>            
                    <Link to='/list' 
                        className="h-[40px] w-[60px] text-[12px] md:text-md flex items-center justify-center px-2 py-1 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 text-md md:px-10 uppercase"
                        onClick={() => {updateUser(user), handleClose()}}>Potrdi</Link>
                    <button 
                        className="h-[40px] w-[60px] text-[12px] md:text-md flex items-center justify-center px-2 py-1 border border-transparent font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 text-md md:px-10 uppercase"
                        onClick={handleClose}>Prekliči</button>
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default MainMenu

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