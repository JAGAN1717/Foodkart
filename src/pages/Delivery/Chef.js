// import React from "react";
import React,{useRef,useEffect,useState} from "react";
import CustomContainer from "../../components/container";
import Slider from 'react-slick'
import { HandleNext,HandlePrev } from "../../components/CustomSliderIcon";
import { useSelector } from 'react-redux';
import { BannerApi } from "../../hooks/react-query/config/bannerApi";
import { useQuery } from 'react-query';
import { onErrorResponse } from "../../components/ErrorResponse";
import { useTranslation } from 'react-i18next'
import { onSingleErrorResponse } from "../../components/ErrorResponse";
import { CoustomerApi } from "../../hooks/react-query/config/customerApi";


const Chef = () => {
    const { t } = useTranslation()
    const [chefTestmonials , setCheftestimonils] = useState()

    // Testimonial
    const { data:testimonial, refetch, } = useQuery(
        ['testimonails'],
        CoustomerApi.testimonials,
        {
            onError: onSingleErrorResponse,
        }
    )

    useEffect(()=> {
        setCheftestimonils(
            testimonial?.data?.data.find(e => e.id == 2)
        )
        
    },[testimonial])



    // Chef Page Slider
    const { data:chefSlider} = useQuery(
        ['banner-slider'],
        BannerApi.chefSliderList,
        {
            onError: onErrorResponse,
        }
    ) 

    const {global} = useSelector((state) => state.globalSettings)

    const sliderRef = useRef(null)
    const [hoverOn, setHoverOn] = useState(false)
    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        dots: true,
        autoplay: true,
        infinite: true,    
        // nextArrow: hoverOn && <HandleNext />,
        // prevArrow: hoverOn && <HandlePrev />,

    }


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
                    // dots: true
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




    return(
        <>
        
        <div className="mt-4">
            <div className="chef_slider" style={{ backgroundImage: `url(${global?.home_chef?.home_chef_slider_background_image})`}}>
                <Slider
                    className="chef__slider h-100"
                    {...settings}
                    ref={sliderRef}
                >
                    {
                        chefSlider?.data?.data?.map((data,index)=> (
                            <div className="" >
                                <div className="container h-100">
                                    <div className='row d-flex align-items-center justify-content-center h-100'>
                                        
                                        <div className='col-xl-5 col-md-6'>
                                            <div className=''>
                                                <h4 className='mb-3 fade-in fw-bold fs-1'>{t(data?.title ?? '')}</h4>
                                                <p className='fade-in delayed'>{t(data?.description ?? '')}</p>
                                                <button type='button' className='btn btn1_sub px-3 p-2'>{t(data?.btn_text)}</button>
                                            </div>
                                        </div>

                                        <div className='col-md-6 home_align'>
                                            <div className='chef_banner_img'>
                                                <img src={data?.image}></img>
                                            </div>
                                        </div>
                                        
                                    </div>  
                                </div>
                            </div>
                        ))
                    }
                    
                    {/* <div className="chef_slider_1">
                        <div className="container h-100">
                            <div className='row d-flex align-items-center h-100'>
                                
                                <div className='col-md-6'>
                                    <div className=''>
                                        <h4 className='mb-3 fade-in fw-bold fs-1'>Meals deliver to your Home Or Office!</h4>
                                        <p className='fade-in delayed'>A food and nutrition company that offers healthy and tasty meals to be delivered to your doorstep.</p>
                                        <button type='button' className='btn btn1_sub px-3 p-2'>Subscribe Now</button>
                                    </div>
                                </div>
                                
                            </div>  
                        </div>
                    </div> */}
                    
                </Slider>
            </div>
        </div>


        {/* <div className="my-sm-4 my-3">
            <CustomContainer>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center">
                            <img className="chef_app_img" src="/static/images/Banner/chef.png" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-lg-10">
                                <h4 className="delivery-title fw-bold">Get Our Updated App Today.</h4>
                                <div className="delivery-dec mb-3">
                                    <p>we offer healthy, yummy, honest & wholesome Indian food, made with real ingredients, zero trans fat, and lots of love!</p>
                                </div>
                                <button type='button' className='btn btn1_sub px-3 p-2'>Join Foodkart Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomContainer>
        </div> */}


        <div className="my-sm-5 my-3 position-relative">


                <div className="position-absolute its_work_bg_1">
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
                <div className='text-center w-100 mb-sm-5 mb-4'>
                    <h3 className='fw-bold mb-2'>{t(global?.home_chef?.home_chef_hiw_title)}</h3>
                    <p className='mb-2 fw-bold'>{t(global?.home_chef?.home_chef_hiw_subtitle)}</p>
                    
                </div>

                <div className='row justify-content-center align-items-center'>
                    <div className="col-md-6 mb-md-4 mb-3">
                        <div className='works_img text-center'>
                            <img src={global?.home_chef?.home_chef_hiw_image} alt="Image"></img>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='its_our_area'>
                            <div className='how_work_area'>
                                <div className='d-flex'>
                                    <div className='service_img'>
                                        <img src={global?.home_chef?.home_chef_hiw_card_image1} alt="image" />
                                    </div>
                                    <div>
                                        <h5 className='mb-3 fw-bold'>{t(global?.home_chef?.home_chef_card_hiw_title1)}</h5>
                                        <p>{t(global?.home_chef?.home_chef_hiw_card_subtitle1)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='how_work_area'>
                                <div className='d-flex'>
                                    <div className='service_img'>
                                        <img src={global?.home_chef?.home_chef_hiw_card_image2} alt="image" />
                                    </div>
                                    <div>
                                        <h5 className='mb-3 fw-bold'>{t(global?.home_chef?.home_chef_card_hiw_title2)}</h5>
                                        <p>{t(global?.home_chef?.home_chef_hiw_card_subtitle2)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='how_work_area'>
                                <div className='d-flex'>
                                    <div className='service_img'>
                                        <img src={global?.home_chef?.home_chef_hiw_card_image3} alt="image" />
                                    </div>
                                    <div>
                                        <h5 className='mb-3 fw-bold'>{t(global?.home_chef?.home_chef_card_hiw_title3)}</h5>
                                        <p>{t(global?.home_chef?.home_chef_hiw_card_subtitle3)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </CustomContainer>
        </div>


        

        <section className="my-sm-5 my-3">
            <div className=''>
                <CustomContainer>
                    <div className="elem to-fade-in testimonal_peo testimoni_padding" >
                        <div className="d-flex justify-content-center mb-sm-5 mb-4">                     
                            <div className="text-center">
                            <h3 className="fw-bold mb-2">
                                {t(global?.home_chef?.home_chef_testimonial_heading)}
                            </h3>
                            <p className="fw-bold">{t(global?.home_chef?.home_chef_testimonial_sub_heading)}</p>
                            
                            </div>      
                        </div>

                        <div className="row">
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

                                            chefTestmonials?.testimonials?.map((data,index)=>(

                                            <div className="Testimonils_card"  key={index}>
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

                                                    <p className="text-center comlplete_1 mb-0">{t(chefTestmonials?.name)}</p>
                                                    
                                                </div>
                                            </div>

                                        ))

                                       } 
                                           
                                        
                                    </Slider>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className='testi_img text-center'>
                                    <img src={global?.home_chef?.home_chef_testimonial_image}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomContainer>
            </div>
        </section>


        <div className="my-sm-4 my-3 ">
            <div className="chef_app_bg" style={{ backgroundImage: `url(${global?.home_chef?.home_chef_app_today_background_image})`}}>
                <CustomContainer>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center chef_responsive">
                                <img className="chef_app_img" src={global?.home_chef?.home_chef_app_today_image} />
                            </div>
                        </div>
                        <div className="col-md-6 image_margin">
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <div>
                                        <h5 className="mb-2 fw-bold all-head-color">{t(global?.home_chef?.home_chef_app_today_sub_title)}</h5>
                                        <h4 className="delivery-title fw-bold">{t(global?.home_chef?.home_chef_app_today_title)}</h4>
                                        <div className="delivery-dec mb-3">
                                            <p>{t(global?.home_chef?.home_chef_app_today_description)}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-3">
                                        <div className=''>
                                            <img
                                                src={global?.home_chef?.home_chef_app_today_google_button?.image}
                                                className="play_store"
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <img
                                                src={global?.home_chef?.home_chef_app_today_apple_button?.image}
                                                className="play_store"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </CustomContainer>
            </div>
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
                            <form>
                                <div className='d-flex justify-content-between align-items-center foot_text'>
                                    <div className='d-flex'>
                                        <img src='/static/images/Icons/_-18.png' className='teleTextImg' />
                                        <input type='text' placeholder='Enter Your Email Address' className='form-control border-0 ms-2' />
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


        </>
    )
}


export default Chef