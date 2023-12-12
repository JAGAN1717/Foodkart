import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Stack, Typography } from '@mui/material'
import {
    PaymentButton,
    PaymentOptionGrid,
    PymentTitle,
} from '../CheckOut.style'
import cash from '../../../../public/static/buttonImg/cashonbtn.png'
import digital from '../../../../public/static/buttonImg/digitalbtn.png'
import wallet from '../../../../public/static/buttonImg/walletbtn.png'
import { useTranslation } from 'react-i18next'
import {
    CustomCheckBoxStack,
    CustomPaperBigCard,
} from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import placeholder from '../../../../public/static/no-image-found.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Radio from '@mui/material/Radio'

import { useTheme } from '@mui/material/styles'

const PaymentOptions = (props) => {
    const theme = useTheme()
    const { global, paymenMethod, setPaymenMethod, subscriptionStates } = props
    const { t } = useTranslation()
    return (
        <CustomPaperBigCard>
            <Grid container spacing={2}>
                {/* <Grid item xs={12} md={12} align="center">
                    <PymentTitle>{t('Payment Options')}</PymentTitle>
                </Grid> */}
                    <div className='mb-3'>
                <h4 className='fw-bold fs-20'>{t("Payment Options")}</h4>
            </div>
                {global?.cash_on_delivery && (
                    <Grid item xs={12} sm={12} md={12} align="center" justifyContent="start" >
                        <PaymentButton
                            selected={paymenMethod === 'cash_on_delivery'}
                            onClick={() => setPaymenMethod('cash_on_delivery')}
                            fullWidth
                            className='rounded justify-content-start'
                        >
                            {/* {paymenMethod === 'cash_on_delivery' && (
                                <CustomCheckBoxStack>
                                    <CheckCircleIcon color="success" />
                                </CustomCheckBoxStack>
                            )} */}

                            <Radio
                                checked={paymenMethod === 'cash_on_delivery'}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            />

                            <img
                                src={digital.src}
                                alt={t('cash on delivery')}
                            />
                            <Typography
                                textTransform="capitalize"
                                fontSize="14px"
                            >
                                {' '}
                                {t('Cash on delivery')}
                            </Typography>
                        </PaymentButton>
                    </Grid>
                )}
                {
                    // subscriptionStates.order === '0' && 
                    global?.digital_payment && (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            align="center"
                            position="relative"
                            justifyContent='start'
                        >
                            <PaymentButton
                                selected={paymenMethod === 'digital_payment'}
                                onClick={() => setPaymenMethod('digital_payment')}
                                fullWidth
                                className='rounded justify-content-start' 
                            >
                                {/* {paymenMethod === 'digital_payment' && (
                                <CustomCheckBoxStack>
                                    <CheckCircleIcon color="success" />
                                </CustomCheckBoxStack>
                            )} */}
                                <Radio
                                    checked={paymenMethod === 'digital_payment'}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                />

                                <img src={cash.src} alt={t('digital payment')} />
                                <Typography
                                    textTransform="capitalize"
                                    fontSize="14px"
                                >
                                    {' '}
                                    {t('Digital payment')}
                                </Typography>
                            </PaymentButton>
                        </Grid>

                    )}
                {
                    // {subscriptionStates.order === '0' &&
                    Boolean(global?.customer_wallet_status) && (
                        <Grid item xs={12} sm={12} md={12} align="center" justifyContent='start'>
                            <PaymentButton
                                selected={paymenMethod === 'wallet'}
                                onClick={() => setPaymenMethod('wallet')}
                                fullWidth
                                className='rounded justify-content-start'
                            >
                                {/* {paymenMethod === 'wallet' && (
                                    <CustomCheckBoxStack>
                                        <CheckCircleIcon color="success" />
                                    </CustomCheckBoxStack>
                                )}{' '} */}
                                <Radio
                                    checked={paymenMethod === 'wallet'}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                />
                                <img src={wallet.src} alt={t('wallet')} />{' '}
                                <Typography
                                    textTransform="capitalize"
                                    fontSize="14px"
                                >
                                    {' '}
                                    {t('Wallet payment')}
                                </Typography>
                            </PaymentButton>
                        </Grid>
                    )
                }
            </Grid>
        </CustomPaperBigCard>
    )
}

PaymentOptions.propTypes = {}

export default PaymentOptions
