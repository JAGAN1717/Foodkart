import React, { useState } from 'react'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CustomModal from '../custom-modal/CustomModal'
import CheckoutFailedCard from './CheckoutFailedCard'
import { useTranslation } from 'react-i18next'

const CheckoutFailed = ({id}) => {
    const [openModal, setModalOpen] = useState(false)
    const { t } = useTranslation()
    setTimeout(() => {
        setModalOpen(true)
    }, 500)

    return (
        <React.Fragment>
            <CardContent>
                <Typography
                    align="center"
                    sx={{ fontSize: 24 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {t('Order Place Failed')}
                </Typography>

                <Typography
                    align="center"
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                >
                    {t("Order didn't place successfully.")}
                </Typography>
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>
                <Button
                    onClick={() => router.push('/home')}
                    variant="contained"
                    fullWidth
                > 
                    {t('Back to home')}
                </Button>
            </CardActions>
            <CustomModal
                openModal={openModal}
                setModalOpen={setModalOpen}
                disableAutoFocus={true}
            >
                <CheckoutFailedCard id={id} />
            </CustomModal>
        </React.Fragment>
    )
}

CheckoutFailed.propTypes = {}

export default CheckoutFailed
