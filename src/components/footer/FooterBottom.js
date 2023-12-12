import React from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Container, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { capitalize } from '../../utils/capitalize'
import CustomContainer from "../container";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterBottom = (props) => {
    const { global } = useSelector((state) => state.globalSettings)

    const { t } = useTranslation()
    const handleClick = (href) => {
        Router.push(href)
    }
    const languageDirection = localStorage.getItem('direction')
    return (
        <CustomStackFullWidth py="1.5rem" className='copybg'>
            <CustomContainer >
                <CustomStackFullWidth
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    spacing={2}
                >
                    <CustomColouredTypography
                        variant="h5"
                        color="whiteContainer.main"
                    >
                        {/* {t("Copyright")}  */}
                        &#9400;{'  '}
                        {t(global?.footer_text || '')}
                    </CustomColouredTypography>

                    <div className='d-flex align-items-center footer_bottom'>
                        <div className='me-md-4 me-3 copy_icon'>
                            <a href='https://www.facebook.com/' target='_blank'>
                                {/* <img src='/static/images/Icons/__facebook.png'></img> */}
                                <FacebookIcon className='social_c' />
                            </a>
                        </div>
                        <div className='me-md-4 me-3 copy_icon'>
                            <a href='https://www.instagram.com/' target='_blank'>
                                {/* <img src='/static/images/Icons/__insta.png'></img> */}
                                <InstagramIcon className='social_c' />
                            </a>
                        </div>
                        <div className='me-md-4 me-3 copy_icon'>
                            <a href='https://www.linkedin.com/' target='_blank'>
                                {/* <img src='/static/images/Icons/__linkedin.png'></img> */}
                                <LinkedInIcon className='social_c' />
                            </a>
                        </div>
                        <div className='me-md-4 me-3 copy_icon'>
                            <a href='https://www.youtube.com/' target='_blank'>
                                {/* <img src='/static/images/Icons/__youtube.png'></img> */}
                                <YouTubeIcon className='social_c' />
                            </a>
                        </div>
                    </div>
                    
                </CustomStackFullWidth>
            </CustomContainer>
        </CustomStackFullWidth>
    )
}

FooterBottom.propTypes = {}

export default FooterBottom
