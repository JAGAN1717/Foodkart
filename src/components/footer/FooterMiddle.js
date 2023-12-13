import React, { useEffect, useState,useRef } from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {
    Container,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import LogoSide from '../navbar/second-navbar/LogoSide'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import SocialLinks from './SocialLinks'
import AppLinks from '../landingpage/AppLinks'
import RouteLinks from './RouteLinks'
import { useTheme } from '@mui/material/styles'
import { QuickLinkData, QuickLinkData3 } from './QuickLinkData'
import { OtherData } from './OtherData'
import { QuickLinkData1 } from './QuickLinkData1'
import ContactInfo from './ContactInfo'
import CustomContainer from '../container'
import Slider from 'react-slick'


const FooterMiddle = ({ landingPageLink }) => {


    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    const [foogcat,setFoodCat] = useState([])
    const { t } = useTranslation()
    const { featuredCategories } = useSelector((state) => state.storedData)
    let zoneid = "[1]"
    if (typeof window !== 'undefined') {
        // zoneid = localStorage.getItem('zoneid')
    }

    const FetchCategory = () => {
        let Categories = []
        featuredCategories?.map((data)=> {
            Categories.push({'name':data?.name,'value':data?.name,'link': `/category/${data.id}`})
        })
        
        setFoodCat(Categories)
    }

    useEffect(()=> {
        FetchCategory()
    },[])




    const sliderRef = useRef(null)
    const [hoverOn, setHoverOn] = useState(false)

    const settings5 = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        initialSlide: 0,
        infinite: true,
        dots: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    initialSlide: 0,
                    dots: false
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    initialSlide: 0,
                    dots: false
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 0,
                    dots: false,
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    // initialSlide: 2
                    initialSlide: 0,
                    dots: false,

                },
            },
            {   
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    initialSlide: 0,
                },
            },
        ],
    }


    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isXSmall = useMediaQuery(theme.breakpoints.down('md'))
    const businessLogo = global?.logo
    return (
        <CustomStackFullWidth alignItems="center" pb="1.5rem" pt="3rem">
            <CustomContainer>

                <div className='row footer_margin'>
                    <div className='col-lg-3 col-md-4'>
                        <div className='d-flex'>
                            <div className='location_img'>
                                <img src='/static/images/Icons/__location_white.png'></img>
                            </div>
                            <div className='footer_location'>
                                <h5 className='mb-3'>{t(global?.our_address_text)}</h5>
                                <p>{t(global?.address)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9 col-md-8'>
                        <div className='area_location_bg'>
                            <div className='mb-4'>
                                <h4 className='fw-bold'>{t(global?.coming_soon_text)}</h4>
                            </div>

                            <Slider
                                className=""
                                {...settings5}
                                ref={sliderRef}
                            >  
                                <div className='text-center'>
                                    <div className='area_img'>
                                        <img src='/static/images/Icons/_anna_nagar.png'></img>
                                    </div>
                                    <p className='area_text'>{t("Anna Nagar")}</p>
                                </div>
                                <div className='text-center'>
                                    <div className='area_img'>
                                        <img src='/static/images/Icons/_kundrathur.png'></img>
                                    </div>
                                    <p className='area_text'>{t("Kundrathur")}</p>
                                </div>
                                <div className='text-center'>
                                    <div className='area_img'>
                                        <img src='/static/images/Icons/_besant_nagar.png'></img>
                                    </div>
                                    <p className='area_text'>{t("Besant Nagar")}</p>
                                </div>
                                <div className='text-center'>
                                    <div className='area_img'>
                                        <img src='/static/images/Icons/_saidapet.png'></img>
                                    </div>
                                    <p className='area_text'>{t("Saidapet")}</p>
                                </div>
                                <div className='text-center'>
                                    <div className='area_img'>
                                        <img src='/static/images/Icons/_central.png'></img>
                                    </div>
                                    <p className='area_text'>{t("Central")}</p>
                                </div>
                                <div className='text-center'>
                                    <div className='area_img'>
                                        <img src='/static/images/Icons/_besant_nagar.png'></img>
                                    </div>
                                    <p className='area_text'>{t("Besant Nagar")}</p>
                                </div>

                            </Slider>
                        </div>
                    </div>
                </div>

                <div className='useful_border'></div>

                <div className='row useful_margin mt-4'>
                    <div className='col-lg-3'>
                        <div>
                            <h6 className='useful_text mb-lg-0 mb-3'>{t(global?.useful_link_text)}</h6>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className='useful_link flex-wrap mb-0 gap-3'>
                            <Link  href='/home'>
                                <p className='m-0 footer_link'>{t("Home")}</p>
                            </Link>
                            <Link href='/about-us'>
                                <p className='m-0 footer_link'>{t("About Us")}</p>
                            </Link>
                            <Link href='/Delivery/Chef'>
                            <p className='m-0 footer_link'>{("Home Chef")}</p>
                            </Link>
                            <Link href='/Delivery/Partner'>
                                <p className='m-0 footer_link'>{t("Delivery Partne")}r</p>
                            </Link>
                            <Link href='/contact-us'>
                                <p className='m-0 footer_link'>{t("Contact Us")}</p>
                            </Link>
                            <Link href='/terms-and-conditions'>
                                <p className='m-0 footer_link'>{t('Terms & Conditions')}</p>
                            </Link>
                            <Link href='/privacy-policy'>
                                <p className='m-0 footer_link'>{t("Privacy Policy")}</p>
                            </Link>
                        </div>
                        
                        {/* <div className='useful_responsive d-none'>
                            <div className='row'>
                                <div className='col-6'>
                                    <Link href='/home'>
                                        <p className='m-0 footer_link'>Home</p>
                                    </Link>
                                    <Link href='/about-us'>
                                        <p className='m-0 footer_link'>About Us</p>
                                    </Link>
                                    <Link href='/Delivery/Chef'>
                                        <p className='m-0 footer_link'>Home Chef</p>
                                    </Link>
                                    <Link href='/Delivery/Partner'>
                                        <p className='m-0 footer_link'>Delivery Partner</p>
                                    </Link>
                                </div>
                                <div className='col-6'>
                                    <Link href='/contact-us'>
                                        <p className='m-0 footer_link'>Contact Us</p>
                                    </Link>
                                    <Link href='/terms-and-conditions'>
                                        <p className='m-0 footer_link'>Terms & Conditions</p>
                                    </Link>
                                    <Link href='/privacy-policy'>
                                        <p className='m-0 footer_link'>Privacy Policy</p>
                                    </Link>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>


                {/* <div className="d-lg-block d-none footer_responsive">
                    <Grid
                        container
                        spacing={{ xs: 2, md: 4 }}
                        justifyContent="space-between"
                    >
                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                        >
                            <CustomStackFullWidth
                                spacing={4}
                                alignItems={{
                                    xs: 'center',
                                    sm: 'center',
                                    md: 'flex-start',
                                }}
                            >
                                <Link href={zoneid ? '/home' : '/'}>
                                    <LogoSide
                                        global={global}
                                        businessLogo={businessLogo}
                                        className="mb-3"
                                    />
                                </Link>


                                <div className="">
                                    <CustomColouredTypography
                                        fontsize={isXSmall ? '14px' : '14px'}
                                        color="whiteContainer.main"
                                        sx={{
                                            
                                        }}
                                    >
                                        <span className="">
                                            {t(
                                                'Foodkart food is very homely. Their regular delivery even during the lockdown was a blessing. Their staff is very helpful.'
                                            )}
                                        </span>
                                    </CustomColouredTypography> 
                                </div>
                                
                                
                            </CustomStackFullWidth>

                            

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                        >
                            <RouteLinks
                                token={token}
                                global={global}
                                title="Quick Links"
                                RouteLinksData={QuickLinkData}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                        >
                            <RouteLinks
                                token={token}
                                global={global}
                                title={'Useful Links'}
                                RouteLinksData={QuickLinkData1}
                            />
                        </Grid>

                       

                        <Grid
                            item
                            xs={12}
                            sm={3}
                            md={2}
                        >
                            <RouteLinks
                                token={token}
                                global={global}
                                title="Connect"
                                RouteLinksData={[]}
                            />
                            <div className="d-flex justify-content-start align-items-center mt-3 mb-3 d-none">
                                <div
                                    className="social_media cursor-pointer"
                                    onClick={() =>
                                        window.open('https://www.facebook.com/')
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/1.png"
                                        className="w-100"
                                    />
                                </div>
                                <div
                                    className="social_media ms-2 cursor-pointer"
                                    onClick={() =>
                                        window.open(
                                            'https://www.instagram.com/'
                                        )
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/2.png"
                                        className="w-100"
                                    />
                                </div>
                                <div
                                    className="social_media ms-2 cursor-pointer"
                                    onClick={() =>
                                        window.open('https://www.linkedin.com/')
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/3.png"
                                        className="w-100"
                                    />
                                </div>
                                <div
                                    className="social_media ms-2 cursor-pointer"
                                    onClick={() =>
                                        window.open('https://www.youtube.com/')
                                    }
                                >
                                    <img
                                        src="/static/images/Icons/4.png"
                                        className="w-100"
                                    />
                                </div>
                            </div>
                            <div className='mt-3 mb-3'>
                                <ContactInfo global={global} />
                            </div>
                            <SocialLinks global={global} />
                            
                            
                        </Grid>
                    </Grid>
                </div> */}
                {/* <div className="foot_acc d-lg-none d-block ">
                    <div className="ms-3">
                        <Link href={zoneid ? '/home' : '/'}>
                            <LogoSide
                                global={global}
                                businessLogo={businessLogo}
                            />
                        </Link>
                    </div>

                    <div className="accordion mt-4" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                >
                                    FootKart
                                </button>
                            </h2>
                            <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <div className="">
                                        <CustomColouredTypography
                                            fontsize={isXSmall ? '14px' : '14px'}
                                            color="whiteContainer.main"
                                            sx={{
                                                
                                            }}
                                        >
                                            <span className="">
                                                {t(
                                                    'Foodkart food is very homely. Their regular delivery even during the lockdown was a blessing. Their staff is very helpful.'
                                                )}
                                            </span>
                                        </CustomColouredTypography> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    Quick Links
                                </button>
                            </h2>
                            <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <RouteLinks
                                        token={token}
                                        global={global}
                                        title="Quick Links"
                                        RouteLinksData={QuickLinkData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                >
                                    Meals Plan
                                </button>
                            </h2>
                            <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <RouteLinks
                                        token={token}
                                        global={global}
                                        title={'Meals Plan'}
                                        RouteLinksData={QuickLinkData1}
                                    />
                                </div>
                            </div>
                        </div>

                       

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFive">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive"
                                    aria-expanded="false"
                                    aria-controls="collapseFive"
                                >
                                    Connect
                                </button>
                            </h2>
                            <div
                                id="collapseFive"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingFive"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                            <div className=' mb-3'>
                                <ContactInfo global={global} />
                            
                            </div>
                            <SocialLinks global={global} />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </CustomContainer>
        </CustomStackFullWidth>
    )
}

FooterMiddle.propTypes = {}

export default FooterMiddle
