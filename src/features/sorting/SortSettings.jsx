import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { setSize, setSpeed, updateActive } from './sortingSlice';

export default function SortSettings({
  isControls,
  setIsControls,
  setChartType,
  handleRefresh,
}) {
  const speed = useSelector((state) => state.sorting.speed);
  const size = useSelector((state) => state.sorting.size);
  const active = useSelector((state) => state.sorting.active);
  const dispatch = useDispatch();

  const handleSpeedSlider = (event, newValue) => {
    dispatch(setSpeed(newValue));
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

  return (
    <Drawer
      anchor="right"
      open={isControls}
      onClose={() => setIsControls(false)}
    >
      <Button onClick={() => setIsControls(false)}>X</Button>
      <Container>
        <div>{`Animation Speed: ${(speed / 1000).toFixed(3)}s`}</div>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
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
          <Grid item xs={8}>
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
              dispatch(
                updateActive([...active].filter((elem) => elem !== 'insertion'))
              );
            } else {
              dispatch(updateActive([...active, 'insertion']));
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
              dispatch(
                updateActive([...active].filter((elem) => elem !== 'selection'))
              );
            } else {
              dispatch(updateActive([...active, 'selection']));
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
              dispatch(
                updateActive([...active].filter((elem) => elem !== 'bubble'))
              );
            } else {
              dispatch(updateActive([...active, 'bubble']));
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
              dispatch(
                updateActive([...active].filter((elem) => elem !== 'merge'))
              );
            } else {
              dispatch(updateActive([...active, 'merge']));
            }
          }}
          variant={active.indexOf('merge') >= 0 ? '' : 'outlined'}
          label="Merge Sort"
          color="secondary"
          size="small"
        />
        <Chip
          onClick={() => {
            if (active.indexOf('quick') >= 0) {
              dispatch(
                updateActive([...active].filter((elem) => elem !== 'quick'))
              );
            } else {
              dispatch(updateActive([...active, 'quick']));
            }
          }}
          variant={active.indexOf('quick') >= 0 ? '' : 'outlined'}
          label="Quick Sort"
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
      <Button onClick={handleRefresh}>Refresh</Button>
    </Drawer>
  );
}
