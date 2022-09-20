import React, { useState } from 'react';
import TwoSum from './TwoSum';
import ThreeSum from './ThreeSum';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';

function SumPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ padding: '1rem' }}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function sumTabProps(index) {
  return {
    id: `tabpanel-${index}`,
    'aria-controls': `tab-${index}`,
  };
}

export default function ArraysMain() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2>Sums</h2>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="array sum algorithms"
        >
          <Tab label="Two Sum" {...sumTabProps(0)} />
          <Tab label="Three Sum" {...sumTabProps(1)} />
        </Tabs>
        <SumPanel value={value} index={0}>
          <TwoSum />
        </SumPanel>
        <SumPanel value={value} index={1}>
          <ThreeSum />
        </SumPanel>
      </Paper>
    </>
  );
}
