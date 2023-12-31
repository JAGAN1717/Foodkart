import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import RoomIcon from '@mui/icons-material/Room'
import { Paper, Stack, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import AddressReselectPopover from './AddressReselectPopover'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { setClearCart } from '../../../../redux/slices/cart'
import { useTheme } from '@mui/material/styles';

function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

const AddressReselect = ({ location }) => {
    const [openReselectModal, setOpenReselectModal] = useState(false)
    const { global, token } = useSelector((state) => state.globalSettings)
    const [openPopover, setOpenPopover] = useState(false)
    const [address, setAddress] = useState(null)
    const [locations, setLocations] = useState(null)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const router = useRouter()
    const theme = useTheme()
    
    useEffect(() => {
        let currentLatLng = {"lat":13.0088228,"lng":80.2209665}
        if (typeof localStorage.getItem('currentLatLng') !== undefined) {
            // currentLatLng = JSON.parse(localStorage.getItem('currentLatLng'))
            currentLatLng = {"lat":13.0088228,"lng":80.2209665}
            const location = localStorage.getItem('location')
            setAddress({
                ...currentLatLng,
                latitude: currentLatLng?.lat,
                longitude: currentLatLng?.lng,
                address: location ?? '2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India',
                address_type: 'Selected Address',
            })
        }
    }, [])

    async function fetchLocation() {
      try {
        const position = await getLocation();
        const {
          latitude,
          longitude,
          altitude,
          accuracy,
          altitudeAccuracy,
          heading,
          speed,
        } = position.coords;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
              let currentLatLng
              currentLatLng = JSON.parse(localStorage.getItem('currentLatLng'))
              const address = data.results[0].formatted_address;
                localStorage.setItem('location',address ?? '2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
                // localStorage.setItem('location','2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
                localStorage.setItem('currentLatLng', JSON.stringify({"lat":latitude ?? 13.0088228,"lng":longitude ?? 80.2209665}))
                // localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
                localStorage.setItem('zoneid',JSON.stringify([1]))
            // setLocation(address);
            // setValue(data?.plus_code?.compound_code?.toString()?.split(' ')[1])
          })
          .catch((error) => {
            console.log(error);
            localStorage.setItem('location','2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
            localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
            localStorage.setItem('zoneid',JSON.stringify([1]))
          });
      } catch (error) {
            localStorage.setItem('location','2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
            localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
            localStorage.setItem('zoneid',JSON.stringify([1]))
           console.error(error);
      }
    } 

    const FetchLocate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const {
                  latitude,
                  longitude,
                  altitude,
                  accuracy,
                  altitudeAccuracy,
                  heading,
                  speed,
                } = position.coords;

                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw`;
                fetch(url)
                  .then((response) => response.json())
                  .then((data) => {
                    const address = data.results[0].formatted_address;
                    // localStorage.setItem('location',address ?? '2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
                    localStorage.setItem('location', '2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
                    // localStorage.setItem('currentLatLng', JSON.stringify({"lat":latitude ?? 13.0088228,"lng":longitude ?? 80.2209665}))
                    localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
                    localStorage.setItem('zoneid',JSON.stringify([1]))
                  })
                  .catch((error) => {
                    console.log(error);
                    localStorage.setItem('location','2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
                    localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
                    localStorage.setItem('zoneid',JSON.stringify([1]))
                  });
              }
            )
          } else {
            localStorage.setItem('location','2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
            localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
            localStorage.setItem('zoneid',JSON.stringify([1]))
          }
        }

    useEffect(() => {
        if (address) {
            localStorage.setItem('location', address?.address ?? '2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
            // localStorage.setItem('location', '2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
            const values = { lat: address?.lat, lng: address?.lng} 
            // localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
            localStorage.setItem('currentLatLng', JSON.stringify(values) ?? JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
            // localStorage.setItem('zoneid',JSON.stringify([1]))
            if (address.zone_ids && address.zone_ids.length > 0) {
                const value = [address.zone_ids]
                localStorage.setItem('zoneid', JSON.stringify(address.zone_ids) ?? JSON.stringify([1]))
                // localStorage.setItem('zoneid', JSON.stringify([1]))
                toast.success(t('New delivery address selected.'))
                handleClosePopover()
                dispatch(setClearCart())
                router.push('/home')
            }
        }

        if(!localStorage.getItem('location')){
            // localStorage.setItem('location','2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India')
            // localStorage.setItem('currentLatLng', JSON.stringify({"lat":13.0088228,"lng":80.2209665}))
            // localStorage.setItem('zoneid',JSON.stringify([1]))
            fetchLocation();
            // FetchLocate()
        }
    }, [address])
    const handleClickToLandingPage = () => {
        setOpenPopover(true)
        // if (token) {
        //
        // } else {
        //     toast.error(t('Login required.'))
        // }

        //setOpenReselectModal(true)
        // localStorage.removeItem('location')
        // localStorage.removeItem('zoneid')
       //Router.push('/')
    }
    const handleModalClose = () => {
        setOpenReselectModal(false)
    }
    const anchorRef = useRef(null)
    const handleClosePopover = () => {
        setOpenPopover(false)
    }
    
    return (
        <>
            <Stack
                sx={{
                    color: (theme) => theme.palette.neutral[1000],
                    cursor: 'pointer',
                }}
                direction="row"
                onClick={handleClickToLandingPage}
                ref={anchorRef}
                alignItems="center"
                spacing={0.5}
            >
                <RoomIcon
                    fontSize="small"
                    color="primary"
                    style={{ width: '16px', height: '16px',color:'#fff' }}
                />
                <Typography
                    fontSize="12px"
                    align="left"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        maxWidth: '150px',
                        marginInlineStart: '5px',
                        color:'#fff'
                    }}
                    color={theme.palette.neutral[1000]}
                >
                    {location}
                </Typography>
                <KeyboardArrowDownIcon  sx={{color:'#fff'}}/>
            </Stack>
            <AddressReselectPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
                t={t}
                address={address}
                setAddress={setAddress}
                token={token}
            />
        </>
    )
}

AddressReselect.propTypes = {}

export default AddressReselect
