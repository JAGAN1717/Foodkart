import React, { useEffect, useState } from 'react'
import { Box, Container, } from '@material-ui/core'
import FoodOrRestaurant from '../../components/products-page/FoodOrRestaurant'
import ProductList from '../products-page/ProductList'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Grid, Typography } from '@mui/material'
import FoodNavigation from '../restaurant-details/foodSection/FoodNavigation'
import { RestaurantDetailsNavButton } from '../food-card/FoodCard.style'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import RestaurantList from '../restaurant-page/RestaurantList'
import RestaurantCard from '../restaurant-details/RestaurantCard'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import CustomePagination from '../pagination/Pagination'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
// import noData from '../../../public/static/food.png'
import noData from '../../../public/static/images/subs.png'
import { CustomPaperBigCard } from "../../styled-components/CustomStyles.style";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Category from '../../components/category/Category'
import {
  CustomStackFullWidth,
  FlexContainerCenter,
} from '../../styled-components/CustomStyles.style'
import FilterButtons from './FilterButtons'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import CustomShimmerForCard from '../CustomShimmer/CustomShimmerForCard'
import FoodCard from '../food-card/FoodCard'
import Image from 'next/image'
import RestaurantsData from './RestaurantsData'
import noRestaurants from '../../../public/static/resturants.png'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { setSubCategories, setPlans } from '../../redux/slices/storedData'
import { RTL } from '../RTL/RTL'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomContainer from "../container";
import {
  Button,
  IconButton,
  Stack,
  Tab,
  Tabs,
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { PlanApi } from '../../hooks/react-query/plans/planApi'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';






const CategoryDetailsPage = ({
  data,
  id,
  category_id,
  setCategoryId,
  resData,
  offset,
  page_limit,
  type,
  setOffset,
  setType,
}) => {
  const dispatch = useDispatch()
  let fetchId = data?.data?.data.products[0]?.id
  const [value1, setValue1] = React.useState(0);
  // const { featuredCategories } = useSelector((state) => state.storedData)
  const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
  const [catetoryMenus, setCategoryMenus] = useState([])
  const [SubFoodId, setSubFoodId] = useState(13)
  const [value2, setValue2] = useState('1')
  const [value, setValue] = useState('1')
  // const [CategoryId,setcategoryId] = useState(id)
  const [foodData, setFoodData] = useState([])
  const [plansInfo, setPlanInfo] = useState()
  const [planSlist, setPlansList] = useState([])
  const [foodlist, setFoodlist] = useState([])
  const [selected, setSelected] = useState(null)
  const { global } = useSelector((state) => state.globalSettings);
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState('Gold');
  const [modalData, setModalData] = useState([])

  // Function to toggle the accordion
  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const handleChanges = (event, newValue) => {
    setValue1(newValue);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsAccordionOpen(false);
  };

  
  


  const {
    isLoading: isLoadingChilds,
    data: childesData,
    isError,
    error,
  } = useQuery([`category-Childes`, id], () =>
    CategoryApi.categoriesChildes(id)
  )

  const {
    isLoading: isLoadingCatgory,
    data: featuredCategories,
    refetch,
  } = useQuery([`category`], () =>
    CategoryApi.categories()
  )

  console.log('featuredCategories',featuredCategories)

  useEffect(async () => {
    let fetchId = data?.data?.data.products[JSON.parse(value) - 1]?.id
    setSubFoodId(fetchId)
  }, [category_id, data])

  useEffect(() => {
    setValue2('1')
    setValue('1')
  }, [category_id])

  const fetchPlanslist = () => {
    PlanApi.Plans().then(res => {
      setPlansList(res.data?.packages)
    }).catch(err => {
      console.error('err', err.message)
    })
  }

  const fetchFoodslist = (SubFoodId) => {
    // setSubFoodId(food_id)
    PlanApi.plansDetails(category_id, SubFoodId, value2).then(res => {
      setFoodlist(res.data?.data)
      // dispatch(setPlans(res.data?.data[0]?.package))
      // let objdata = {}
      // objdata['monday'] = res.data?.data[0]?.monday
      // objdata['tuesday'] = res.data?.data[0]?.tuesday
      // objdata['wednesday'] = res.data?.data[0]?.wednesday
      // objdata['thursday'] = res.data?.data[0]?.thursday
      // objdata['friday'] = res.data?.data[0]?.friday
      // objdata['saturday'] = res.data?.data[0]?.saturday
      // objdata['sunday'] = res.data?.data[0]?.tuesday

      // let result = Object.keys(obj).reduce((arr, day) => {
      //     let dishes = obj[day].split(',');
      //     let newObj = {};

      //     dishes.forEach(dish => {
      //       newObj[day] = dish;
      //       arr.push({ ...newObj });
      //     });

      //     return arr;
      //   }, []);

      // setFoodData(result)
      setPlanInfo(res.data?.data[0]?.package)
    }).catch(err => {
      console.error('err', err.message)
    })
  }

  useEffect(() => {
    setCategoryId(id)
  }, [id])

  useEffect(() => {
    fetchPlanslist()
  }, [])

  useEffect(() => {
    fetchFoodslist(SubFoodId)
  }, [value2, SubFoodId, category_id])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChange2 = (event, newValue) => {
    setValue2(newValue ?? event.target.value)
  }
  const handleChange3 = (newValue) => {
    setValue2(newValue)
  }


  function createData(name, food) {
    return { name, food };
  }

  const rows = [
    createData(t('Monday'), foodlist[0]?.monday),
    createData(t('TuesDay'), foodlist[0]?.tuesday),
    createData(t('Wednesday'), foodlist[0]?.wednesday),
    createData(t('Thursday'), foodlist[0]?.thursday),
    createData(t('Friday'), foodlist[0]?.friday),
    createData(t('Saturday'), foodlist[0]?.saturday),
    createData(t('Sunday'), foodlist[0]?.sunday),
  ]

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (childesData && id?.length > 0) {
      // const catetoryMenu = childesData?.data?.filter((item) =>
      //     id.includes(item.id)
      // )

      setCategoryMenus(childesData.data)
      dispatch(setSubCategories(childesData.data))
    }
    // setCategoryId(id)
  }, [childesData, id])
  let languageDirection = undefined
  if (typeof window !== 'undefined') {
    languageDirection = localStorage.getItem('direction')
  }
  return (
    <>
      <div className='mb-sm-5 mb-4'>
          <div className='category_img'>
            <img src='/static/images/banner.png' className='w-100' />
              
          </div>
      </div>

      <div className='position-relative'>

      <CustomContainer>
        <Grid container spacing={{ xs: 3, sm: 3, md: 4 }} >

        <div className="position-absolute sub-img_1">
          <img
            src="/static/images/Banner/Element_2.png"
            className="w-100"
          />
        </div>
        <div className="position-absolute sub-img_2">
          <img
            src="/static/images/Banner/Element_3.png"
            className="w-100"
          />
        </div>



        <Grid item xs={12} sm={12} md={12} align="center">
          <div className='d-flex justify-content-center mb-lg-5 mb-4 mt-3'>
            <div className='text-center mb-3'>
              <h4 className='fw-bold'>{t('Subscription For Your Perfect plan')}</h4>
            </div>
          </div>

          <div className='row justify-content-center animation-group'>
            {featuredCategories?.data?.map((categoryItem, index) => (
              <div className='col-sm-3 col-6 mb-3' data-animation="fadeInLeft" onClick={() => { setCategoryId(categoryItem?.id) }} key={index}>
                <div className={selected == index ? 'Choose_categorySelect Choose_category  d-flex justify-content-center' : 'Choose_category d-flex justify-content-center'} onClick={() => setSelected(index)}>
                  <div>
                    <img src={`${global?.base_urls?.category_image_url}/${categoryItem?.image}`} className='mb-3 category_menu' />
                    <h5 className='comlplete_1'>{t(categoryItem?.name)}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Grid> 

        {
            (data?.data ? ( <>            
                        <Grid item xs={12} sm={12} md={12} align="center">
            { data?.data?.data.products?.length > 0  &&
                                <div className="home_Plans mb-4">
                                    <TabContext value={value}>

                                            <TabList
                                                onChange={handleChange}
                                                aria-label="lab API tabs example" 
                                                sx={{ marginBottom:'15px'}}
                                            >
                                                {
                                                    data?.data?.data.products?.map((foodValue,index)=> (                                                   
                                                        <Tab
                                                            iconPosition="start"
                                                            label={t(foodValue?.name)}
                                                            value={`${index+1}`}
                                                            key={index}
                                                            sx={{ fontSize: '18px',}} 
                                                            onClick={()=>setSubFoodId(foodValue?.id)}
                                                        />
                                                    ))
                                                }

                                            </TabList>
                                            

                                        {/* <TabPanel value="1">
                                            <Grid className='' >
                                            <TabContext value={value2}  > 
                                                
                                                  <div className="chech_sub">
                                                    <div className="d-flex justify-content-center align-items-center p-2 sub-cards">
                                                      <div className="select d-flex justify-content-between d-md-none p-3 w-100">
                                                          <select className="form-select w-100"   onChange={handleChange2}> 
                                                              <option value="1" selected>{t(`Gold`)}</option> 
                                                              <option value="2">{t(`Silver`)}</option> 
                                                              <option value="3">{t('Bronze')} </option>
                                                          </select>

                                                            
                                                      </div>

                                                      <TabList
                                                            onChange={handleChange2}
                                                          className='d-md-flex d-none'
                                                            aria-label="Vertical tabs example"

                                                        >
                                                          {
                                                            planSlist?.length > 0 && 
                                                            planSlist?.slice(0,3).map((data,index)=>(
                                                              <Tab
                                                                iconPosition="start"
                                                                label={t(data?.package_name)}
                                                                value={`${data?.id}`}
                                                                key={index}
                                                                className='tabButt'
                                                                sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%',}}
                                                              />
                                                            ))
                                                          }

                                                        
                                                        
                                                        </TabList>  
                                                    </div>

                                                  </div> 

                                                    <TabPanel value="1"> 
                                                    <CustomPaperBigCard>
                                                    
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}} >
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%', }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                          </TableContainer> 
                                                        <div className='border-top p-sm-4 pt-3 pb-0'>
                                                            <div className='d-flex justify-content-between align-items-center '>
                                                              <div className='text-truncate'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>
                                                              </div>

                                                                <button className='btn btn_sub3 text-nowrap' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label="No Food Found"
                                                    />
                                                    }
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                        <CustomPaperBigCard>
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}} >
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%', }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                          </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                    
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                        <CustomPaperBigCard>
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div> 
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                        </CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                        </TabPanel>

                                        <TabPanel value="2">
                                        <Grid>
                                            <TabContext value={value2}> 
                                                <div className="SubCategories_card chech_sub">
                                                        <div className="d-flex justify-content-between align-items-center p-2 sub-cards">
                                            <div className="select d-md-none p-3 w-100">
                                                <select className="form-select w-100"   onChange={handleChange2}> 
                                                    <option value="1" selected>{t('Gold')}</option> 
                                                    <option value="2">{t('Silver')}</option> 
                                                    <option value="3">{t('Bronze')}</option>

                                                </select>
                                            </div>
                                                        <TabList
                                                            onChange={handleChange2}
                                                            className='d-md-flex d-none'
                                                            aria-label="lab API tabs example"
                                                        >
                                                  {
                                                    planSlist?.length > 0 && 
                                                    planSlist?.slice(0,3).map((data,index)=>(
                                                      <Tab
                                                        iconPosition="start"
                                                        label={t(data?.package_name)}
                                                        value={`${data?.id}`}
                                                        key={index}
                                                        className='tabButt'
                                                        sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%',}}
                                                      />
                                                    ))
                                                  }
                                                      </TabList> 
                                                      

                                                        </div>


                                                    </div> 
                                                    <TabPanel value="1">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                        <CustomPaperBigCard> 
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                    {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }
                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                        <CustomPaperBigCard>
                                                        {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>{foodlist[0]?.package?.price}₹</div>
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                  {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>

                                                    </TabContext>
                                            </Grid>
                                        </TabPanel>

                                        <TabPanel value="3">
                                             <Grid>
                                            <TabContext value={value2}> 
                                                <div className="SubCategories_card chech_sub">
                                                        <div className="d-flex justify-content-between align-items-center p-2 sub-cards">
                                                      
                                                        <div className="select d-md-none p-3 w-100">
                                                          <select className="form-select w-100"   onChange={handleChange2}> 
                                                              <option value="1" selected>{t('Gold')}</option> 
                                                              <option value="2">{t('Silver')}</option> 
                                                              <option value="3">{t('Bronze')}</option>
                                                          </select>
                                                      </div>

                                                        <TabList
                                                            onChange={handleChange2}
                                                            className='d-md-flex d-none'
                                                            aria-label="lab API tabs example"
                                                        >
                                                
                                                {
                                                    planSlist?.length > 0 && 
                                                    planSlist?.slice(0,3).map((data,index)=>(
                                                      <Tab
                                                        iconPosition="start"
                                                        label={t(data?.package_name)}
                                                        value={`${data?.id}`}
                                                        key={index}
                                                        className='tabButt'
                                                        sx={{ fontSize: '17px',minHeight:'60px',color:'black' ,width:'100%',}}
                                                      />
                                                    ))
                                                  }
                                                
                                                            </TabList> 
                                                      

                                                        </div>


                                                    </div> 
                                                    <TabPanel value="1">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                  {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                  {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                    />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                    <CustomPaperBigCard>
                                                    {
                                                          foodlist?.length > 0 &&   <div >
                                                          <TableContainer component={Paper}>
                                                          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                            <TableBody>
                                                              {( rows
                                                              ).map((row) => (
                                                                <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}}>
                                                                  <TableCell component="th" scope="row">
                                                                    {row.name}
                                                                  </TableCell>
                                                                  <TableCell component="th" scope="row">
                                                                    -
                                                                  </TableCell>
                                                                  <TableCell style={{ width:'100%' }} align="left">
                                                                    {row.food}
                                                                  </TableCell>
                                                                </TableRow>
                                                              ))}
                                                              {emptyRows > 0 && (
                                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                                  <TableCell colSpan={6} />
                                                                </TableRow>
                                                              )}
                                                            </TableBody>
                                                          </Table>
                                                        </TableContainer> 
                                                        <div className='border-top p-4 pb-0'>
                                                            <div className='d-sm-flex justify-content-between align-items-center '>
                                                              <div className='mb-sm-0 mb-3'>
                                                              
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                                                                    <div>₹{foodlist[0]?.package?.price}</div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                  <CustomRatings
                                                                  readOnly={true}
                                                                  ratingValue={foodlist[0]?.food?.rating_count}
                                                                  />
                                                                </div>

                                                              </div>
                                                                <button className='btn btn_sub3' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                                                            </div>
                                                            </div>
                                                          </div>
                                                    }
                                                  {
                                                        foodlist?.length  == 0 && 
                                                        <CustomEmptyResult
                                                        image={noData}
                                                        label=" No Food Found"
                                                        />
                                                    }

                                                    </CustomPaperBigCard>
                                                    </TabPanel>
                                                    </TabContext>
                                            </Grid>
                                        </TabPanel> */}
                                    </TabContext>
                                </div>
            }
                            </Grid>
                        
                        {data?.data?.data.products?.length === 0 && (
                            <CustomEmptyResult
                                image={noData}
                                label=" No Food Found"
                                className='mb-4'
                            />
                        )}
              </> ) : (
                <CustomShimmerForBestFood />
            ))
        }
        <div className='d-none'>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            container
            spacing={{ xs: 1, md: 2 }}
            justifyContent={'center'}
          >
            {foodOrRestaurant === 'products' &&
              (data?.data ? (
                <>
                  <ProductList
                    product_list={data?.data?.data}
                    offset={offset}
                    plansDetails={foodlist?.length > 0 && foodlist[0]}
                    page_limit={page_limit}
                    setOffset={setOffset}
                  />
                  {data?.data?.data.products?.length === 0 && (
                    <CustomEmptyResult
                      image={noData}
                      label=" No Food Found"
                    />
                  )}
                </>
              ) : (
                <CustomShimmerForBestFood />
              ))}

            {foodOrRestaurant === 'restaurants' &&
              (resData ? (
                <>
                  <RestaurantsData
                    resData={resData}
                    offset={offset}
                    page_limit={page_limit}
                    setOffset={setOffset}
                    global={global}
                  />
                  {resData.data.total_size === 0 && (
                    <CustomStackFullWidth sx={{ mt: '10px' }}>
                      <CustomEmptyResult
                        image={noRestaurants}
                        label="No Restaurants Found"
                      />
                    </CustomStackFullWidth>
                  )}
                </>
              ) : (
                <>
                  <CustomShimmerRestaurant />
                </>
              ))}
          </Grid>
        </div>
        </Grid>
      </CustomContainer>

      <CustomContainer>
        <div class="d-flex justify-content-center align-items-center w-100">
          <div class="w-100" >

            <nav>
              <div class="nav nav-tabs mb-md-5 mb-4 nav-border" id="nav-tab" role="tablist">
                <div className='row justify-content-center'>
                  {
                     planSlist?.length > 0 && 
                     planSlist?.slice(0,3).map((data,index)=>(
                      <div className='col-lg-4 col-sm-4 col-4 text-center' key={index} onClick={()=>setValue2(data?.id)}>
                      <div className='d-flex justify-content-center'>
                      <button class={`nav-link ${value2 == data?.id && 'active'} tap-border-none`} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        <div className='position-sm-relative'>
                          <img className='subscribe_img' src='/static/images/subscribe_png.png'></img>
                          <p className="mb-0 para_position">{t(data?.package_name)}</p>
                          <div className='gold_position'>
                            <img className='golden_img' src='/static/images/gold.png'></img>
                          </div>
                        </div>
                      </button>
                      </div>
                      </div>
                     ))
                  }

                </div>

              </div>
            </nav>
            <div className=''>
              <h3 className='menu_text'>{t("Check Menu of the Week")}</h3>
            </div>
            <div >
            <CustomPaperBigCard>
                                                    
              {
                foodlist?.length > 0 &&   
                <div>
                  <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                      {( rows
                      ).map((row) => (
                        <TableRow key={row.name} sx={{whiteSpace:'break-spaces'}} >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            -
                          </TableCell>
                          <TableCell style={{ width:'100%', }} align="left">
                            {row.food}
                          </TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  </TableContainer> 
                  <div className='border-top p-sm-4 pt-3 pb-0'>
                    <div className='d-flex justify-content-between align-items-center '>
                      <div className='text-truncate'>
                      
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className=''><h6 className='mb-0'>{t('Plan Price')} -</h6></div>
                            <div>₹{foodlist[0]?.price}</div>
                        </div>
                        <div className='mt-2'>
                          <CustomRatings
                          readOnly={true}
                          ratingValue={foodlist[0]?.food?.rating_count}
                          />
                        </div>
                      </div>

                        <button className='btn btn_sub3 text-nowrap' onClick={()=> document.getElementById(`addTocartCheckout${SubFoodId}`)?.click()}  type='button'>{t('Add to cart')}</button>
                    </div>
                  </div>
                </div>
              }
              {
                  foodlist?.length  == 0 && 
                  <CustomEmptyResult
                  image={noData}
                  label="No Food Found"
              />
              }
            </CustomPaperBigCard>
            </div>
            {/* <div class="tab-content tap-shadow d-none" id="nav-tabContent">
              <div class="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                
                <div>
                  <Box className='scroll_tap_width' >
                    <TabContext value={value1} >
                      <div className='d-flex justify-content-center '>
                      <Tabs
                        value={value1}
                        onChange={handleChanges}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="full width scrollable auto tabs example"
                        className='d-flex justify-content-between w-100 tap-top-bg' 
                        centered
                      > 
                      
                        <Tab label="SUNDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width'/>
                        <Tab label="MONDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width'/>
                        <Tab label="TUESDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="WEDNESDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="THURSDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="FRIDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="SATURDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                     
        
                      </Tabs>
                      </div>

                        <TabPanel value={0} className='tap_padding'>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                        <TabPanel value={1} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                        <TabPanel value={2} className='tap_padding' >
                        
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          
                        </TabPanel>

                        <TabPanel value={3}  className='tap_padding'>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                        <TabPanel value={4} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                        <TabPanel value={5} className='tap_padding' >
                          
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          
                        </TabPanel>

                        <TabPanel value={6} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                    </TabContext>
                  </Box>
                  <div className='tap_border'></div>
                  <div className='price_plan'>
                    <div>
                      <h5>Price Plan - ₹2000</h5>
                    </div>
                    <div>
                      <button className='cart_button'>Add to Cart</button>
                    </div>
                  </div>
                </div>

              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                
                <div>
                  <Box className='scroll_tap_width'>
                    <TabContext value={value1}>
                      <Tabs
                        value={value1}
                        onChange={handleChanges}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="full width scrollable auto tabs example"
                        className='d-flex justify-content-between w-100 tap-top-bg' 
                        centered
                      > 
                          <Tab label="SUNDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width'/>
                          <Tab label="MONDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width'/>
                          <Tab label="TUESDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                          <Tab label="WEDNESDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                          <Tab label="THURSDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                          <Tab label="FRIDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                          <Tab label="SATURDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />

                      </Tabs>

                        <TabPanel value={0} className='tap_padding'>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                        <TabPanel value={1} className='tap_padding' >
                          
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          
                        </TabPanel>

                        <TabPanel value={2} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                        </TabPanel>

                        <TabPanel value={3} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          
                        </TabPanel>

                        <TabPanel value={4} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          
                        </TabPanel>

                        <TabPanel value={5} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                        <TabPanel value={6} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                        </TabPanel>

                    </TabContext>
                  </Box>
                  <div className='tap_border'></div>
                  <div className='price_plan'>
                    <div>
                      <h5>Price Plan - ₹1500</h5>
                    </div>
                    <div>
                      <button className='cart_button'>Add to Cart</button>
                    </div>
                  </div>
                </div>

              </div>
              <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                
              <div>
                <Box className='scroll_tap_width'>
                  <TabContext value={value1}>
                      <Tabs
                        value={value1}
                        onChange={handleChanges}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="full width scrollable auto tabs example"
                        className='d-flex justify-content-between w-100 tap-top-bg' 
                        centered
                      > 
                        <Tab label="SUNDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width'/>
                        <Tab label="MONDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width'/>
                        <Tab label="TUESDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="WEDNESDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="THURSDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="FRIDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                        <Tab label="SATURDAY" sx={{ minWidth: "fit-content", flex: 1 }} className='tap_content_width' />
                      

                    </Tabs>

                      <TabPanel value={0} className='tap_padding' >
                        <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                      </TabPanel>

                      <TabPanel value={1} className='tap_padding'>
                        <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                        <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                      </TabPanel>

                      <TabPanel value={2} className='tap_padding' >
                          
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                      </TabPanel>

                      <TabPanel value={3} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                      </TabPanel>

                      <TabPanel value={4} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                      </TabPanel>

                      <TabPanel value={5} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                      </TabPanel>

                      <TabPanel value={6} className='tap_padding' >
                          <div>
                            <h5 className='meals_title'>Breakfast</h5>
                            <p>Idly [2 Nos], Medhu Vadai, Ghee Masala Dosai, Ghee Pongal, Uttapam, Coconut Chutney</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Lunch</h5>
                            <p>Rice, Sambar, Rasam, Potato Fry, Poriyal & Appalam</p>
                          </div>
                          <div className='meals_iteam_border'></div>
                          <div>
                            <h5 className='meals_title'>Dinner</h5>
                            <p>Mini Ghee Idly, Sambar, Kaju Sweets (Or) Kalkand, Coconut Chutney, Special Chutney, Idli Podi</p>
                          </div>
                      </TabPanel>

                  </TabContext>
                </Box>
                <div className='tap_border'></div>
                <div className='price_plan'>
                  <div>
                    <h5>Price Plan - ₹2500</h5>
                  </div>
                  <div>
                    <button className='cart_button'>Add to Cart</button>
                  </div>
                </div>
              </div>

              </div>
            </div> */}
          </div>
        </div>  
      </CustomContainer>
      </div>

    </>
  )
}

export default CategoryDetailsPage
