import React, { memo, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import Box from '@mui/material/Box'
import {
    Button,
    Grid,
    IconButton,
    Stack,
    Typography,
    Tab,
    Tabs,
    Container
} from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FoodCard from '../../../food-card/FoodCard'
import { CategoryApi } from '../../../../hooks/react-query/config/categoryApi'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { MostReviewedApi } from '../../../../hooks/react-query/config/productsApi'
import { useRouter } from 'next/router'
import { AllRoutes } from '../../../../AllRoutes'
import {
    HomeTitleTypography,
    LeftArrowStyle,
    RightArrowStyle,
} from '../../HomeStyle'
import { useTranslation } from 'react-i18next'
import CustomShimmerForBestFood from '../../../CustomShimmer/CustomShimmerForBestFood'
import {
    CustomStackFullWidth,
    CustomViewAll,
    SliderCustom,
    CustomPaperBigCard
} from '../../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../../custom-tables/Tables.style'
import FeaturedCategoryCard from '../../../featured-category-item/FeaturedCategoryCard'
import CustomShimmerCategories from '../../../CustomShimmer/CustomShimmerCategories'
import { CustomIconButton, CustomSideOverLay } from '../FoodCampaign.style'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
// import { settings } from './SliderSetting'
import { onSingleErrorResponse } from '../../../ErrorResponse'
import best_foods from '../../../../../public/static/best_foods.svg'
import CustomImageContainer from '../../../CustomImageContainer'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import FoodCardShimmer from '../../../food-card/FoodCarShimmer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { HandleNext, HandlePrev } from '../../../CustomSliderIcon'
import { setHandleHomePage } from '../../../../redux/slices/global'
import Skeleton from '@mui/material/Skeleton'
import CustomContainer from '../../../container'
import { RestaurantsApi } from '../../../../hooks/react-query/config/restaurantApi';
// import { setCart, setClearCart } from '../../../../redux/slices/cart'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const BestReviewedFood = ({ data, isLoading }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { bestReviewedFoods, subCategories } = useSelector(
        (state) => state.storedData
    )
    const [hoverOn, setHoverOn] = useState(false)
    const [subCateogory, setSubCategory] = useState([])
    const bestfoodslideRef = useRef(null)
    const foodCampaignSliderRef = useRef(null)
    const router = useRouter()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isXSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const [value, setValue] = useState('1')
    const [foodId,setFoodId] = useState(13)
    const [foods,setfoods] = useState({})
    const [foodType,setfoodType] = useState(1)
    const sliderRef = useRef(null)

    function createData(name, food ) {
        return { name, food };
      }

      const rows = [
        createData('Monday', foods?.monday),
        createData('TuesDay',  foods?.tuesday),
        createData('Wednesday',  foods?.wednesday),
        createData('Thursday',  foods?.thursday),
        createData('Friday',  foods?.friday),
        createData('Saturday',  foods?.saturday),
        createData('Sunday',  foods?.sunday),
      ]

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);

      const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  

    const {data:allfoodlist} = useQuery(
        ['all-food'],
        RestaurantsApi.allFood,
        {
            onError: onSingleErrorResponse,
        }
    )

    // const {data:MenuList } = useQuery(
    //     ['menu-food'],
    //     RestaurantsApi.MenuList(foodId),
    //     {
    //         onError: onSingleErrorResponse,
    //     }
    // )


    const FetchMenuList = (foodId) => {
        RestaurantsApi.MenuList(foodId).then(res => {
            setfoods(res.data?.data)
            // console.log("jhfjg",res.data.data)
        }).catch(err => {
            console.error('err',err.message)
        })
    }


    // useEffect(()=> {
    //     FetchMenuList(foodId)
    // },[foodId])


    const FetchFoodList = (type) => {
        RestaurantsApi.Foodtype(type).then(res => {
            setfoods(res.data?.data)
            // console.log("jhfjg",res.data.data)
            let dbj = res.data.data
            let key = Object.keys(dbj)
            // console.log("khgjhgkl",foods[key[0]])
        }).catch(err => {
            console.error('err',err.message)
        })
    }

    useEffect(()=> {
        FetchFoodList(foodType)
    },[foodType])

    // const fethAllFood = () => {
    //     RestaurantsApi.allFood().then(res => {
    //         setFoodlist(res.data)
    //         let dailyList = []
    //         res?.data?.data?.forEach((dd)=>{
    //             dailyList.push(...dd?.description.split(/\r?\n/))
    //         })
    //         // console.log("jhjk0",dailyList)
    //         setfoods(dailyList)
    //     }).catch(err => {
    //         console.error('err',err.message)
    //     })
    // }



    if (typeof window == 'undefined') {
        return null
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
        // console.log('kgjhsgkdbsd', newValue)
    }

    function animateIfInView() {
        const elements = document.querySelectorAll('.wow')

        elements.forEach((value) => {
            if (isElementInViewport(value)) {
                value.classList.add('wow-in-view')
            } else {
                // (Optional) Fade out when out of view
                value.classList.remove('wow-in-view')
            }
        })
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect()

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    useEffect(() => {
        animateIfInView()
        window.addEventListener('scroll', animateIfInView)
        return () => {
            window.removeEventListener('scroll', animateIfInView)
        }
    }, [])

    // const {
    //     isLoading: isLoadingChilds,
    //     data:childesData,
    //     isError,
    //     error,
    //     refetch,
    // } = useQuery(['category-Childes',1],() => {
    //     CategoryApi.categoriesChildes(1)
    // })

    // const FetchSubCategory = async () => {
    //     const response = await CategoryApi.categoriesChildes(1)
    //     // console.log('hgfjfsfsf', response.data)
    //     setSubCategory(response.data)
    // }

    // useEffect(() => {
    //     FetchSubCategory()
    // }, [])

    const { global } = useSelector((state) => state.globalSettings)
    const languageDirection = localStorage.getItem('direction')


    const settings = {
        speed: 500,
        slidesToShow: 4.7,
        slidesToScroll: 3,
        initialSlide: 0,
        infinite: false,
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        // rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,

                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 5,

                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3,

                    // dots: true
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    // initialSlide: 2

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 3,

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1.7,
                    slidesToScroll: 2,

                    // dots: true
                    initialSlide: 0,
                },
            },
        ],
    }

    const settings2 = {
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        dots: true,
        infinite: true,
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
                    // dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    // dots: true
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
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    // dots: true
                    initialSlide: 0,
                },
            },
        ],
    }

    const handleClick = () => {
        if (typeof window !== 'undefined') {
            require('popper.js')
            require('bootstrap/dist/js/bootstrap')
        }

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
                    page: 'most-reviewed',
                },
            },
            undefined,
            { shallow: router.pathname === '/home' ? true : false }
        )
    }

    return (
        <>
            <div className="wrapper mb-5 fadein d-none">

                <CustomContainer>
                    <div className="elem to-fade-in">
                        <Grid
                            paddingTop={
                                bestReviewedFoods?.length > 0 && '1.9rem'
                            }
                            gap="1.4rem"
                        >
                            
                            <Grid item xs={12} md={12}>
                                <CustomStackFullWidth
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Stack direction="row" spacing={1}>
                                        {/* <CustomImageContainer
                                                src={best_foods.src}
                                                width="26px"
                                                height="26px"
                                            /> */}
                                        <Typography
                                            variant="h3"
                                            color={theme.palette.neutral[1000]}
                                            fontWeight="500"
                                        >
                                            <span className="fw-bold">
                                                {' '}
                                             {allfoodlist?.data.data?.length > 0 && t('Check Menu Of The Week')}   
                                            </span>
                                        </Typography>
                                    </Stack>
                                    
                                </CustomStackFullWidth>
                            </Grid>

                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <div className="home_Plans mt-3">
                                    {
                                         allfoodlist?.data?.data?.length > 0 &&
                                            <TabContext value={value} >
                                                <Box
                                                    sx={{
                                                        borderBottom: 1,
                                                        borderColor: 'divider',
                                                    }}
                                                >
                                                    <TabList
                                                        onChange={handleChange}
                                                        aria-label="lab API tabs example" 
                                                    >
                                                        {
                                                            allfoodlist?.data.data?.slice(0,3).map((data,index)=>(
                                                                <Tab
                                                                    iconPosition="start"
                                                                    className='tablistday'
                                                                    label={t(`${data?.name}`)}
                                                                    id="openTabBreakFast"
                                                                    value={`${index+1}`}
                                                                    sx={{ fontSize: '18px' }}
                                                                    key={index} 
                                                                    // onClick={()=>setFoodId(data?.id)}
                                                                    onClick={()=>setfoodType(index+1)}
                                                                />
                                                            ))
                                                        }
                                                    </TabList>
                                                </Box>

                                               

                                                <TabPanel value="1">
                                                    <Slider
                                                        className="slick__slider h-100"
                                                        {...settings2}
                                                        ref={sliderRef}
                                                    >
                                                        {
                                                            Object?.keys(foods)?.map((data,index)=> (
                                                            <div className="SubCategories_card" key={index}>
                                                                <div className="d-flex justify-content-center align-items-center p-3 sub-cards pb-4">
                                                                    <div className="">
                                                                        <h5 className='text-uppercase'>{t(data)}</h5>
                                                                    </div>
                                                                    {/* <div className="">
                                                                        <p className="text_color mb-0">
                                                                            See All
                                                                        </p>
                                                                    </div> */}
                                                                </div>
                                                                <div className="row home_menu p-3">
                                                                    {
                                                                       foods[data]?.map((foodlist,index2) => (
                                                                        <div className="col-md-2 col-sm-3 col-4 mb-3 d-flex justify-content-center" key={index2}>
                                                                            <div className="text-center">
                                                                                <div className='d-flex justify-content-center'>
                                                                                <img
                                                                                    src={foodlist?.day_image}
                                                                                    className="img_varaity1 mb-2" 
                                                                                    onError={(e)=> e.currentTarget.src = "/static/images/No_Image.jpg"}
                                                                                />
                                                                                </div>
                                                                                <h6 className="comlplete_2">
                                                                                    {foodlist?.menu}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                       ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            ))
                                                        }
                                                    </Slider>
                                                </TabPanel>
                                                <TabPanel value="2">
                                                <Slider
                                                        className="slick__slider h-100"
                                                        {...settings2}
                                                        ref={sliderRef}
                                                    >
                                                        {
                                                            Object?.keys(foods)?.map((data,index)=> (
                                                            <div className="SubCategories_card" key={index}>
                                                                <div className="d-flex justify-content-center align-items-center p-3 sub-cards pb-4">
                                                                    <div className="">
                                                                        <h5 className='text-uppercase' >{data}</h5>
                                                                    </div>
                                                                    {/* <div className="">
                                                                        <p className="text_color mb-0">
                                                                            See All
                                                                        </p>
                                                                    </div> */}
                                                                </div>
                                                                <div className="row home_menu p-3">
                                                                    {
                                                                       foods[data]?.map((foodlist,index2) => (
                                                                        <div className="col-md-2 col-sm-3 col-4 mb-3 d-flex justify-content-center" key={index2}>
                                                                            <div className="text-center">
                                                                                <div className='d-flex justify-content-center'>
                                                                                <img
                                                                                    src={foodlist?.day_image}
                                                                                    className="img_varaity1 mb-2" 
                                                                                    onError={(e)=> e.currentTarget.src = "/static/images/No_Image.jpg"}
                                                                                />
                                                                                </div>
                                                                                <h6 className="comlplete_2">
                                                                                    {foodlist?.menu}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                       ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            ))
                                                        }
                                                    </Slider>
                                                </TabPanel>
                                                <TabPanel value="3">
                                                <Slider
                                                        className="slick__slider h-100"
                                                        {...settings2}
                                                        ref={sliderRef}
                                                    >
                                                        {
                                                            Object?.keys(foods)?.map((data,index)=> (
                                                            <div className="SubCategories_card" key={index}>
                                                                <div className="d-flex justify-content-center align-items-center p-3 sub-cards pb-4">
                                                                    <div className="">
                                                                        <h5 className='text-uppercase' >{data}</h5>
                                                                    </div>
                                                                    {/* <div className="">
                                                                        <p className="text_color mb-0">
                                                                            See All
                                                                        </p>
                                                                    </div> */}
                                                                </div>
                                                                <div className="row home_menu p-3">
                                                                    {
                                                                       foods[data]?.map((foodlist,index2) => (
                                                                        <div className="col-md-2 col-sm-3 col-4 mb-3 d-flex justify-content-center" key={index2}>
                                                                            <div className="text-center">
                                                                                <div className='d-flex justify-content-center'>
                                                                                <img
                                                                                    src={foodlist?.day_image}
                                                                                    className="img_varaity1 mb-2" 
                                                                                    onError={(e)=> e.currentTarget.src = "/static/images/No_Image.jpg"}
                                                                                />
                                                                                </div>
                                                                                <h6 className="comlplete_2">
                                                                                    {foodlist?.menu}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                       ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            ))
                                                        }
                                                    </Slider>
                                                </TabPanel>

                                              
                                            </TabContext>
                                    }
                                </div>
                            </Box>

         
                        </Grid>
                    </div>
                </CustomContainer>
           </div>

            {/* <div className="mb-5 wrapper fadein mt-4">
                <CustomContainer>
                    <div className="elem to-fade-in ">
                    <div className='d-flex justify-content-center w-100'>
                        <div className='text-center w-100 mb-3'>
                            <h4 className='mb-2 fw-bold '>{t(global?.home_page?.home_why_choose_us_title)}</h4>

                            <h4 className='fw-bold'>{t('What people say')}</h4>
                            <h4 className='fw-bold'>{t(global?.home_page?.home_why_choose_us_sub_title)}</h4>

                        </div>
                        </div>
                        <Grid item xs={12} md={12} className='justify-content-center'>
                            <CustomStackFullWidth
                                direction="row"
                                alignItems="center"
                                className='justify-content-center'
                            >
                                <Stack direction="row" className='justify-content-center' spacing={1}>
                                    <CustomImageContainer
                                        src={best_foods.src}
                                        width="26px"
                                        height="26px"
                                    />
                                    <Typography
                                        variant="h3"
                                        color={theme.palette.neutral[1000]}
                                        fontWeight="500"
                                    >
                                        <div className="text-center mb-3 ">
                                            <h5 className="mb-2">
                                                {t('Why Choose Us')} ?
                                            </h5>
                                            <h4 className="fw-bold">
                                                {t('What people say')} ?
                                            </h4>
                                        </div>
                                    </Typography>
                                </Stack>
                            </CustomStackFullWidth>
                        </Grid>

                        <div className="mt-3 people_say mb-3">
                            <div className="row align-items-center">
                                <div className="col-md-6 text-md-start text-center">
                                    <div className="col-md-10">
                                        <div className="mb-3">
                                            <h4 className="mb-3 fw-bold">
                                                {global?.home_page?.home_why_choose_us_heading}
                                            </h4>
                                            <p className="comlplete_3">
                                                {global?.home_page?.home_why_choose_us_description}
                                            </p>
                                        </div>
                                        <div className="">
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src={global?.home_page?.home_why_choose_us_image1} 
                                                        className="me-2 icon"
                                                    />{' '}
                                                    Easy & Convenient
                                                    {global?.home_page?.home_why_choose_us_heading1}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src={global?.home_page?.home_why_choose_us_image2}
                                                        className="me-2 icon"
                                                    />{' '}
                                                    No Commitment
                                                    {global?.home_page?.home_why_choose_us_heading2}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src={global?.home_page?.home_why_choose_us_image3}
                                                        className="me-2 icon"
                                                    />{' '}
                                                    Fresh and Affordable
                                                    {global?.home_page?.home_why_choose_us_heading3}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-md-start justify-content-start align-items-center mb-3">
                                                <p className="mb-0 comlplete_1">
                                                    {' '}
                                                    <img
                                                        src={global?.home_page?.home_why_choose_us_image4}
                                                        className="me-2 icon"
                                                    />{' '}
                                                    Most 5-start reviews
                                                    {global?.home_page?.home_why_choose_us_heading4}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className=" d-flex justify-content-center ">
                                        <img
                                            src={global?.home_page?.home_why_choose_us_image}
                                            className="choose_peopel_img"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomContainer >
            </div> */}

            <div className='my-sm-4 my-3 position-relative'>

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
                
                {/* <div className='how-it-works_bg' style={{backgroundImage:`url(${global?.home_page?.home_how_it_work_image})`}}></div> */}

                <CustomContainer>
                    <div className='text-center w-100 mb-xl-5 mb-4'>
                        <h3 className='mb-2 fw-bold'>{t(global?.home_page?.service_for_you_title)}</h3>
                        <p className='fw-bold'>{t(global?.home_page?.service_for_you_subtitle)}</p>
                    </div>

                    <div className='row justify-content-center align-items-center'>
                        <div className="col-md-6 mb-md-4 mb-3">
                            <div className='works_img text-center'>
                                <img src={global?.home_page?.service_for_you_image} alt="Image"></img>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='its_our_area'>
                                <div className='how_work_area'>
                                    <div className='d-flex'>
                                        <div className='service_img'>
                                            <img src={global?.home_page?.service_for_you_image1} alt="image" />
                                        </div>
                                        <div>
                                            <h5 className='mb-3 fw-bold'>{t(global?.home_page?.service_for_you_card_heading1)}</h5>
                                            <p>{t(global?.home_page?.service_for_you_card_sub_heading1)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='how_work_area'>
                                    <div className='d-flex'>
                                        <div className='service_img'>
                                            <img src={global?.home_page?.service_for_you_image2} alt="image" />
                                        </div>
                                        <div>
                                            <h5 className='mb-3 fw-bold'>{t(global?.home_page?.service_for_you_card_heading2)}</h5>
                                            <p>{t(global?.home_page?.service_for_you_card_sub_heading2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='how_work_area'>
                                    <div className='d-flex'>
                                        <div className='service_img'>
                                            <img src={global?.home_page?.service_for_you_image3} alt="image" />
                                        </div>
                                        <div>
                                            <h5 className='mb-3 fw-bold'>{t(global?.home_page?.service_for_you_card_heading3)}</h5>
                                            <p>{t(global?.home_page?.service_for_you_card_sub_heading3)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomContainer>
                
            </div>


            <div className='mb-md-5 mb-4 mt-xl-4 mt-3'>
                <div className='counter_up_bg' style={{ backgroundImage: `url(${global?.home_page?.counterup_background_image})`}}>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-lg-4 col-md-6 mb-3'>
                                <div className='text-center'>
                                    <div className='counter_img mb-2'>
                                        <img src={global?.home_page?.counterup_image1}></img>
                                    </div>
                                    <div className='counter_text'>
                                        <h3 className='fw-bold mb-3'>{t(global?.home_page?.counterup_heading1)}</h3>
                                        <p>{t(global?.home_page?.counterup_sub_heading1)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6 mb-3'>
                                <div className='text-center'>
                                    <div className='counter_img mb-2'>
                                        <img src={global?.home_page?.counterup_image2}></img>
                                    </div>
                                    <div className='counter_text'>
                                        <h3 className='fw-bold mb-3'>{t(global?.home_page?.counterup_heading2)}</h3>
                                        <p>{t(global?.home_page?.counterup_sub_heading2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6 mb-3'>
                                <div className='text-center'>
                                    <div className='counter_img mb-2'>
                                        <img src={global?.home_page?.counterup_image3}></img>
                                    </div>
                                    <div className='counter_text'>
                                        <h3 className='fw-bold mb-3'>{t(global?.home_page?.counterup_heading3)}</h3>
                                        <p>{t(global?.home_page?.counterup_sub_heading3)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default memo(BestReviewedFood)
