import React, { memo, useEffect, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { IconButton, Grid, CircularProgress } from '@mui/material'
import fire_image from '../../../../public/static/fire.svg'
import FoodCard from '../../food-card/FoodCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import { AllRoutes } from '../../../AllRoutes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import CustomImageContainer from '../../CustomImageContainer'

import {
    CustomStackFullWidth,
    CustomViewAll,
} from '../../../styled-components/CustomStyles.style'
import { HandleNext, HandlePrev } from '../../CustomSliderIcon'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import FoodCardHorizontalShimmer from '../../food-card/FoodCardHorizontalShimmer'
import { useRouter } from 'next/router'
import fodKartBg from '../../../../public/static/images/Banner/App_bg.png'
import CustomContainer from '../../container'
import {CoustomerApi} from '../../../hooks/react-query/config/customerApi'
import { onSingleErrorResponse } from '../../ErrorResponse';



const NearbyPopularFood = ({ data, isLoading, isFetching }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const { popularFood } = useSelector((state) => state.storedData)
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const sliderRef = useRef(null)
    const matches = useMediaQuery('(max-width:825px)')
    
    let languageDirection = undefined
    if (typeof window !== 'undefined') {   
        languageDirection = localStorage.getItem('direction')
    } 

    const [homeTestmonials , setHometestimonils] = useState()

    // Testimonial
    const { data:testimonial, refetch, } = useQuery(
        ['testimonails'],
        CoustomerApi.testimonials,
        {
            onError: onSingleErrorResponse,
        }
    )

    useEffect(()=> {
        setHometestimonils(
            testimonial?.data?.data.find(e => e.id == 1)
        )
        
    },[testimonial])


    const [hoverOn, setHoverOn] = useState(true)

    const limit = 6

    const settings2 = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
        autoplay: true,
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        // rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: true,
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // initialSlide: 2
                    initialSlide: 0,
                    dots: true,

                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 0,
                },
            },
        ],
    }

    const handleClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        router.push(
            {
                pathname:
                    router.pathname === '/home'
                        ? window.location.pathname
                        : 'search',
                query: {
                    page: 'popular',
                },
            },
            undefined,
            { shallow: router.pathname === '/home' ? true : false }
        )
    }
    return (
        <>
            {/* <Grid
                container
                paddingTop={popularFood.length > 0 && '1.9rem'}
                gap="1.4rem"
            >
                {popularFood.length > 0 && (
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <CustomImageContainer
                                    src={fire_image.src}
                                    width="26px"
                                    height="26px"
                                />
                                <Typography
                                    variant="h3"
                                    color={theme.palette.neutral[1000]}
                                    fontWeight="500"
                                >
                                    {t('Popular in your area')}
                                </Typography>
                            </Stack>
                            <CustomViewAll
                                onClick={handleClick}
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                {isXSmall && (
                                    <Typography>{t('View all')}</Typography>
                                )}
                                <IconButton
                                    sx={{
                                        filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))',
                                        flex: 'none',
                                        order: '1',
                                        flexGrow: '0',
                                        boxShadow: 3,
                                    }}
                                >
                                    <KeyboardArrowRightIcon
                                        color="primary"
                                        style={{
                                            width: '19px',
                                            height: '19px',
                                            transform:
                                                languageDirection === 'rtl' &&
                                                'rotate(180deg)',
                                        }}
                                        fontWeight="700"
                                    />
                                </IconButton>
                            </CustomViewAll>
                        </CustomStackFullWidth>
                    </Grid>
                )}
                <Grid
                    item
                    container
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    sx={{
                        background:
                            popularFood.length > 0 &&
                            ((theme) => theme.palette.sectionBg),
                        padding: '20px',
                        [theme.breakpoints.down('sm')]: {
                            padding: '10px',
                        },
                    }}
                >
                    {popularFood?.slice(0, limit).map((product) => {
                        if (
                            product?.variations === null ||
                            product?.variations[0]?.values ||
                            product?.variations?.length === 0
                        ) {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={matches ? 12 : 6}
                                    md={6}
                                    lg={4}
                                    key={product?.id}
                                    padding={{ xs: 0.5, sm: 1, md: 1 }}
                                >
                                    <FoodCard
                                        product={product}
                                        productImageUrl={
                                            global?.base_urls?.product_image_url
                                        }
                                        horizontal="true"
                                        hasBackGroundSection="true"
                                    />
                                </Grid>
                            )
                        }
                    })}
                    {isLoading &&
                        [...Array(6)].map((item) => (
                            <Grid
                                item
                                xs={12}
                                sm={matches ? 12 : 6}
                                md={6}
                                lg={4}
                                padding={{ xs: 0.5, sm: 1, md: 1 }}
                            >
                                <FoodCardHorizontalShimmer />
                            </Grid>
                        ))}
                </Grid>
            </Grid> */}

            {/* <section className="mb-4 wrapper  position-relative fadein">
                
                
                <CustomContainer>
                    <div className="fk_banners  elem to-fade-in mb-xl-5 mb-3 ">
                        <div className="">
                            <div className="row">
                                <div
                                    className="col-md-6 mb-4 "
                                    style={{ borderRadius: '20px' }}
                                >
                                    <div className="position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
                                        <img
                                            src={global?.home_page?.home_card_one_image}
                                            className=""
                                        />
                                        
                                    </div>
                                </div>
                                <div
                                    className="col-md-6 mb-4 "
                                    style={{ borderRadius: '20px' }}
                                >
                                    <div className="position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
                                        <img
                                            src={global?.home_page?.home_card_two_image}
                                            className=""
                                        />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </CustomContainer>
            </section> */}

            <section className='my-4'>
               <div className='testimoni_bg'>
               {/* style={{backgroundImage:`url(${global?.home_page?.app_today_image})`}} */}
                    <CustomContainer>
                    <div className="elem to-fade-in testimonal_peo testimoni_padding" >
                        <div className="d-flex justify-content-center mb-md-5 mb-4">
                            { testimonial?.data?.data?.length > 0 &&
                            <div className="text-center">
                            
                            <h3 className="fw-bold mb-2">
                                {t(global?.home_page?.home_testimonial_heading)} 
                            </h3>
                            <p className="fw-bold"> {t(global?.home_page?.home_testimonial_sub_heading)}</p>
                            </div>
                            }  
                            
                        </div>

                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className="testi_slider">

                                    <div className='position-absolute testi_quote_1'>
                                        <img
                                            src="/static/images/__quote_1.png"
                                            className="quates_img"
                                        />
                                    </div>

                                    <div className='position-absolute testi_quote_2'>
                                        <img
                                            src="/static/images/__quote_2.png"
                                            className="quates_img"
                                        />
                                    </div>

                                    <Slider
                                        className="slick__slider"
                                        {...settings2}
                                        ref={sliderRef}
                                        arrows={false}
                                        dots= {true}
                                    >
                                        {
                                            homeTestmonials?.testimonials?.map((data,index)=>(
                                            <div className="Testimonils_card" key={index}>

                                                <div className="">
                                                    <div className="text-center">
                                                        <p className="comlplete_3">
                                                            {t(data?.des)}
                                                        </p>
                                                    </div>
                                                    <div className="mb-3 d-flex justify-content-center">
                                                        <div className=''>
                                                            <img
                                                                src={data?.image}
                                                                className="rounded-circle testimonial_img" 
                                                                onError={(e)=> e.currentTarget.src = "/static/images/No_Image.jpg"}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    <h4 className="text-center comlplete_1 mb-2">{t(data?.title)}</h4>
                                                    
                                                    <p className="text-center comlplete_1 mb-0">{t(homeTestmonials?.name)}</p>
                                                
                                                </div>
                                            </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className='testi_img text-center'>
                                    <img src='/static/images/testimonial.png'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    </CustomContainer>
               </div>
            </section>
           

            <section className="wrapper testimonal fadein my-sm-4 my-3 position-relative">

                <div className="position-absolute icon1">
                    <img
                        src="/static/images/Banner/Element_2.png"
                        className="w-100"
                    />
                </div>
                <div className="position-absolute  icon2">
                    <img
                        src="/static/images/Banner/Element_3.png"
                        className="w-100"
                    />
                </div>


                <div className="get_app d-flex elem to-fade-in align-items-center">
                    {/* <img src='/static/images/Banner/App_bg.png' className='w-100' /> */}

                    {/* <div className='position-absolute top-50 start-50 translate-middle'> */}
                    <CustomContainer>
                        <div className="row align-items-center">
                            <div className="col-md-6 d-md-block d-none">
                                <div className="text-center">
                                    <img
                                        src={global?.home_page?.app_today_background_image}
                                        className="customer_app-img"
                                    />  
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="text-md-start text-center sm_getApp">
                                    <div className="mb-sm-4 mb-2">
                                        {/* <h4 className="text_color mb-3">
                                            {global?.home_page?.app_today_title}
                                        </h4> */}

                                        <h3 className="mb-3 fw-bold">
                                        {t(global?.home_page?.app_today_sub_title)}
                                        </h3>

                                        <p className="mb-sm-3 comlplete_2 text-dark">
                                            {t(global?.home_page?.app_today_description)}
                                        </p>

                                        <div className="d-flex justify-content-md-start justify-content-center align-items-center">
                                            <div className='cursor-pointer' onClick={()=>window.open("https://play.google.com/store/games?device=windows")}>
                                                <img
                                                    src={global?.home_page?.app_today_google_button?.image}
                                                    className="app_store"
                                                />
                                            </div>
                                            <div className="ms-3 cursor-pointer" onClick={()=>window.open("https://www.apple.com/")}>
                                                <img
                                                    src={global?.home_page?.app_today_apple_button?.image}
                                                    className="app_store"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </CustomContainer>
                </div>
            </section>
        </>
    )
}

export default memo(NearbyPopularFood)
