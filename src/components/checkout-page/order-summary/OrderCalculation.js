import React, { useEffect, useState } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import {
    getAmount,
    getCalculatedTotal,
    getCouponDiscount,
    getDeliveryFees,
    getDeliveryFees2,
    getProductDiscount,
    getSubTotalPrice,
    getTaxableTotalPrice,
    rainySeasonCharge,
    truncate,
    getTotalPlanPrice
} from '../../../utils/customFunctions'
import { CalculationGrid, TotalGrid } from '../CheckOut.style'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setCouponType } from '../../../redux/slices/global'
import { useTheme } from '@mui/material/styles'
import CustomDivider from '../../CustomDivider'
import {
    setSubcreitionSubTottal,
    setSubscriptionSubTotal,
    setTotalAmount,
} from '../../../redux/slices/cart'
import { getSubscriptionOrderCount } from '../functions/getSubscriptionOrderCount'
import HaveCoupon from '../HaveCoupon'


const OrderCalculation = (props) => {
    const {
        subscriptionStates,
        cartList,
        restaurantData,
        couponDiscount,
        taxAmount,
        distanceData,
        total_order_amount,
        global,
        orderType,
        couponInfo,
        deliveryTip,
        origin,
        destination,
        extraCharge,
        setFoodAmount,
        setCouponDiscounts,
        counponRemoves,
        foodAmounts
    } = props
    const { couponType, zoneData } = useSelector(
        (state) => state.globalSettings
    )

    const { t } = useTranslation()
    const [freeDelivery, setFreeDelivery] = useState('false')
    const [lastTotal, setLastTotal] = useState(0)
    const theme = useTheme()

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const languageDirection = localStorage.getItem('direction')
    const subscriptionOrderCount = getSubscriptionOrderCount(
        restaurantData?.data?.schedules,
        subscriptionStates?.type,
        subscriptionStates?.startDate,
        subscriptionStates?.endDate,
        subscriptionStates?.days
    )
    const totalPrice = getCalculatedTotal(
        cartList,
        couponDiscount,
        restaurantData,
        global,
        distanceData,
        couponType,
        orderType,
        freeDelivery,
        deliveryTip,
        zoneData,
        origin,
        destination,
        extraCharge,
    )


    // useEffect(() => {
    //     setLastTotal(
    //         getDeliveryFees(
    //             restaurantData,
    //             global,
    //             cartList,
    //             distanceData?.data,
    //             couponDiscount,
    //             couponType,
    //             orderType,
    //             zoneData,
    //             origin,
    //             destination,
    //             extraCharge,
    //             lastTotal
    //         )
    //     )
    // }, [orderType])



    const handleDeliveryFee = () => {
        // const restaurantChargeInfo = zoneData?.find(
        //     (item) =>
        //         Number.parseInt(item.id) ===
        //         Number.parseInt(restaurantData?.data?.zone_id)
        // )
        let price = getDeliveryFees(
            restaurantData,
            global,
            cartList,
            distanceData?.data,
            couponDiscount,
            couponType,
            orderType,
            zoneData,
            origin,
            destination,
            extraCharge
        ) 
         
        
        if (price === 0) {
            return <Typography variant="h4">{t('Free')}</Typography>
        } else {
            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={0.5}
                    width="100%"
                >
                    <Typography variant="h4">{'(+)'}</Typography>
                    <Typography variant="h4">
                        {restaurantData &&
                            getAmount(
                                price,
                                // cartList[0]?.plans?.delivery_charge,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                    </Typography>
                </Stack>
            )
        }

    }

    useEffect(() => {
        setFoodAmount(getSubTotalPrice(cartList))
    }, [])

    const handleCouponDiscount = () => {
        let couponDiscountValue = getCouponDiscount(
            couponDiscount,
            restaurantData,
            cartList
        )
        if (couponDiscount && couponDiscount.coupon_type === 'free_delivery') {
            setFreeDelivery('true')
            return 0
        } else {
            let discount = getAmount(
                couponDiscountValue,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
            return discount
        }
    }


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCouponType(''))
    }, [])

    const handleOrderAmount = () => {
        let totalAmount = 0
        if (subscriptionOrderCount > 0) {
            // totalAmount = getTotalPlanPrice(cartList) +
            totalAmount =
                truncate(totalPrice.toString(), digitAfterDecimalPoint)
            // * subscriptionOrderCount
        } else {
            totalAmount = totalPrice
        }
        dispatch(setTotalAmount(totalAmount))
        return getAmount(
            totalAmount,
            currencySymbolDirection,
            currencySymbol,
            digitAfterDecimalPoint
        )
    }



    const handleOrderAmountWithoutSubscription = () => {
        return getAmount(
            totalPrice,
            currencySymbolDirection,
            currencySymbol,
            digitAfterDecimalPoint
        )
    }

    useEffect(() => {
        if (subscriptionStates?.order === '1') {
            dispatch(
                setSubscriptionSubTotal(handleOrderAmountWithoutSubscription())
            )
        }
    }, [subscriptionStates])

    const vat = t('VAT/TAX')
    return (
        <>
            <CalculationGrid container item md={12} xs={12} spacing={1}>
                {/* <Grid item md={8} xs={8}>
                {t('Plans')}
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={4}
                    align={languageDirection === 'rtl' ? 'left' : 'right'}
                >
                    <Typography variant="h4">
                                     {getAmount(
                                            cartList[0]?.plans?.price,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                        
                    </Typography>
                </Grid> */}
                <Grid item md={8} xs={8}>
                    <Typography fontWeight={500} >
                        {subscriptionOrderCount > 0
                            ? t('Subtotal')
                            : t('Subtotal')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={4}
                    align={languageDirection === 'rtl' ? 'left' : 'right'}
                >
                    <Typography variant="h4">
                        {getAmount(
                            getSubTotalPrice(cartList),
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </Typography>
                </Grid>
                {/* <Grid item md={8} xs={8}>
                    {t('Discount')}
                </Grid>
                <Grid item md={4} xs={4} align="right">
                    <Stack
                        width="100%"
                        direction="row"
                        alignPlan="center"
                        justifyContent="flex-end"
                        spacing={0.5}
                    >
                        <Typography variant="h4">{'(-)'}</Typography>
                        <Typography variant="h4">
                            {restaurantData &&
                                getAmount(
                                    getProductDiscount(
                                        cartList,
                                        restaurantData
                                    ),
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                        </Typography>
                    </Stack>
                </Grid> */}
                {couponDiscount && (
                    <>
                        <Grid item md={8} xs={8}>
                            <Typography fontWeight={500} >
                                {t('Coupon Discount')}
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            {couponDiscount.coupon_type === 'free_delivery' ? (
                                <p>{t('Free Delivery')}</p>
                            ) : (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0.5}
                                >
                                    <Typography variant="h4">
                                        {'(-)'}
                                    </Typography>
                                    <Typography variant="h4">
                                        {restaurantData &&
                                            cartList &&
                                            handleCouponDiscount()}
                                    </Typography>
                                </Stack>
                            )}
                        </Grid>
                    </>
                )}
                {restaurantData &&
                    restaurantData?.data &&
                    restaurantData?.data?.tax && (
                        <>
                            <Grid item md={8} xs={8}>
                                <Typography fontWeight={500} >
                                    {`${vat} (${restaurantData?.data?.tax}% ${global?.tax_included === 1
                                            ? t('included')
                                            : t('excluded')
                                        })`}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4} align="right">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0.5}
                                >
                                    <Typography variant="h4">
                                        {global?.tax_included === 1
                                            ? ''
                                            : '(+)'}
                                    </Typography>
                                    <Typography variant="h4">
                                        {restaurantData &&
                                            getAmount(
                                                getTaxableTotalPrice(
                                                    cartList,
                                                    couponDiscount,
                                                    restaurantData
                                                ),
                                                currencySymbolDirection,
                                                currencySymbol,
                                                digitAfterDecimalPoint
                                            )}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </>
                    )}
                {Number.parseInt(global?.dm_tips_status) === 1 &&
                    deliveryTip > 0 && (
                        <>
                            <Grid item md={8} xs={8}>
                                <Typography fontWeight={500} >
                                    {t('Deliveryman tips')}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={4} align="right">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0.5}
                                >
                                    <Typography variant="h4">
                                        {'(+)'}
                                    </Typography>
                                    <Typography variant="h4">
                                        {getAmount(
                                            deliveryTip,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </>
                    )}

                <Grid item md={8} xs={8}>
                    <Typography fontWeight={500} >
                        {t('Delivery fee')}
                    </Typography>
                </Grid>
                <Grid item md={4} xs={4} align="right">
                    {
                        // orderType === 'delivery' ? (
                        couponDiscount ? (
                            couponDiscount?.coupon_type === 'free_delivery' ? (
                                <p>{t('Free')}</p>
                            ) : (
                                restaurantData && handleDeliveryFee()
                            )
                        ) : (
                            restaurantData && handleDeliveryFee()
                        )
                        // ) : (
                        //     <p>{t('Free')}</p>
                        // )
                    }
                    {/*{couponDiscount ? (*/}
                    {/*    couponDiscount?.coupon_type === 'free_delivery' ? (*/}
                    {/*        <p>{t('Free')}</p>*/}
                    {/*    ) : (*/}
                    {/*        restaurantData && handleDeliveryFee()*/}
                    {/*    )*/}
                    {/*) : (*/}
                    {/*    restaurantData && handleDeliveryFee()*/}
                    {/*)}*/}
                </Grid>
                <div className='mt-3 w-100'>
                    <HaveCoupon
                        restaurant_id={restaurantData?.data?.id}
                        setCouponDiscount={setCouponDiscounts}
                        counponRemove={counponRemoves}
                        couponDiscount={couponDiscount}
                        foodAmount={foodAmounts}
                    />
                </div>
                <CustomDivider />
                {/* {subscriptionOrderCount > 0 && (
                    <>
                        <TotalGrid container md={12} xs={12} mt="1rem">
                            <Grid item md={8} xs={8} pl=".5rem">
                                <Typography>{t('Subtotal')}</Typography>
                            </Grid>
                            <Grid
                                item
                                md={4}
                                xs={4}
                                align={
                                    languageDirection === 'rtl'
                                        ? 'left'
                                        : 'right'
                                }
                            >
                                <Typography>
                                    {restaurantData &&
                                        cartList &&
                                        handleOrderAmountWithoutSubscription()}
                                </Typography>
                            </Grid>
                        </TotalGrid>
                        <Grid item md={8} xs={8}>
                            <Typography color={theme.palette.primary.main}>
                                {t('Subscription Order Count')}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={4}
                            align={
                                languageDirection === 'rtl' ? 'left' : 'right'
                            }
                        >
                            <Typography variant="h4">
                                {getSubscriptionOrderCount(
                                    restaurantData?.data?.schedules,
                                    subscriptionStates.type,
                                    subscriptionStates.startDate,
                                    subscriptionStates.endDate,
                                    subscriptionStates.days
                                )}
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={8}>
                {t('Plans')}
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={4}
                    align={languageDirection === 'rtl' ? 'left' : 'right'}
                >
                    <Typography variant="h4">
                        {getAmount(
                            getTotalPlanPrice(cartList),
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                        
                    </Typography>
                </Grid>

                        <CustomDivider />
                    </>
                )} */}
                <TotalGrid container md={12} xs={12} mt="1rem">
                    <Grid item md={8} xs={8} pl=".5rem">
                        {/* <Typography fontWeight={500} color={theme.palette.primary.main}> */}
                        <Typography fontWeight={500} >
                            {t('Grand Total')}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        xs={4}
                        align={languageDirection === 'rtl' ? 'left' : 'right'}
                    >
                        <Typography fontWeight={500} color={theme.palette.primary.main}>
                            {restaurantData && cartList && handleOrderAmount()}
                        </Typography>
                    </Grid>
                </TotalGrid>
                {/* <CustomDivider /> */}
                <Stack width="100%" sx={{ mt: "13px", borderBottom: `2px solid ${theme.palette.neutral[300]}` }}></Stack>
            </CalculationGrid>
        </>
    )
}

OrderCalculation.propTypes = {}

export default OrderCalculation
