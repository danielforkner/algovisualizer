import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { refreshGrid, setSorting, updateActiveSorting } from './sortingSlice';
import './styles/sortStyles.css';
// components
import InsertionSort from './InsertionSort';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import MergeSort from './MergeSort';
import SortSettings from './SortSettings';
import QuickSort from './QuickSort';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import SortControls from './SortControls';

const SortMain = () => {
  Chart.register(...registerables);
  const active = useSelector((state) => state.sorting.active);

  const sorting = useSelector((state) => state.sorting.sorting);
  const size = useSelector((state) => state.sorting.size);
  const speed = useSelector((state) => state.sorting.speed);
  const activeSorting = useSelector((state) => state.sorting.activeSorting);
  const dispatch = useDispatch();
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
    if (sorting) return;
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
    if (sorting) return;
    dispatch(updateActiveSorting(active.length));
    dispatch(setSorting(true));
  };

  const toggleControls = () => {
    if (sorting) return;
    setIsControls(!isControls);
  };

  useEffect(() => {
    if (activeSorting <= 0) {
      dispatch(setSorting(false));
    }
  }, [activeSorting]);

  return (
    <div>
      <SortSettings
        active={active}
        isControls={isControls}
        setIsControls={setIsControls}
        setChartType={setChartType}
        handleRefresh={handleRefresh}
      />
      <div className="container">
        <Paper>
          <SortControls
            sorting={sorting}
            toggleControls={toggleControls}
            handleSort={handleSort}
            isControls={isControls}
            handleRefresh={handleRefresh}
          />
        </Paper>
      </div>

      <Grid container columnSpacing={{ xs: 0, sm: 2 }}>
        {active.length
          ? active.map((str, i) => {
              switch (str) {
                case 'insertion':
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={`insertionSort: ${i}`}
                    >
                      <Paper elevation={3} padding={5}>
                        <div style={{ padding: '0 10px' }}>
                          <InsertionSort Chart={Chart} speed={speed} />
                        </div>
                      </Paper>
                    </Grid>
                  );
                case 'selection':
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={`selectionSort: ${i}`}
                    >
                      <Paper>
                        <div style={{ padding: '0 10px' }}>
                          <SelectionSort Chart={Chart} speed={speed} />
                        </div>
                      </Paper>
                    </Grid>
                  );
                case 'bubble':
                  return (
                    <Grid item xs={12} sm={6} md={4} key={`bubbleSort: ${i}`}>
                      <Paper>
                        <div style={{ padding: '0 10px' }}>
                          <BubbleSort Chart={Chart} speed={speed} />
                        </div>
                      </Paper>
                    </Grid>
                  );
                case 'merge':
                  return (
                    <Grid item xs={12} sm={6} md={4} key={`mergeSort: ${i}`}>
                      <Paper>
                        <div style={{ padding: '0 10px' }}>
                          <MergeSort Chart={Chart} speed={speed} />
                        </div>
                      </Paper>
                    </Grid>
                  );
                case 'quick':
                  return (
                    <Grid item xs={12} sm={6} md={4} key={`quickSort: ${i}`}>
                      <Paper>
                        <div style={{ padding: '0 10px' }}>
                          <QuickSort Chart={Chart} />
                        </div>
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
