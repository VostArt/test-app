import React from 'react';
import {
  Box,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  ViewList as ViewListIcon,
  PlayArrow as InProgressIcon,
  CheckCircle as CompletedIcon,
  Schedule as NotStartedIcon
} from '@mui/icons-material';

function MuiSearchAndFilter({ searchQuery, onSearchChange, filter, onFilterChange, resultsCount, totalCount }) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      {/* Поиск */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="🔍 Поиск технологий..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          variant="outlined"
          size="small"
        />
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          Найдено: {resultsCount} из {totalCount}
        </Typography>
      </Box>

      {/* Фильтры */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" fontWeight="600">
          Фильтр:
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => newFilter && onFilterChange(newFilter)}
          aria-label="фильтр технологий"
          size="small"
        >
          <ToggleButton value="all" aria-label="все технологии">
            <ViewListIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
            Все
          </ToggleButton>
          <ToggleButton value="not-started" aria-label="не начатые">
            <NotStartedIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
            Не начатые
          </ToggleButton>
          <ToggleButton value="in-progress" aria-label="в процессе">
            <InProgressIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
            В процессе
          </ToggleButton>
          <ToggleButton value="completed" aria-label="выполненные">
            <CompletedIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
            Выполненные
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}

export default MuiSearchAndFilter;