import React from 'react'
import TermsCondition from '../../components/terms-condition/TermsCondition'
import { useSelector } from 'react-redux'
import { AccessTime } from '@mui/icons-material'
import Meta from '../../components/Meta'
import img from '../../../public/static/Privacy/RectangleP.png'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { Container, CssBaseline } from '@mui/material'
import ConditionPage from '../../components/terms-condition/ConditionPage'
import { CustomHeader } from '../../api/Headers'
import { useQuery } from 'react-query'

const index = () => {

    return (
        <>
            <Meta
                // title={`Terms and conditions - ${configData?.business_name}`}
                title={`Terms and conditions `}
            />
            <CssBaseline />
            <ConditionPage configData={[]} />
            {/* <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <ConditionPage configData={configData} />
            </Container> */}
        </>
    )
}

export default index

// export const getServerSideProps = async () => {
//     const configRes = await fetch(
//         `https://foodkart.vrikshatech.in/api/v1/config`,
//         {
//             method: 'GET',
//             headers: CustomHeader,
//         }
//     )
//     const config = await configRes.json()
//     console.log("hgjhfgjsdsd",config)
//     return {
//         props: {
//             configData: config,
//         },
//     }
// }
