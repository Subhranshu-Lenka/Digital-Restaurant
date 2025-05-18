import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import NoLayout from '../NoLayout/NoLayout';
import Home from '../../Pages/Home/Home';
import Menu from '../../Pages/Menu/Menu';
import Admin from '../../Pages/Admin/Admin';

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<MainLayout />} >
                        <Route index element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                    </Route>

                    <Route element={<NoLayout />}>
                        <Route path='/admin' element={<Admin />} />
                    </Route>

                </Routes>
            </BrowserRouter>

        </>
    )
}

export default Router