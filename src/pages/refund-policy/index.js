import React, { useEffect, useState } from 'react'
import TermsCondition from '../../components/terms-condition/TermsCondition'
import { useSelector } from 'react-redux'
import { AccessTime } from '@mui/icons-material'
import Meta from '../../components/Meta'
import img from '../../../public/static/Privacy/RectangleP.png'
import RefundPolicy from '../../components/refund-policy/RefundPolicy'
import { useRouter } from 'next/router'
import ProtectRefund from './ProtectRefund'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { Container, CssBaseline, Box, Grid, Typography  } from '@mui/material'
import RefundPolicyPage from '../../components/refund-policy/RefundPolicyPage'
import { CustomHeader } from '../../api/Headers'
import CustomContainer from '../'

const index = () => {

    return (
        <>
            <Meta title={`Refund Policy`} />
            <CssBaseline />
            {/* <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' } }}
                paddingTop="1rem"
            > */}
                {/* <ProtectRefund> */}
                <RefundPolicyPage />
                {/* </ProtectRefund> */}
            {/* </Container> */}
        </>
    )
}

export default index

// export const getServerSideProps = async () => {
//     const configRes = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
//         {
//             method: 'GET',
//             headers: CustomHeader,
//         }
//     )
//     const config = await configRes.json()
//     return {
//         props: {
//             configData: config,
//         },
//     }
// }
