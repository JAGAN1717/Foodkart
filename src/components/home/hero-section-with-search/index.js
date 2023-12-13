import React,{useState,useEffect,useRef} from 'react'
import CustomContainer from '../../container'
import { Box, Stack } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import ImageNotFound from '../../../../public/static/no-image-found.png'
import heroImg from '../../../../public/static/heroHome.svg'
import SearchSection from './SearchSection'
import FeatureCatagories from '../featured-categories/FeatureCatagories'
import { useSelector } from 'react-redux'
import foodKart from '../../../../public/static/images/Banner/Banner_Bg.png'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next'
import { BannerApi } from '../../../hooks/react-query/config/bannerApi'
import { onErrorResponse } from '../../ErrorResponse'
import { useQuery } from 'react-query'


import Slider from 'react-slick'

const HeroSectionWithSearch = ({ query, noCategories, page }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [toWrite, setToWrite] = useState("");
    const [index, setIndex] = useState(0);

    const {global} = useSelector((state) => state.globalSettings) 

    // Home Page Slider
    const { data:bannerSlider} = useQuery(
        ['banner-slider'],
        BannerApi.bannerSliderList,
        {
            onError: onErrorResponse,
        }
    ) 

    // let text = 'Say Goodbye To The Fast Food.'
    let text = global?.home_page?.home_banner_title ?? ''
    
    useEffect(() => {
      const interval = setInterval(() => {
        if (index === text?.length) {
          clearInterval(interval);
        } else {
          setToWrite(toWrite + text[index]); 
          setIndex(index + 1);
        }
      }, 100);
      return () => clearInterval(interval);
    }, [text, index, toWrite]);


    const sliderRef = useRef(null)
    const [hoverOn, setHoverOn] = useState(false)
    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
        dots: true,
        autoplay: true,
        // nextArrow: hoverOn && <HandleNext />,
        // prevArrow: hoverOn && <HandlePrev />,

    }


    const theme = useTheme()
    return (<>


    <div className="home_slider_1" style={{ backgroundImage: `url(${global?.home_page?.home_slider_background_image})`}}>
        <Slider
            className="chef__slider home h-100"
            {...settings}
            ref={sliderRef}
            arrows={false}
        >
            {
                bannerSlider?.data?.data?.map((data,index)=> (
                    <div className="">
                        <div className='container h-100'>
                            <div className='row home_page_banner position-relative'>             
                                <div className='col-xl-5 col-md-6'>
                                    <div className='home_banner_padding'>
                                        <h4 className='mb-3 fade-in fw-bold fs-1'>{t(data?.title ?? '')}</h4>
                                        <p className='fade-in delayed'>{t(data?.description ?? '')}</p>
                                        <button type='button' className='btn btn1_sub px-3 p-2' onClick={()=>router.push('/category/1?name=South+Indian')}>{t(data?.btn_text)}</button>
                                    </div>
                                </div>
                                <div className='col-md-6 home_align'>
                                    <div className='banner_img'>
                                        <img src={data?.image}></img>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                ))
            }
            {/* <div className="">
                <div className='container h-100'>
                    <div className='row home_page_banner position-relative'>                    
                        <div className='col-xl-5 col-md-6'>
                            <div className='home_banner_padding'>
                                <h4 className='mb-3 fade-in fw-bold fs-1'>Meals deliver to your Home Or Office!</h4>
                                <p className='fade-in delayed'>A food and nutrition company that offers healthy and tasty meals to be delivered to your doorstep.</p>
                                <button type='button' className='btn btn1_sub px-3 p-2'>Subscribe Now</button>
                            </div>
                        </div>
                        <div className='col-md-6 home_align'>
                            <div className='banner_img'>
                                <img src='/static/images/Banner/banner_image.png'></img>
                            </div>
                        </div>
                    </div>  
                </div>
            </div> */}
            
        </Slider>
    </div>



    {/* <section className='home_banner'>
        <Box
            sx={{
                
                backgroundImage: `url(${
                    global?.home_page?.home_banner_image
                })`,
                height:'600px',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                paddingTop: '50px',
                paddingBottom: '50px',
            }}
        >
                                      
            <CustomContainer>
                <Stack
                    sx={{
                        
                    }}
                    spacing={4}
                >
                    

                    <div className='row d-flex justify-content-center align-items-center position-relative'>
                        <div className='col-md-6'>
                           
                        </div>
                        <div className='col-md-6 d-flex justify-content-center'>
                            <div className=''>
                                <h4 className='mb-3 fade-in fw-bold fs-1'>{t(toWrite)}</h4>
                                <p className='fade-in delayed'>{t(global?.home_page?.home_banner_sub_title)}</p>
                                <button type='button' className='btn btn1_sub px-3 p-2' onClick={()=>router.push('/category/1?name=South+Indian')}>{t(global?.home_page?.home_banner_button?.home_banner_button_text)}</button>
                            </div>
                        </div>
                    </div>  
                </Stack>
            </CustomContainer>
        </Box>
    </section> */}


          {/* <Box>
            <div className='position-relative best_cat fadein'>
          <CustomContainer>
            <div className='d-flex justify-content-center mt-5'>
                <div className='text-center mb-3'>
                    <h5 className='mb-2 fw-bold'>{t("FoodKart's")}</h5>
                    <h4 className='fw-bold'>{t('Our Best Categories')}</h4>
                </div>

                <div className='position-absolute '>
                    <img src='/static/images/Banner/Element_1.png' className='w-100 leafImg' />
                </div>
            </div>
          {!page && !query && <FeatureCatagories height="70px" />}
          </CustomContainer>
          </div>
          </Box> */}
        </> )
}

export default HeroSectionWithSearch
