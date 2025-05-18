import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <>
            <div className='min-h-dvh flex flex-col place-content-between'>
                <Header />
                <main className='flex-1'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default MainLayout