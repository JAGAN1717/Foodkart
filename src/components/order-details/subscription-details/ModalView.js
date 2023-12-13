import React, {useState} from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import {CustomTypography} from "../../custom-tables/Tables.style";
import {CustomButtonPrimary} from "../../../styled-components/CustomButtons.style";
import {CustomStackFullWidth, CustomTextField} from "../../../styled-components/CustomStyles.style";
import CustomMobileDateRangePicker from "../../custom-date-range-picker/CustomMobileDateRangePicker";
import moment from "moment/moment";
import CancelSubscriptionForm from "./CancelSubscriptionForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalView = props => {
    const {title, t, minDate,maxDate, handleCancel, handleSuccess} = props
    const [textField, setTextField] = useState('')
    const [dateRange, setDateRange] = useState([]);
    const [startDate, setStartDate] = useState(new Date(minDate));
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    const isPauseSubscription = title.includes(t('skip'))
    const handleDateRange = (value) => {
        const [start, end] = value;
        // let val = [moment(value[0]).format('yyyy/MM/DD HH:mm'),moment(value[1]).format('yyyy/MM/DD HH:mm') ]
        let val = [moment(start).format('yyyy/MM/DD HH:mm'),moment(end).format('yyyy/MM/DD HH:mm') ]
        setDateRange(val)
        setStartDate(start);
        setEndDate(end);
    }

    console.log('minDateminDate',minDate,maxDate)

    const handlePauseClick = () => {
        return <CustomStackFullWidth alignItems='center' spacing={1.5}>
            <Typography fontSize='13px' color='gray'>{t('Choose your preferable date range*')}</Typography>
            {/* <CustomMobileDateRangePicker handleValue={handleDateRange} minDate={minDate} maxDate={maxDate}/> */}
            <div className='mt-2'>
            <DatePicker
                selected={startDate}
                minDate={new Date(minDate)}
                maxDate={new Date(maxDate)}
                onChange={handleDateRange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                />
            </div>
        </CustomStackFullWidth>
    }
    const handleCancelClick = () => {
        return <CancelSubscriptionForm handleCancel={handleCancel} handleSuccess={handleSuccess}/>
    }
    return (
        <Paper sx={{width: {xs: '100%', sm: '380px'}, padding: '1rem'}}>
            <Grid container spacing={3}>
                <Grid item align='center' xs={12}>
                    <ErrorOutlinedIcon sx={{fontSize: '58px', color: 'primary.main'}}/>
                </Grid>
                <Grid item align='center'  xs={12}>
                    <CustomTypography variant="h4" textTransform='none'>
                        {t(title)}
                    </CustomTypography>
                </Grid>
                <Grid item align='center' justifyContent='center' xs={12}>
                    {isPauseSubscription ? handlePauseClick() : handleCancelClick()}
                </Grid>
                {
                    isPauseSubscription && <Grid item align='center' xs={12} container spacing={2}>
                        <Grid item xs={6}>
                            <Button fullWidth variant='outlined' sx={{color: 'primary.main'}}
                                    onClick={() => handleCancel?.()}>
                                {t("No")}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                        <Button fullWidth variant='outlined' sx={{color: 'primary.main'}}
                                    o onClick={() => handleSuccess?.(isPauseSubscription ? dateRange : textField)}>
                                {t("Yes")}
                            </Button>
                            {/* <CustomButtonPrimary onClick={() => handleSuccess?.(isPauseSubscription ? dateRange : textField)}>
                                {t("Yes")}
                            </CustomButtonPrimary> */}
                        </Grid>
                    </Grid>
                }


            </Grid>

        </Paper>
    );
};

ModalView.propTypes = {};

export default ModalView;