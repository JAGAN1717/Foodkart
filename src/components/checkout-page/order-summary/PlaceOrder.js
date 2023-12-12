import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControlLabel, Grid } from '@mui/material'
import { ConditionTypography } from '../CheckOut.style'
import { useTranslation } from 'react-i18next'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { CustomTypographyGray } from '../../error/Errors.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import LoadingButton from '@mui/lab/LoadingButton'
import Link from 'next/link'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

const PlaceOrder = (props) => {
    const { placeOrder, orderLoading } = props
    const [checked, setChecked] = useState(false)
    const handleChange = (e) => {
        setChecked(e.target.checked)
    }
    const { t } = useTranslation()
    return (
        // <CustomPaperBigCard>
            <CustomStackFullWidth  alignItems="center" spacing={2}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                            />
                        }
                        label={
                            <CustomTypography sx={{fontSize:'14px'}} >
                                {t(
                                    `Have Read And Agreed With `
                                )}{' '}
                                <Link
                                    href="/terms-and-conditions" 
                                    className='text_color'
                                    style={{ textDecoration: 'underline',color:'#e01d57' }}
                                >
                                    <span className='text_color'>{t('Privacy Policy, Terms & Conditions ')}</span>
                                </Link>{' '}
                                {t('And ')}
                                <Link
                                    href="/privacy-policy"
                                    style={{ textDecoration: 'underline',color:'#e01d57' }}
                                    
                                >
                                  <span className='text_color'>{t('Refund Policy.')}</span>  
                                </Link>
                            </CustomTypography>
                        }
                    />
                </FormGroup>
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={placeOrder}
                    loading={orderLoading}
                    disabled={!checked} 
                    // className="rounded-4 "
                    sx={{padding:'12px',borderRadius:'25px'}}
                >
                    {t('Checkout')}
                </LoadingButton>
            </CustomStackFullWidth>
        // </CustomPaperBigCard>
    )
}

PlaceOrder.propTypes = {}

export default PlaceOrder
