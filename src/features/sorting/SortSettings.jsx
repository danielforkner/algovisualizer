import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
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
      <div
        className="vertical-container"
        style={{ height: '100%', gap: '5px' }}
      >
        {/* <div className="container">
        <h2>Sort Settings</h2>
        <Button onClick={() => setIsControls(false)}>X</Button>
      </div> */}
        <Paper>
          <Container>
            <div>{`Animation Speed: ${(speed / 1000).toFixed(3)}s`}</div>
            <Slider
              value={speed}
              onChange={handleSpeedSlider}
              min={10}
              max={1000}
            />
          </Container>
        </Paper>
        {/* Speed and Size */}
        <Paper>
          <Container>
            <div>Number of inputs to sort: {size}</div>
            <div className="container">
              {/* <Input
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
            /> */}
              <Slider
                value={size}
                onChange={handleSizeSlider}
                min={10}
                max={100}
              />
            </div>
          </Container>
        </Paper>
        {/* Filter sorts */}
        <Paper>
          <Container>
            <div>Enable or Disable Sort Methods</div>
            <Grid container rowSpacing={{ xs: 1 }} style={{ padding: '5px' }}>
              <Grid
                item
                xs={4}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Chip
                  onClick={() => {
                    if (active.indexOf('insertion') >= 0) {
                      dispatch(
                        updateActive(
                          [...active].filter((elem) => elem !== 'insertion')
                        )
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
              </Grid>
              <Grid
                item
                xs={4}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Chip
                  onClick={() => {
                    if (active.indexOf('selection') >= 0) {
                      dispatch(
                        updateActive(
                          [...active].filter((elem) => elem !== 'selection')
                        )
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
              </Grid>
              <Grid
                item
                xs={4}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Chip
                  onClick={() => {
                    if (active.indexOf('bubble') >= 0) {
                      dispatch(
                        updateActive(
                          [...active].filter((elem) => elem !== 'bubble')
                        )
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
              </Grid>
              <Grid
                item
                xs={4}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Chip
                  onClick={() => {
                    if (active.indexOf('merge') >= 0) {
                      dispatch(
                        updateActive(
                          [...active].filter((elem) => elem !== 'merge')
                        )
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
              </Grid>
              <Grid
                item
                xs={4}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Chip
                  onClick={() => {
                    if (active.indexOf('quick') >= 0) {
                      dispatch(
                        updateActive(
                          [...active].filter((elem) => elem !== 'quick')
                        )
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
              </Grid>
            </Grid>
          </Container>
        </Paper>
        {/* Type of chart */}
        <Paper>
          <Container>
            <div>Chart Type</div>
            <RadioGroup
              aria-labelledby="chart-type-radio-form"
              defaultValue="Random"
              name="radio-buttons-group"
              row
            >
              <label>
                <Radio
                  size="small"
                  value="random"
                  name="random"
                  onChange={(e) => setChartType(e.target.value)}
                />
                Random
              </label>
              <label>
                <Radio
                  size="small"
                  value="valley"
                  name="valley"
                  onChange={(e) => setChartType(e.target.value)}
                />
                Valley
              </label>
              <label>
                <Radio
                  size="small"
                  value="pyramid"
                  name="pyramid"
                  onChange={(e) => setChartType(e.target.value)}
                />
                Pyramid
              </label>
              <label>
                <Radio
                  size="small"
                  value="reverse"
                  name="reverse"
                  onChange={(e) => setChartType(e.target.value)}
                />
                Reverse
              </label>
            </RadioGroup>
            <Button onClick={handleRefresh}>Refresh</Button>
          </Container>
        </Paper>
      </div>
    </Drawer>
  );
}
