import React from 'react'

import { AppBarStyle } from './Navbar.style'
//import SecondNavbar from './second-navbar/SecondNavbar'
// import TopNav from './top-navbar/TopNav'
import dynamic from 'next/dynamic'
import AddressReselect from './top-navbar/address-reselect/AddressReselect'
import CustomContainer from '../container'



const Navigation = () => {
    const SecondNavbar = dynamic(() => import('./second-navbar/SecondNavbar'), {
        ssr: false,
    })


    let zoneid = "[1]"
    let location = undefined
    let languageDirection = undefined

    if (typeof window !== 'undefined') {
        // zoneid = localStorage.getItem('zoneid')
        languageDirection = localStorage.getItem('direction')
        location = localStorage.getItem('location')
    }

    return (
        // <div className='header'>
        <AppBarStyle disableGutters={true}>
            {/*<TopNav />*/}
            <SecondNavbar />
        </AppBarStyle>
        // </div>
    )
}

export default Navigation
