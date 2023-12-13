import React, { useState, useEffect } from 'react'
import { DeliveryCaption, DeliveryTitle } from './CheckOut.style'
import { useTranslation } from 'react-i18next'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Avatar } from '@mui/material';
import Radio from '@mui/material/Radio'
import DeliveryAddress from './DeliveryAddress'
import { CustomPaperBigCard, CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import OrderType from "./order-type";
import AdditionalAddresses from "./AdditionalAddresses";
import AddNewAddress from '../user-info/address/AddNewAddress'
import CustomSelectWithFormik from '../custom-select/CustomSelectWithFormik'
// import { InputLabel, MenuItem, Select } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { ImageSource } from '../../utils/ImageSource'
import { getAmount, getSelectedAddOn } from '../../utils/customFunctions'
import { handleTotalAmountWithAddonsFF } from '../../utils/customFunctions'
import { incrementProductQty, decrementProductQty, removeProduct, setUpdateAddress } from '../../redux/slices/cart'
import { AddressApi } from '../../hooks/react-query/config/addressApi'
import { useQuery } from 'react-query'
import { onSingleErrorResponse } from '../ErrorResponse'
import { ACTIONS } from "./states";
import dayjs, { Dayjs } from 'dayjs';
import moment from "moment";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import Select from 'react-select';


const getZoneWiseAddresses = (addresses, restaurantId) => {
    const newArray = []
    addresses.forEach(item => item.zone_ids.includes(restaurantId) && newArray.push(item))
    return newArray

}

const DeliveryDetails = (props) => {
    const { global, restaurantData, setOrderType, orderType, setAddress, address, subscriptionStates, subscriptionDispatch, page,
        additionalInformationStates,
        additionalInformationDispatch } =
        props
    const { t } = useTranslation()
    const { cartList } = useSelector((state) => state.cart)
    const productBaseUrl = global?.base_urls?.campaign_image_url

    const dispatch = useDispatch()

    const [allAddress, setAllAddress] = useState()


    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const [data, setData] = useState(null)

    useEffect(() => {
        subscriptionDispatch({ type: ACTIONS.setSubscriptionType, payload: 'daily' })
        let time = dayjs().format('H:mm:ss')
        const days = [{ day: `${moment().day()}`, time }]
        subscriptionDispatch({ type: ACTIONS.setSubscriptionDays, payload: days })
    }, [])
     
    console.log('addressaddressaddress',address)

    const handleDateRange = (value) => {
        const isSame = moment(value[0], 'yyyy/MM/DD HH:mm').isSame(moment(value[1], 'yyyy/MM/DD HH:mm'))

        if (isSame) {
            toast.error(t('Start date and end date can not be same for subscription orders.'))
        }
        else {
            subscriptionDispatch({ type: ACTIONS.setStartDate, payload: moment(value[0]).format('yyyy/MM/DD HH:mm') })
            subscriptionDispatch({ type: ACTIONS.setEndDate, payload: moment(value[1]).format('yyyy/MM/DD HH:mm') })
        }
    }

    const handleStartDateChange = (newValue) => {
        const endDate = moment(newValue).add(29, "days").toDate();
        handleDateRange([newValue, endDate])
    };




    const handleSuccess = (response) => {
        if (restaurantData?.data?.zone_id) {
            const newObj = {
                ...response.data,
                addresses: getZoneWiseAddresses(response.data.addresses, restaurantData?.data?.zone_id)
            }
            setData(newObj)
        } else {
            setData(response.data)
        }

    }


    const { refetch, isRefetching } = useQuery(
        ['address-list'],
        AddressApi.addressList,
        {
            enabled: false,
            onSuccess: handleSuccess,
            onError: onSingleErrorResponse,
        }
    )

    useEffect(async () => {
        await refetch()
    }, [restaurantData?.data?.zone_id])

    useEffect(() => {
        // handleSize(data.total_size)
        data && setAllAddress([...data.addresses])
    }, [data])



    const handleClick = (values, index) => {
        // setAddress({ ...values, lat: values.latitude, lng: values.longitude })
        setAddress((p) => {
            const newAdd = [...p]
            newAdd[index] = { ...values, lat: values.latitude, lng: values.longitude }
            return newAdd
        })
    }





    return (<>
        <CustomPaperBigCard>
            <CustomStackFullWidth>
                {/* <DeliveryTitle>{global?.cash_on_delivery && restaurantData?.data?.order_subscription_active && t('ORDER TYPE &')} {t('DELIVERY DETAILS')}</DeliveryTitle> */}
                <div className='d-flex justify-content-between mb-3'>
                    <div className=''>
                        <h4 className='fw-bold fs-20'>{t("Order Details")}</h4>
                    </div>
                    <AddNewAddress  refetch={refetch} buttonbg="true" />
                </div>

                <CustomStackFullWidth>
                    {
                        cartList.map((item, index) => (<>
                            <div className='mb-2'>
                                <h6 className='fw-bold '>{t(item?.name)}-{t(item?.plans?.package?.package_name)}</h6>
                            </div>
                            <div className='border rounded p-3 mb-3'>
                                <div className='d-flex justify-content-between border-bottom mb-2'>
                                    <div className='mb-3 d-flex justify-content-start'>
                                        <div className=''>
                                            <img src='/static/images/Categories/1.png' className='check_img' />
                                        </div>
                                        <div className='ms-2'>
                                            <h6 className='fw-bold'>{t(item?.plans?.category?.name)}</h6>
                                            <h6 className='text_color fw-bold'>
                                                {getAmount(
                                                    handleTotalAmountWithAddonsFF(
                                                        item?.plans?.price,
                                                        item?.selectedAddons
                                                    ),
                                                    currencySymbolDirection,
                                                    currencySymbol,
                                                    digitAfterDecimalPoint
                                                )}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        {
                                            <button type='button' disabled={item?.quantity === 1} className='check_btn btn text-center d-flex align-items-center'
                                                onClick={() =>
                                                    dispatch(
                                                        decrementProductQty(
                                                            {
                                                                ...item,
                                                            }
                                                        )
                                                    )
                                                }
                                            >-</button>
                                        }
                                        <span className='mx-2'>{item.quantity}</span>
                                        <button type='button' className='check_btn btn d-flex align-items-center text-center'
                                            onClick={() =>
                                                dispatch(
                                                    incrementProductQty(
                                                        {
                                                            ...item,
                                                        }
                                                    )
                                                )
                                            }
                                        >+</button>
                                    </div>
                                </div>
                                <div>
                                    {
                                         orderType[index] === 'delivery' && 
                                                <h6>{t("Delivery Address")}</h6>
                                    }

                                    <div className='mb-2 check_s' >
                                        {
                                            orderType[index] === 'delivery' &&
                                            // <Select
                                            //     id="demo-simple-select"
                                            //     className='w-100'
                                            //     value={address[index]?.id}
                                            //     sx={{ maxHeight: '260px' }}
                                            // >
                                            //     <MenuItem disabled value="" selected>
                                            //         <em>Select Address</em>
                                            //     </MenuItem>
                                            //     {
                                            //         allAddress?.map((adres, index) => (
                                            //             <MenuItem value={adres.id} onClick={() => handleClick(adres, index)} sx={{
                                            //                 '&:hover': {
                                            //                     backgroundColor:
                                            //                         'primary.dark',
                                            //                 },
                                            //                 width: '550px'
                                            //             }} key={index}>{adres?.address}</MenuItem>
                                            //         ))
                                            //     }
                                            // </Select>
                                            <Select
                                                closeMenuOnSelect={true}
                                                isSearchable={false}
                                                name="address"
                                                placeholder={t('Select Address')}
                                                value={address[index]}
                                                onChange={(e) => handleClick(e, index)}
                                                getOptionLabel={(option) => `${option.address}`}
                                                getOptionValue={(option) => option}
                                                options={allAddress}
                                                className="w-100"
                                                classNamePrefix="select" 
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                      ...theme.colors,
                                                      primary25: '#fef6f8',
                                                      primary: '#e01d57',
                                                    },
                                                  })}
                                            />
                                            // <DeliveryAddress setAddress={setAddress} address={address} items={item} additionalInformationDispatch={additionalInformationDispatch} restaurantId={restaurantData?.data?.zone_id} />
                                        }
                                    </div>
                                    <div className='d-xl-flex justify-content-between align-items-center check_label check_raa'>
                                        {
                                            index == 0 &&
                                            <div class="form-check align-items-center mb-xl-0 mb-2 cursor-pointer"   >
                                                <input class="form-check-input"  checked={address?.every(loc => loc === address[0]) && address?.every(loc => loc !== '') ? true : false}  type="checkbox" onChange={() => {
                                                    if(address?.every(loc => loc === address[0]) && address?.every(loc => loc !== '')) { 
                                                        setAddress((p) => {
                                                            // return Array(cartList?.length).fill('')
                                                            const newAdd = [...p]
                                                            address.map((v,i)=> {
                                                                newAdd[i+1] = ''
                                                            })
                                                            return newAdd
                                                        })
                                                    }else{
                                                        setAddress((p) => {
                                                            const valu = p.filter((e) => e != undefined)
                                                            return Array(cartList?.length).fill(valu[0])
                                                        })
                                                    }
                                                }} value="" id="flexCheckDefaultaddress" />
                                                <label class="form-check-label text-secondary " for="flexCheckDefault" onClick={()=> document.getElementById('flexCheckDefaultaddress')?.click()}>
                                                    <span className='fs-11'> {t("All Delivery Will Be Sent To The Same Address")}.</span>
                                                </label>
                                            </div>
                                        }
                                        {restaurantData?.data && (
                                            <RadioGroup
                                                defaultValue="delivery"
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                onChange={(e) => setOrderType((p) => {
                                                    const addon = [...p]
                                                    addon[index] = e.target.value
                                                    return addon;
                                                })}

                                                className={`justify-content-center ${index != 0 && 'w-100'}`}
                                            >
                                                {restaurantData?.data?.delivery && (
                                                    <div onClick={() => document.getElementById(`radioONSelect${index}`)?.click()} className={`d-flex cursor-pointer align-items-center  ${orderType[index] == 'delivery' ? 'Delivery_opt' : 'Delivery_off'} checkjj p-2 me-1 mb-xl-0  mb-2`}>
                                                        <FormControlLabel
                                                            value="delivery"
                                                            control={<Radio size='small' />}
                                                            // label={t('Delivery')} 
                                                            sx={{
                                                                marginLeft: '0px',
                                                                marginRight: '0px',
                                                                fontSize: '13px'
                                                            }}
                                                            id={`radioONSelect${index}`}
                                                        />
                                                        <img src={orderType[index] == 'delivery' ? '/static/images/Icons/13.png' : '/static/images/Icons/14.png'} className='icon me-1' />
                                                        <h6 className='mb-0 fs-11'>{t('Delivery')}</h6>
                                                    </div>
                                                )}
                                                {restaurantData?.data?.take_away && (
                                                    // <FormControlLabel
                                                    //     value="take_away"
                                                    //     control={<Radio />}
                                                    //     label={t('Takeaway')}

                                                    // />
                                                    <div onClick={() => document.getElementById(`radioONSelect2${index}`)?.click()} className={`d-flex cursor-pointer align-items-center checkjj  ${orderType[index] == 'take_away' ? 'Delivery_opt' : 'Delivery_off'} p-2 mb-xl-0  mb-2`}>
                                                        <FormControlLabel
                                                            value="take_away"
                                                            control={<Radio size='small' />}
                                                            // label={t('Delivery')} 
                                                            sx={{
                                                                marginLeft: '0px',
                                                                marginRight: '0px',
                                                                fontSize: '13px'
                                                            }}
                                                            id={`radioONSelect2${index}`}
                                                        />
                                                        <img src={orderType[index] == 'take_away' ? '/static/images/Icons/17.png' : '/static/images/Icons/18.png'} className='icon me-1' />
                                                        <h6 className='mb-0 fs-11'>{t('Takeaway')}</h6>
                                                    </div>
                                                )}
                                            </RadioGroup>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                        ))
                    }
                </CustomStackFullWidth>



                {/* <FormControl>
                    {page!=='campaign' && global?.cash_on_delivery && restaurantData?.data?.order_subscription_active && <OrderType t={t} subscriptionStates={subscriptionStates}
                                                        subscriptionDispatch={subscriptionDispatch}/>}

                    <DeliveryCaption const id="demo-row-radio-buttons-group-label">
                        {t('Delivery Options')}
                    </DeliveryCaption>
                    {restaurantData?.data && (
                        <RadioGroup
                            defaultValue="delivery"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => setOrderType(e.target.value)}
                        >
                            {restaurantData?.data?.delivery && (
                                <FormControlLabel
                                    value="delivery"
                                    control={<Radio/>}
                                    label={t('Home Delivery')}
                                />
                            )}
                            {restaurantData?.data?.take_away && (
                                <FormControlLabel
                                    value="take_away"
                                    control={<Radio/>}
                                    label={t('Take Away')}
                                />
                            )}
                        </RadioGroup>
                    )}
                </FormControl> */}

                {/* {orderType === 'delivery' && (
                    <DeliveryAddress setAddress={setAddress} address={address} additionalInformationDispatch={additionalInformationDispatch} restaurantId={restaurantData?.data?.zone_id} />
                )} */}
                {/* <AdditionalAddresses t={t}  additionalInformationStates={additionalInformationStates}
                                     additionalInformationDispatch={additionalInformationDispatch}/> */}
            </CustomStackFullWidth>
        </CustomPaperBigCard>

        <CustomPaperBigCard mt='1.5rem'>
            <div className='mb-3'>
                <h4 className='fw-bold fs-20'>{t("Select Date")}</h4>
            </div>
            <div className=''>
                <label className="form-label fw-bold">{t("Start")}</label>
                <input type="date" className="form-control mb-2" placeholder="" onChange={(e) => handleStartDateChange(e.target.value)} />
                <h7 className='text-secondary'>{t("Subscription For The Upcoming 30 Days")}</h7>
            </div>
        </CustomPaperBigCard>
    </>
    )
}

DeliveryDetails.propTypes = {}

export default DeliveryDetails
