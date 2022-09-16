import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';

export default function SortControls({
  sorting,
  toggleControls,
  handleSort,
  isControls,
  handleRefresh,
}) {
  return (
    <>
      <IconButton onClick={handleSort} aria-label="sort">
        {sorting ? (
          <HourglassEmptyOutlinedIcon fontSize="large" />
        ) : (
          <PlayCircleFilledOutlinedIcon color="secondary" fontSize="large" />
        )}
      </IconButton>
      <IconButton onClick={toggleControls} aria-label="settings">
        {sorting ? (
          <SettingsOutlinedIcon fontSize="large" />
        ) : isControls ? (
          <SettingsOutlinedIcon fontSize="large" />
        ) : (
          <SettingsIcon fontSize="large" color="primary" />
        )}
      </IconButton>
      <IconButton onClick={handleRefresh} aria-label="refresh-chart">
        {sorting ? (
          <SyncDisabledOutlinedIcon fontSize="large" />
        ) : (
          <SyncOutlinedIcon fontSize="large" color="primary" />
        )}
      </IconButton>
    </>
  );
}
