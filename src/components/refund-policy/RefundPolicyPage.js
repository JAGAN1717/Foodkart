import React, {useEffect} from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { StyleThemBox } from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'
import {useRouter} from "next/router";
import {useTheme} from "@mui/material/styles";
import CustomContainer from '../container'


const RefundPolicyPage = () => {
     const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings);

     const theme=useTheme()
    return (
        <Box marginTop={{xs:"50px",md:"150px"}}>
            <Grid container item md={12} xs={12} spacing={3}>
            <Grid
                    item
                    md={12}
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                >
                    <section className="mb-5">
                        <div className="menu_bg2 position-relative ">
                            <img
                                src="/static/images/Banner/terms_banners.png"
                                className="w-100"
                            />
                            <CustomContainer>
                                <div className="position-absolute translate-middle top-50 ">
                                    <h4 className="fade-in fw-bold fs-2 ">
                                    {t("Refund Policy")}
                                    </h4>
                                </div>
                            </CustomContainer>
                        </div>
                    </section>
                </Grid>
                {/* <Grid item md={12} xs={12} alignItems="center" justifyContent="center">
                    <Typography textAlign="center" fontWeight="700" variant="h2" color={theme.palette.neutral[1000]}>{t("Refund Policy")}</Typography>
                </Grid> */}
                <CustomContainer>
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    <StyleThemBox>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: global?.refund_policy_data,
                            }}
                        ></div>
                    </StyleThemBox>
                </Grid>
                </CustomContainer>
            </Grid>
        </Box>
    )
}

export default RefundPolicyPage
