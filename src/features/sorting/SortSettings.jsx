import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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
  const charTypes = ['Random', 'Valley', 'Pyramid', 'Reverse'];
  const dispatch = useDispatch();

  const handleSpeedSlider = (event, newValue) => {
    dispatch(setSpeed(newValue));
  };
  const handleSizeSlider = (event, newValue) => {
    dispatch(setSize(newValue));
  };

  return (
    <Drawer
      sx={{
        '& .css-1160xiw-MuiPaper-root-MuiDrawer-paper': {
          backgroundColor: 'transparent',
          boxShadow: 0,
        },
        '& .css-1ab2xsx': {
          backgroundColor: 'transparent',
          boxShadow: 0,
        },
      }}
      anchor="right"
      open={isControls}
      onClose={() => setIsControls(false)}
    >
      <div
        className="vertical-container"
        style={{ gap: '5px', marginTop: '1rem' }}
      >
        <Paper>
          <div className="vertical-container" style={{ padding: '1rem' }}>
            <div>{`Animation Speed: ${(speed / 1000).toFixed(3)}s`}</div>
            <Slider
              value={speed}
              onChange={handleSpeedSlider}
              min={10}
              max={1000}
            />
          </div>
        </Paper>
        {/* Speed and Size */}
        <Paper>
          <div className="vertical-container" style={{ padding: '1rem' }}>
            <div>Number of inputs to sort: {size}</div>
            <Slider
              value={size}
              onChange={handleSizeSlider}
              min={10}
              max={100}
            />
          </div>
        </Paper>
        {/* Filter sorts */}
        <Paper>
          <div
            className="container"
            style={{
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <Chip
              style={{ flexBasis: '15%' }}
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
              size="medium"
            />

            <Chip
              style={{ flexBasis: '15%' }}
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
              size="medium"
            />

            <Chip
              style={{ flexBasis: '15%' }}
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
              size="medium"
            />
            <Chip
              style={{ flexBasis: '15%' }}
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
              size="medium"
            />
            <Chip
              style={{ flexBasis: '15%' }}
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
              size="medium"
            />
          </div>
        </Paper>
        {/* Type of chart */}
        <Paper>
          <div
            className="vertical-container"
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <p>
              <strong>Chart Type</strong>
            </p>
            <RadioGroup
              aria-labelledby="chart-type-radio-form"
              defaultValue="random"
              name="radio-buttons-group"
              row
            >
              {charTypes.map((chart) => {
                return (
                  <label key={`chartRadio: ${chart}`}>
                    <Radio
                      size="medium"
                      value={chart}
                      name={chart}
                      onChange={(e) => setChartType(e.target.value)}
                    />
                    {chart}
                  </label>
                );
              })}
            </RadioGroup>
            <Button onClick={handleRefresh}>Refresh</Button>
          </div>
        </Paper>
      </div>
    </Drawer>
  );
}
