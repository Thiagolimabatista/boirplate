'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from '../app-widget';
import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
import { AppTopInstalledCountries } from '../app-top-installed-countries';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Bem-vindo de volta 👋 \n ${user?.displayName}`}
            description="Acompanhe o bem-estar dos colaboradores e métricas de engajamento da plataforma Cuidar.me"
            img={<SeoIllustration hideBackground />}
            action={
              <Button variant="contained" color="primary">
                Ver Alertas
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Usuários Ativos"
            percent={12.5}
            total={1847}
            chart={{
              categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
              series: [120, 145, 156, 178, 195, 210, 225, 247],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Mensagens Respondidas"
            percent={8.3}
            total={3421}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
              series: [280, 320, 350, 380, 410, 430, 450, 470],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Taxa de Resposta"
            percent={3.7}
            total={89}
            chart={{
              colors: [theme.vars.palette.success.main],
              categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
              series: [75, 78, 82, 84, 85, 87, 88, 89],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Análise de Sentimento"
            subheader="Distribuição média dos últimos 30 dias"
            chart={{
              series: [
                { label: 'Positivo', value: 45.2 },
                { label: 'Neutro', value: 32.8 },
                { label: 'Preocupação', value: 15.3 },
                { label: 'Negativo', value: 6.7 },
              ],
            }}
          />
        </Grid>
      

        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="Mensagens Recentes"
            tableData={_appInvoices}
            headLabel={[
              { id: 'id', label: 'ID Usuário' },
              { id: 'category', label: 'Categoria' },
              { id: 'price', label: 'Sentimento' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

       

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Departamentos com Mais Interações" list={_appInstalled} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Tópicos Mais Discutidos" list={_appAuthors} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Engajamento Mensal"
              total={87}
              icon="solar:chart-square-bold"
              chart={{ series: 87 }}
            />

            <AppWidget
              title="Alertas Críticos"
              total={12}
              icon="solar:danger-triangle-bold"
              chart={{
                series: 35,
                colors: [theme.vars.palette.warning.light, theme.vars.palette.warning.main],
              }}
              sx={{ bgcolor: 'warning.dark', [`& .${svgColorClasses.root}`]: { color: 'warning.light' } }}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
