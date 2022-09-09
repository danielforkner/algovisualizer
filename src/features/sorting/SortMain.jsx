import { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { wait } from './helpers';
import InsertionSort from './InsertionSort';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import MergeSort from './MergeSort';
import { useDispatch, useSelector } from 'react-redux';
import {
  refreshGrid,
  setSize,
  setSorting,
  toggleSorting,
} from './sortingSlice';
import './styles/sortStyles.css';
import {
  Chip,
  Paper,
  Stack,
  Slider,
  Box,
  Input,
  Container,
  Drawer,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const SortMain = () => {
  Chart.register(...registerables);
  const [active, setActive] = useState([
    'insertion',
    'selection',
    'bubble',
    'merge',
  ]);
  const grid = useSelector((state) => state.sorting.grid);
  const sorting = useSelector((state) => state.sorting.sorting);
  const size = useSelector((state) => state.sorting.size);
  const dispatch = useDispatch();
  const [speed, setSpeed] = useState(500);
  const [isControls, setIsControls] = useState(false);
  const [chartType, setChartType] = useState('random');

  const refreshRandom = () => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    dispatch(refreshGrid(arr));
  };

  const refreshReverse = () => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.unshift(i);
    }
    dispatch(refreshGrid(arr));
  };

  const refreshValley = () => {
    let arr = [];
    let count = 0;
    for (let i = 0; i < size; i++) {
      if (count % 2 === 0) {
        arr.unshift(i);
      } else {
        arr.push(i);
      }
      count++;
    }
    dispatch(refreshGrid(arr));
  };

  const refreshPyramid = () => {
    let arr = [];
    let count = 0;
    for (let i = size; i > 0; i--) {
      if (count % 2 === 0) {
        arr.unshift(i);
      } else {
        arr.push(i);
      }
      count++;
    }
    dispatch(refreshGrid(arr));
  };

  const handleRefresh = () => {
    switch (chartType) {
      case 'random':
        refreshRandom();
        return;
      case 'reverse':
        refreshReverse();
        return;
      case 'valley':
        refreshValley();
        return;
      case 'pyramid':
        refreshPyramid();
        return;
      default:
        return;
    }
  };

  const handleSort = async () => {
    dispatch(setSorting(true));
    await wait(50);
    dispatch(toggleSorting());
  };

  const handleSpeedSlider = (event, newValue) => {
    setSpeed(newValue);
  };
  const handleSizeSlider = (event, newValue) => {
    dispatch(setSize(newValue));
  };

  const handleSizeInput = (event) => {
    dispatch(
      setSize(event.target.value === '' ? '' : Number(event.target.value))
    );
  };

  const handleBlur = () => {
    if (size < 0) {
      dispatch(setSize(0));
    } else if (size > 100) {
      dispatch(setSize(100));
    }
  };

  const toggleControls = () => {
    setIsControls(!isControls);
  };

  return (
    <div>
      <Button onClick={toggleControls}>Controls</Button>
      <Button onClick={handleSort}>Start Sorting</Button>
      <Button onClick={handleRefresh}>Refresh</Button>
      <Drawer
        anchor="right"
        open={isControls}
        onClose={() => setIsControls(false)}
      >
        <Button onClick={() => setIsControls(false)}>X</Button>
        <Container>
          <div>{`Animation Speed: ${(speed / 1000).toFixed(3)}s`}</div>
          <Grid container alignItems="center" spacing={2}>
            <Grid xs={8}>
              <Slider
                value={speed}
                onChange={handleSpeedSlider}
                min={10}
                max={1000}
              />
            </Grid>
          </Grid>
        </Container>
        {/* Speed and Size */}
        <Container>
          <div>Number of inputs to sort</div>
          <Grid container alignItems="center" spacing={2}>
            <Grid xs={8}>
              <Slider
                value={size}
                onChange={handleSizeSlider}
                min={10}
                max={100}
              />
            </Grid>
            <Grid xs={4}>
              <Input
                style={{ border: '1px solid black' }}
                value={size}
                size="small"
                onChange={handleSizeInput}
                onBlur={handleBlur}
                inputProps={{
                  min: 10,
                  max: 100,
                  step: 10,
                  type: 'number',
                }}
              />
            </Grid>
          </Grid>
        </Container>
        {/* Filter sorts */}
        <Stack direction="row" spacing={1}>
          <Chip
            onClick={() => {
              if (active.indexOf('insertion') >= 0) {
                setActive([...active].filter((elem) => elem != 'insertion'));
              } else {
                setActive([...active, 'insertion']);
              }
            }}
            variant={active.indexOf('insertion') >= 0 ? '' : 'outlined'}
            label="Insertion Sort"
            color="secondary"
            size="small"
          />
          <Chip
            onClick={() => {
              if (active.indexOf('selection') >= 0) {
                setActive([...active].filter((elem) => elem != 'selection'));
              } else {
                setActive([...active, 'selection']);
              }
            }}
            variant={active.indexOf('selection') >= 0 ? '' : 'outlined'}
            label="Selection Sort"
            color="secondary"
            size="small"
          />
          <Chip
            onClick={() => {
              if (active.indexOf('bubble') >= 0) {
                setActive([...active].filter((elem) => elem != 'bubble'));
              } else {
                setActive([...active, 'bubble']);
              }
            }}
            variant={active.indexOf('bubble') >= 0 ? '' : 'outlined'}
            label="Bubble Sort"
            color="secondary"
            size="small"
          />
          <Chip
            onClick={() => {
              if (active.indexOf('merge') >= 0) {
                setActive([...active].filter((elem) => elem != 'merge'));
              } else {
                setActive([...active, 'merge']);
              }
            }}
            variant={active.indexOf('merge') >= 0 ? '' : 'outlined'}
            label="Merge Sort"
            color="secondary"
            size="small"
          />
        </Stack>
        {/* Type of chart */}
        <FormControl>
          <FormLabel id="chart-type-radio-form">Chart Type</FormLabel>
          <RadioGroup
            aria-labelledby="chart-type-radio-form"
            defaultValue="Random"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="random"
              control={<Radio />}
              label="Random"
              onChange={(e) => setChartType(e.target.value)}
            />
            <FormControlLabel
              value="valley"
              control={<Radio />}
              label="Valley"
              onChange={(e) => setChartType(e.target.value)}
            />
            <FormControlLabel
              value="pyramid"
              control={<Radio />}
              label="Pyramid"
              onChange={(e) => setChartType(e.target.value)}
            />
            <FormControlLabel
              value="reverse"
              control={<Radio />}
              label="Reverse"
              onChange={(e) => setChartType(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
      </Drawer>
      <Grid container rowSpacing={1} columnSpacing={3}>
        {active.length
          ? active.map((str, i) => {
              switch (str) {
                case 'insertion':
                  return (
                    <Grid xs={8} md={6} key={`insertionSort: ${i}`}>
                      <Paper>
                        <InsertionSort Chart={Chart} speed={speed} />
                      </Paper>
                    </Grid>
                  );
                case 'selection':
                  return (
                    <Grid xs={8} md={6} key={`selectionSort: ${i}`}>
                      <Paper>
                        <SelectionSort Chart={Chart} speed={speed} />
                      </Paper>
                    </Grid>
                  );
                case 'bubble':
                  return (
                    <Grid xs={8} md={6} key={`bubbleSort: ${i}`}>
                      <Paper>
                        <BubbleSort Chart={Chart} speed={speed} />
                      </Paper>
                    </Grid>
                  );
                case 'merge':
                  return (
                    <Grid xs={8} md={6} key={`mergeSort: ${i}`}>
                      <Paper>
                        <MergeSort Chart={Chart} speed={speed} />
                      </Paper>
                    </Grid>
                  );
                default:
                  return null;
              }
            })
          : null}
      </Grid>
    </div>
  );
};

export default SortMain;
