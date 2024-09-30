import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Members from './pages/Members'
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Members/>}></Route>
            <Route path='*' element={<div>Page not found</div>}></Route>

        </Routes>
    </BrowserRouter>
  )
}
