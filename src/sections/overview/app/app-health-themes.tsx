import type { CardProps } from '@mui/material/Card';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CardHeader from '@mui/material/CardHeader';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type HealthTheme = {
  theme: string;
  riskLevel: number;
};

type TeamData = {
  teamName: string;
  themes: HealthTheme[];
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    teams: TeamData[];
  };
};

export function AppHealthThemes({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();
  const [selectedTeam, setSelectedTeam] = useState<string>('Todos');

  const allTeams = ['Todos', ...chart.teams.map((team) => team.teamName)];

  const getFilteredThemes = () => {
    if (selectedTeam === 'Todos') {
      // Calcular média de todos os times
      const allThemes = chart.teams[0].themes.map((t) => t.theme);
      return allThemes.map((themeName) => {
        const avgRisk =
          chart.teams.reduce((sum, team) => {
            const themeData = team.themes.find((t) => t.theme === themeName);
            return sum + (themeData?.riskLevel || 0);
          }, 0) / chart.teams.length;
        return { theme: themeName, riskLevel: Math.round(avgRisk * 10) / 10 };
      });
    }
    const teamData = chart.teams.find((team) => team.teamName === selectedTeam);
    return teamData?.themes || [];
  };

  const filteredThemes = getFilteredThemes();

  const chartOptions = useChart({
    chart: {
      type: 'line',
      sparkline: { enabled: false },
      toolbar: { show: false },
    },
    colors: [theme.palette.error.main],
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    markers: {
      size: 6,
      colors: ['#fff'],
      strokeColors: theme.palette.error.main,
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    xaxis: {
      categories: filteredThemes.map((t) => t.theme),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px',
        },
        rotate: -45,
        rotateAlways: true,
      },
    },
    yaxis: {
      min: 0,
      max: 10,
      tickAmount: 5,
      title: { text: 'Nível de Risco' },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
        },
        formatter: (val: number) => val.toFixed(0),
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `Risco: ${val.toFixed(1)}/10`,
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Time</InputLabel>
            <Select
              value={selectedTeam}
              label="Time"
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              {allTeams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />

      <Box sx={{ px: 3, pb: 3 }}>
        <Chart
          type="line"
          series={[
            {
              name: 'Nível de Risco',
              data: filteredThemes.map((t) => t.riskLevel),
            },
          ]}
          options={chartOptions}
          height={320}
        />
      </Box>
    </Card>
  );
}
