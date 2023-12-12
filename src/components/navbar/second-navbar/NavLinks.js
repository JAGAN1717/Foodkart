import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { NavLinkStyle, NavLinkStyle2 } from '../Navbar.style'
import NavCatagory from '../NavCatagory'
import NavResturant from '../NavResturant'
import NavCuisines from '../NavCuisines'
import { setHandleHomePage } from '../../../redux/slices/global'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const NavLinks = ({ zoneid, t, languageDirection,headclass }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [openCategoryModal, setCategoryModal] = useState(false)
    const [openRestaurantModal, setRestaurantModal] = useState(false)
    const handleClick = () => {
        router.push('/home')
        dispatch(setHandleHomePage(false))
    }
    

    const handleAboutUS = () => {
        router.push('/about-us')
    }
    return (
        <Stack direction="row" className={headclass} spacing={2.5}>
            {zoneid && (
                headclass == 'hedaerNav' ? 
                <>
                    <NavLinkStyle2
                        onClick={handleClick}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}
                    >
                     <Typography fontSize="16px"><span className={router.asPath == '/home' ? 'active_navlink navbar-fw text-truncate' : 'navbar-fw text-truncate'}>{t('Home')}</span></Typography>
                    </NavLinkStyle2>

                    <NavLinkStyle2 
                    onClick={handleAboutUS}
                    underline="none"
                    languageDirection={languageDirection}
                    sx={{ cursor: 'pointer' }}
                    >
                    <Typography fontSize="16px"><span className={router.asPath == '/about-us' ? 'active_navlink navbar-fw text-truncate' : 'text-truncate navbar-fw'}>{t('About Us')}</span></Typography>
                    </NavLinkStyle2>

                    {/* <NavLinkStyle2  
                     onClick={()=>router.push('/category/1?name=South+Indian')}
                    sx={{ cursor: 'pointer' }}>
                    <Typography fontSize="14px">{t('Menu')}</Typography>
                    </NavLinkStyle2>
                    <NavCatagory
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    /> */}


                    <NavLinkStyle2
                        onClick={()=>router.push('/Delivery/Chef')}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}
                    >
                    <Typography fontSize="16px"><span className={router.asPath == '/Delivery/Chef' ? 'active_navlink navbar-fw text-truncate' : 'text-truncate navbar-fw'}>{t('Home Chef')}</span></Typography>
                    </NavLinkStyle2>

                    <NavLinkStyle2
                        onClick={()=> router.push('/Delivery/Partner')}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}
                    >
                    <Typography fontSize="16px"><span className={router.asPath == '/Delivery/Partner' ? 'active_navlink navbar-fw text-truncate' : ' text-truncate navbar-fw'}>{t('Delivery Partner')}</span></Typography>
                    </NavLinkStyle2>


                    {/* <NavLinkStyle2 
                          sx={{ cursor: 'pointer' }}
                          onClick={()=>router.push('/testimonials')}
                    >
                    <Typography fontSize="14px">{t('Testimonials')}</Typography>
                    </NavLinkStyle2> */}

                   

                    <NavLinkStyle2 
                    onClick={()=>router.push('/contact-us')}
                          sx={{ cursor: 'pointer' }}
                    >
                    <Typography fontSize="16px"><span className={router.asPath == '/contact-us' ? 'text-truncate active_navlink navbar-fw' : 'text-truncate navbar-fw'}>{t('Contact Us')}</span></Typography>
                    </NavLinkStyle2>

                  {/* 
                    <NavCatagory
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    /> */}
                     {/* <NavLinkStyle2
                        onClick={handleAboutUS}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}>
                    <Typography fontSize="14px">{t('About Us')}</Typography>
                    </NavLinkStyle2>
                
                    <NavLinkStyle2
                        onClick={handleClick}
                        underline="none"
                        languageDirection={languageDirection}
                        sx={{ cursor: 'pointer' }}>
                    <Typography fontSize="14px">{t('Contact Us')}</Typography>
                    </NavLinkStyle2> */}

                    {/* <NavCuisines
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                        languageDirection={languageDirection}
                    />

                    <NavResturant
                        openModal={openRestaurantModal}
                        setModal={setRestaurantModal}
                        zoneid={zoneid}
                        languageDirection={languageDirection}
                    /> */}
                </> : 
                                <>
                                <NavLinkStyle
                                    onClick={handleClick}
                                    underline="none"
                                    languageDirection={languageDirection}
                                    sx={{ cursor: 'pointer' }}
                                >
                                 <Typography fontSize="16px"><span className={router.asPath == '/home' ? 'active_navlink navbar-fw text-truncate' : 'navbar-fw text-truncate'}>{t('Home')}</span></Typography>
                                </NavLinkStyle>
            
                                <NavLinkStyle 
                                onClick={handleAboutUS}
                                underline="none"
                                languageDirection={languageDirection}
                                sx={{ cursor: 'pointer' }}
                                >
                                <Typography fontSize="16px"><span className={router.asPath == '/about-us' ? 'active_navlink navbar-fw text-truncate' : 'text-truncate navbar-fw'}>{t('About Us')}</span></Typography>
                                </NavLinkStyle>
            
                                {/* <NavLinkStyle  
                                 onClick={()=>router.push('/category/1?name=South+Indian')}
                                sx={{ cursor: 'pointer' }}>
                                <Typography fontSize="14px">{t('Menu')}</Typography>
                                </NavLinkStyle>
                                <NavCatagory
                                    openModal={openCategoryModal}
                                    setModal={setCategoryModal}
                                    setRestaurantModal={setRestaurantModal}
                                    languageDirection={languageDirection}
                                /> */}
            
            
                                <NavLinkStyle
                                    onClick={()=>router.push('/Delivery/Chef')}
                                    underline="none"
                                    languageDirection={languageDirection}
                                    sx={{ cursor: 'pointer' }}
                                >
                                <Typography fontSize="16px"><span className={router.asPath == '/Delivery/Chef' ? 'active_navlink navbar-fw text-truncate' : 'navbar-fw text-truncate'}>{t('Home Chef')}</span></Typography>
                                </NavLinkStyle>
            
                                <NavLinkStyle
                                    onClick={()=> router.push('/Delivery/Partner')}
                                    underline="none"
                                    languageDirection={languageDirection}
                                    sx={{ cursor: 'pointer' }}
                                >
                                <Typography fontSize="16px"><span className={router.asPath == '/Delivery/Partner' ? 'active_navlink navbar-fw text-truncate'  : 'navbar-fw text-truncate'}>{t('Delivery Partner')}</span></Typography>
                                </NavLinkStyle>
            
            
                                {/* <NavLinkStyle 
                                      sx={{ cursor: 'pointer' }}
                                      onClick={()=>router.push('/testimonials')}
                                >
                                <Typography fontSize="14px">{t('Testimonials')}</Typography>
                                </NavLinkStyle> */}
            
                               
            
                                <NavLinkStyle 
                                onClick={()=>router.push('/contact-us')}
                                      sx={{ cursor: 'pointer' }}
                                >
                                <Typography fontSize="16px"><span className={router.asPath == '/contact-us' ? 'active_navlink navbar-fw text-truncate' : 'text-truncate navbar-fw text-truncate'}>{t('Contact Us')}</span></Typography>
                                </NavLinkStyle>
            
                              {/* 
                                <NavCatagory
                                    openModal={openCategoryModal}
                                    setModal={setCategoryModal}
                                    setRestaurantModal={setRestaurantModal}
                                    languageDirection={languageDirection}
                                /> */}
                                 {/* <NavLinkStyle
                                    onClick={handleAboutUS}
                                    underline="none"
                                    languageDirection={languageDirection}
                                    sx={{ cursor: 'pointer' }}>
                                <Typography fontSize="14px">{t('About Us')}</Typography>
                                </NavLinkStyle>
                            
                                <NavLinkStyle
                                    onClick={handleClick}
                                    underline="none"
                                    languageDirection={languageDirection}
                                    sx={{ cursor: 'pointer' }}>
                                <Typography fontSize="14px">{t('Contact Us')}</Typography>
                                </NavLinkStyle> */}
            
                                {/* <NavCuisines
                                    openModal={openCategoryModal}
                                    setModal={setCategoryModal}
                                    setRestaurantModal={setRestaurantModal}
                                    languageDirection={languageDirection}
                                />
            
                                <NavResturant
                                    openModal={openRestaurantModal}
                                    setModal={setRestaurantModal}
                                    zoneid={zoneid}
                                    languageDirection={languageDirection}
                                /> */}
                            </>
            )}
        </Stack>
    )
}

NavLinks.propTypes = {}

export default NavLinks
