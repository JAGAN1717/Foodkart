import React, { useState,useEffect, useRef } from 'react';
import { CssBaseline, Container } from '@mui/material';
import AboutUsPage from "./AboutUsPage";
import CustomContainer from "../container";
import { ConfigApi } from "../../hooks/react-query/config/useConfig";
import Slider from 'react-slick'
import { HandleNext, HandlePrev } from '../../components/CustomSliderIcon'
import { useTranslation } from 'react-i18next'
import { CoustomerApi } from '../../hooks/react-query/config/customerApi';
import { onSingleErrorResponse } from '../ErrorResponse';
import { useQuery } from 'react-query'
import { usePostNewsletterEmail } from '../../hooks/react-query/newsletter/usePostNewsletterEmail'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux';







const AboutUs = ({ configData }) => {
    const { t } = useTranslation()
    const [hoverOn, setHoverOn] = useState(true)
    const [emailAddress, setEmailAddress] = useState(null)
    const { mutate, isLoading: newsLodaing } = usePostNewsletterEmail()

    const {global} = useSelector((state) => state.globalSettings)
    
    const handleSubmit = (event) => {
        // e.preventdefault()
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (regex.test(emailAddress) === true) {
            mutate(
                { email: emailAddress },
                {
                    onSuccess: () =>
                        toast.success(t('Subscribed Successfully')),
                    onError: onSingleErrorResponse,
                }
            )
        } else {
            toast.error(t('Please insert a valid email.'))
        }

        event.preventDefault()
    }

    const sliderRef = useRef(null)

    const settings2 = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        initialSlide: 0,
        infinite: true,
        autoplay: true,
        // nextArrow: hoverOn && <HandleNext />,
        // prevArrow: hoverOn && <HandlePrev />,
        // rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    initialSlide: 0,
                    // dots: true
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
                    // initialSlide: 2,

                    initialSlide: 0,
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

    const [homeTestmonials , setHometestimonils] = useState()
    
    // Testimonial
    const { data: testimonial, refetch, } = useQuery(
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
        

    // console.log('title',global?.about_page?.about_top_banner_title)
    // let text = global?.about_page?.about_top_banner_title

    return (
        <>
            {/* <CssBaseline> */}
                
                <div className='mb-5'>
                    <div className='menu_bg2 position-relative '>
                        <img src={global?.about_page?.about_top_banner} className='w-100' />
                        <CustomContainer>
                            <div className='position-absolute translate-middle top-50 '>
                                {/* <h4 className='fade-in fw-bold'>Where Every meal is cooked with <span className='text_color'>love</span></h4> */}
                                <h4 className='fade-in fw-bold fs-2'>{t(global?.about_page?.about_top_banner_title)}</h4>
                            </div>
                        </CustomContainer>
                    </div>
                </div>

                <div className='mb-sm-4 mb-3 About_Us position-relative'>

                    <div className="position-absolute its_work_bg_3">
                        <img
                            src="/static/images/Banner/Element_2.png"
                            className=""
                        />
                    </div>
                    <div className="position-absolute its_work_bg_2">
                        <img
                            src="/static/images/Banner/Element_3.png"
                            className=""
                        />
                    </div>
                    <CustomContainer>
                        <div className=" people_say ">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-3">
                                    <div className=" text-center ">
                                        <img
                                            src={global?.about_page?.about_top_image1}
                                            className=" people_say_image"
                                        />
                                    </div>
                                    
                                </div>
                                <div className="col-md-6">  
                                    <div className='d-flex justify-content-center'>
                                        <div className="">
                                            <h4 className="mb-3 fw-bold fon_reduce">
                                                {t(global?.about_page?.about_top_heading1)}
                                            </h4>
                                            <div className='mt-3'>
                                                <p>{t(global?.about_page?.about_top_description1)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
                </div>


                <div className='mb-sm-5 mb-3'>
                    <CustomContainer>
                        <div className='d-flex justify-content-center mt-5 mb-3'>
                            <div className='text-center mb-4'>
                                <h5 className='mb-2 fw-bold'>{t(global?.about_page?.our_current_journey_title)}</h5>
                                <h4 className='fw-bold fs-3'>{t(global?.about_page?.our_current_journey_sub_title)}</h4>
                            </div>
                        </div>

                        <div className='row justify-content-center'>
                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                                <div className='cooked_meal d-flex justify-content-center'>
                                    <div className='text-center'>
                                        <div className='mb-3'>
                                            <img src={global?.about_page?.our_current_journey_card_image1} />
                                        </div>
                                        <div className=''>
                                            <h5 className='comlplete_2'>{t(global?.about_page?.our_current_journey_card_heading1)}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                                <div className='cooked_meal d-flex justify-content-center'>
                                    <div className='text-center'>
                                        <div className='mb-3'>
                                            <img src={global?.about_page?.our_current_journey_card_image2} />
                                        </div>
                                        <div className=''>
                                            <h5 className='comlplete_2'>{t(global?.about_page?.our_current_journey_card_heading2)}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                                <div className='cooked_meal d-flex justify-content-center'>
                                    <div className='text-center'>
                                        <div className='mb-3'>
                                            <img src={global?.about_page?.our_current_journey_card_image3} />
                                        </div>
                                        <div className=''>
                                            <h5 className='comlplete_2'>{t(global?.about_page?.our_current_journey_card_heading3)}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                                <div className='cooked_meal d-flex justify-content-center'>
                                    <div className='text-center'>
                                        <div className='mb-3'>
                                            <img src={global?.about_page?.our_current_journey_card_image4} />
                                        </div>
                                        <div className=''>
                                            <h5 className='comlplete_2'>{t(global?.about_page?.our_current_journey_card_heading4)}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
                </div>

                <div className='mb-4 About_Us safty_bg' style={{ backgroundImage: `url(${global?.about_page?.about_middle_background_image2})`}}>
                    <CustomContainer>
                        <div className=" people_say">
                            <div className="row align-items-center">
                                <div className="col-md-6 text-md-start text-center">
                                    <div className="">
                                        <div className="mb-3">
                                            <h4 className="mb-3 fw-bold">
                                                {t(global?.about_page?.about_middle_heading2)}
                                            </h4>
                                            <div className='mt-3'>
                                                <p>{t(global?.about_page?.about_middle_description2)}</p>
                                            </div>
                                        </div>
                                        {/* <div className="">
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/1.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    {t(" Easy & Convenient")}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/2.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    {t("No Commitment")}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/3.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    {t("Fresh and Affordable")}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src="/static/images/About Us/4.png"
                                                        className="me-2 icon"
                                                    />{' '}
                                                    {t("Most 5-start reviews")}
                                                </p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className=" text-center ">
                                        <img
                                            src={global?.about_page?.about_middle_image2}
                                            className=" people_say_image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
                </div>

                <div className='my-sm-4 my-0'>
                    <CustomContainer>
                        <div className='row'>   
                            <div className='col-lg-6'>
                                <div className='behind_img_2 text-center'>
                                    <img src={global?.about_page?.about_behind_the_scenes_image1}></img>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='behind_area'>
                                    <h4 className='about-title-text'>{t(global?.about_page?.about_behind_the_scenes_title)}</h4>
                                    <div className='mt-3 behind-description'>
                                        <p>{t(global?.about_page?.about_behind_the_scenes_description)}</p>
                                    </div>

                                    <div className='behind_img_1 text-center'>
                                        <img src={global?.about_page?.about_behind_the_scenes_image2}></img>
                                    </div>
                                </div>
                            </div>

                          
                        </div>
                    </CustomContainer>
                </div>
                

                <div className='mb-sm-4 mb-3 mt-md-0 mt-4'>
                    <CustomContainer>
                        <div className='row align-items-center'>
                            
                            <div className='col-md-6'>
                                <h4 className='about-title-text'>{t(global?.about_page?.about_bottom_heading3)}</h4>
                                <div className='mt-3 behind-description'>
                                    <p>{t(global?.about_page?.about_bottom_description3)}</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="text-center">
                                    <img
                                        src={global?.about_page?.about_bottom_image3}
                                        className="behind_img"
                                    />
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
                </div>
                
                <div className='my-sm-4 my-3'>
                    <CustomContainer>
                        <div>
                            <h4 className='about-title-text'>{t(global?.about_page?.about_you_are_what_you_eat_title)}</h4>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='mb-lg-0 mb-3 me-lg-5 me-0'>
                                    <div className='mt-3 behind-description'>
                                        <p>{t(global?.about_page?.about_you_are_what_you_eat_description)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='mt-3 behind-description'>
                                    <p> {t("We are passionate about healthy food and encourage foodies to do the same. A change in diet can make a world of difference to one's health. We optimise the nutrition for health-conscious foodies based on your goals and prepare food that is healthy and just as delicious. We help you attain the desired results by creating a balanced diet. You can do something you love while we get your customised meal ready. Whether you're a meat-lover or a vegetarian, we've got you covered")}.</p>
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
                </div>
                                        

                {/* <div className="my-sm-4 my-3">
                    <CustomContainer>
                        <div className="row align-items-center">
                            
                            <div className="col-md-6">
                                <div>
                                    <h4 className="delivery-title fw-bold">Home Chef App Download</h4>
                                    <div className="delivery-dec mb-4">
                                        <p>The comfort of home-cooked food acts as a bridge between memories. But the thought of a hand-crafted meal requires time and planning.</p>
                                    </div>
                                </div>
                                <div className="d-flex  align-items-center mt-3">
                                    <div className=''>
                                        <img
                                            src="/static/images/Banner/App_store.png"
                                            className="play_store"
                                        />
                                    </div>
                                    <div className="ms-3">
                                        <img
                                            src="/static/images/Banner/Playstore.png"
                                            className="play_store"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 image_margin">
                                <div className="d-flex justify-content-center">
                                    <img className="chef_app_img" src="/static/images/Banner/chef_app.png" />
                                </div>
                            </div>
                        </div>
                    
                    </CustomContainer>
                </div> */}


                <div className="mb-4 testimonal position-relative ">
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

                    <CustomContainer>
                        <div className="testimonal_peo ">
                            <div className="d-flex justify-content-center mb-sm-5 mb-4">
                                {testimonial?.data?.data?.length > 0 &&
                                    <div className="text-center">
                                         
                                        <h3 className="fw-bold mb-2">
                                            {t('What people say')} ?
                                        </h3>
                                        <p className="fw-bold mb-2"> {t('Testimonials')}</p>
                                    </div>
                                }

                            </div>

                            <div className='row'>
                                <div className="col-lg-6">
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
                                            arrows={true}
                                        >
                                            {
                                                homeTestmonials?.testimonials?.map((data, index) => (
                                                    <div className="Testimonils_card" key={index}>
                                                        <div className="">
                                                            
                                                            <div className="text-center">
                                                                <p className="comlplete_3 textimonial-para">
                                                                    {t(data?.des)}
                                                                </p>
                                                            </div>

                                                            <div className='d-flex justify-content-center mb-3'>
                                                                <img
                                                                    src={data?.image}
                                                                    className="testimonial_img rounded-circle"
                                                                    onError={(e) => e.currentTarget.src = "/static/images/No_Image.jpg"}
                                                                />
                                                            </div>
                                                            <h4 className="text-center comlplete_1">{t(data?.title)}</h4>
                                                            <p className="text-center comlplete_1 mb-0">{t('Customer')}</p>
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


                <div className="my-sm-5 my-3 d-none">
                    <CustomContainer>
                        <div className="row align-items-center">

                            <div className="col-md-6">
                                <div className="d-flex justify-content-center">
                                    <img className="chef_app_img" src="/static/images/Banner/App.png" />
                                </div>
                            </div>

                            <div className="col-md-6 image_margin">
                                <div>
                                    <h4 className="delivery-title">{t("Customer App Download")}</h4>
                                    <div className="delivery-dec mb-4">
                                        <p>{t("From menus to hygiene of the ingredients, everything is tested thoroughly. We satisfy all our foodies by providing food from kitchens that exclusively prepare vegetarian and non-vegetarian")}.</p>    
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-3">
                                    <div className=''>
                                        <img
                                            src="/static/images/Banner/App_store.png"
                                            className="play_store"
                                        />
                                    </div>
                                    <div className="ms-3">
                                        <img
                                            src="/static/images/Banner/Playstore.png"
                                            className="play_store"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    
                    </CustomContainer>
                </div>  
                

                <div className='mb-5'>
                    <CustomContainer>
                        <div className='elem to-fade-in'>
                            <div className='banner_foot  d-flex justify-content-center align-items-center text-center position-relative'>
                                <div className='d-lg-block d-none position-absolute top-0 end-0'>
                                    <img src={global?.home_page?.home_newsletter_image1} className='ickk' />
                                </div>
                                <div className='d-lg-block d-none position-absolute  start-0'>
                                    <img src={global?.home_page?.home_newsletter_image2} className='ickk' />
                                </div>
                                <div className=''>
                                    <div>
                                        <h4 className='text-light comlplete_1'>{t(global?.home_page?.home_newsletter_title)}</h4>
                                    </div>
                                    <div className=''>
                                        <p className='text-light fw-light'>{t(global?.home_page?.home_newsletter_description)}</p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className='d-flex justify-content-between align-items-center foot_text'>
                                            <div className='d-flex'>
                                                <img src='/static/images/Icons/_-18.png' className='teleTextImg' />
                                                <input type='text' placeholder='Enter Your Email Address' onChange={(e) => setEmailAddress(e.target.value)} className='form-control border-0 ms-2' />
                                            </div>
                                            <div className=''>
                                                <button type='submit' className='btn btn_Sub2' >{t("Subscribe")}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </CustomContainer>
                </div>

            {/* </CssBaseline> */}

        </>
    );
};

export default AboutUs;
