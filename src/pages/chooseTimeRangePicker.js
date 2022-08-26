import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, ClickAwayListener } from '@mui/material';
import { DateRange } from 'react-date-range';
import { styled } from '@mui/material/styles';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';

export default function ChooseDateRangePicker({
  openTime,
  setOpenTime,
  timeChoose,
  setTimeChoose,
  endTimeChoose,
  setEndTimeChoose,
}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const startTimeOther = moment(`${state[0].startDate}`).startOf('day').format('yyyy-MM-DD');
    const endTimeOther = moment(`${state[0].endDate}`).startOf('day').format('yyyy-MM-DD');
    setTimeChoose(moment(startTimeOther).format('DD/MM/YY'));
    setEndTimeChoose(moment(endTimeOther).format('DD/MM/YY'));
  }, [state[0].startDate, state[0].endDate]);

  const handleClickAway = () => {
    setOpenTime(false);
  };
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {openTime && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box style={{ position: 'absolute', zIndex: '9999999', left: '40%' }}>
            <DateRangePicker
              editableDateInputs={false}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
}

const TypographyDate = styled(Typography)(({ theme }) => ({
  fontFamily: 'SFProTextMedium',
  ontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '17px',
  // color: COLORS.darkest,
  display: 'block',
  marginTop: '4px',
  margin: '1px 7px 0 4px',
}));
const DateRangePicker = styled(DateRange)(({ theme }) => ({
  fontFamily: 'SFProTextMedium',
  ontStyle: 'normal',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '12px',
  //   color: COLORS.darkLighter,
  display: 'block',
  marginTop: '4px',
  margin: '4px 10px 0 4px',
  width: '400px',

  [theme.breakpoints.down('ss')]: {
    fontSize: '10px',
    lineHeight: '10px',
    width: '70%',
    '& .rdrMonthAndYearWrapper': {
      width: '65%',
    },
    '& .rdrMonthPicker    ': {
      width: '120%',
    },
    '& .rdrMonthAndYearPickers': {
      width: '110%',
      height: 'none',
    },
    '& .rdrWeekDays': {
      width: '70%',
      fontSize: '10px',
    },
    '& .rdrDays': {
      width: '70%',
      fontSize: '10px',
    },
  },
}));
