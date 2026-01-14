import type { IUserItem } from 'src/types/user';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import { fNumber } from 'src/utils/format-number';

import { getUserHealthData } from 'src/_mock/_user-health';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  user: IUserItem;
};

export function UserHealthDialog({ open, onClose, user }: Props) {
  const healthData = getUserHealthData(user.id);

  const sentimentChartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: ['#00A76F', '#FFAB00', '#FF5630', '#B71D18'],
    labels: ['Positivo', 'Neutro', 'Preocupação', 'Negativo'],
    stroke: { width: 0 },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: { show: true },
            value: {
              show: true,
              formatter: (val: string | number) => fNumber(val),
            },
            total: {
              show: true,
              label: 'Total',
              formatter: () => fNumber(healthData.sentiment.total),
            },
          },
        },
      },
    },
  });

  const weekSentimentChartOptions = useChart({
    chart: {
      type: 'bar',
      sparkline: { enabled: false },
      toolbar: { show: false },
    },
    colors: ['#00A76F', '#FFAB00', '#FF5630', '#B71D18'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: healthData.sentiment7Days.dates,
      labels: {
        style: {
          colors: '#637381',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: { text: 'Mensagens' },
      labels: {
        style: {
          colors: '#637381',
          fontSize: '12px',
        },
      },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} mensagens`,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
    },
  });

  const renderAlertLevel = () => {
    const { level, color, icon } = healthData.alertLevel;
    return (
      <Card sx={{ p: 3, mb: 3, bgcolor: `${color}.lighter` }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 64,
              height: 64,
              display: 'flex',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${color}.main`,
              color: 'common.white',
            }}
          >
            <Iconify icon={icon} width={32} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: `${color}.darker` }}>
              {level}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {healthData.alertLevel.description}
            </Typography>
          </Box>
        </Stack>
      </Card>
    );
  };

  const renderStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={6}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {healthData.messagesCount}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Mensagens Enviadas
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1 }}>
            Último mês
          </Typography>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1, color: 'success.main' }}>
            {healthData.responseRate}%
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Taxa de Resposta
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1 }}>
            RH respondeu
          </Typography>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Engajamento por Período
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Últimos 7 dias
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {healthData.engagement7Days} mensagens
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(healthData.engagement7Days / healthData.messagesCount) * 100}
                color="primary"
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Últimos 30 dias
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {healthData.messagesCount} mensagens
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={100}
                color="success"
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );

  const renderSentiment = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Análise de Sentimento (30 dias)
          </Typography>
          <Chart
            type="donut"
            series={[
              healthData.sentiment.positive,
              healthData.sentiment.neutral,
              healthData.sentiment.concern,
              healthData.sentiment.negative,
            ]}
            options={sentimentChartOptions}
            height={280}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Sentimento (Últimos 7 dias)
          </Typography>
          <Chart
            type="bar"
            series={[
              { name: 'Positivo', data: healthData.sentiment7Days.positive },
              { name: 'Neutro', data: healthData.sentiment7Days.neutral },
              { name: 'Preocupação', data: healthData.sentiment7Days.concern },
              { name: 'Negativo', data: healthData.sentiment7Days.negative },
            ]}
            options={weekSentimentChartOptions}
            height={280}
          />
        </Card>
      </Grid>
    </Grid>
  );

  const renderTopics = () => (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Tópicos Mais Abordados
      </Typography>
      <Stack spacing={2}>
        {healthData.topTopics.map((topic, index) => (
          <Box key={topic.name}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {index + 1}. {topic.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {topic.count} menções
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={topic.percentage}
              color={index === 0 ? 'primary' : 'inherit'}
              sx={{ height: 6, borderRadius: 1 }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );

  const renderRecommendations = () => (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recomendações e Alertas
      </Typography>
      <Stack spacing={2}>
        {healthData.recommendations.map((rec, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: `${rec.type}.lighter`,
              border: (theme) => `1px solid ${theme.palette[rec.type].light}`,
            }}
          >
            <Stack direction="row" spacing={2}>
              <Iconify
                icon={rec.icon}
                width={24}
                sx={{ color: `${rec.type}.main`, flexShrink: 0, mt: 0.5 }}
              />
              <Box>
                <Typography variant="subtitle2" sx={{ color: `${rec.type}.darker`, mb: 0.5 }}>
                  {rec.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {rec.description}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Card>
  );

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxHeight: '90vh' },
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {user.role} • {user.company}
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <DialogContent sx={{ p: 3 }}>
        {renderAlertLevel()}
        {renderStats()}
        {renderSentiment()}
        {renderTopics()}
        {renderRecommendations()}
      </DialogContent>
    </Dialog>
  );
}
