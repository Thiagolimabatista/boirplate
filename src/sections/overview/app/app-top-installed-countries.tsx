import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    apple: number;
    android: number;
    windows: number;
    countryCode: string;
    countryName: string;
  }[];
};

export function AppTopInstalledCountries({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar sx={{ minHeight: 254, flexGrow: 1 }}>
        <Box
          sx={{
            p: 3,
            gap: 3,
            minWidth: 360,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {list.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CountryItemProps = BoxProps & {
  item: Props['list'][number];
};

function Item({ item, sx, ...other }: CountryItemProps) {
  const largeItem = (
    <Box
      sx={{
        gap: 1,
        minWidth: 120,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Iconify icon="solar:users-group-rounded-bold" width={24} sx={{ color: 'primary.main' }} />
      <Typography component="span" variant="subtitle2" noWrap>
        {item.countryName}
      </Typography>
    </Box>
  );

  const smallItem = (icon: string, label: string, value: number) => (
    <Box
      sx={{
        gap: 0.5,
        minWidth: 100,
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
      }}
    >
      <Iconify icon={icon} width={16} sx={{ color: 'text.secondary' }} />
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}:
      </Typography>
      <Typography variant="body2" fontWeight="medium">
        {fShortenNumber(value)}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ gap: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', ...sx }} {...other}>
      {largeItem}
      {smallItem('solar:chat-round-line-bold', 'Msgs', item.android)}
      {smallItem('solar:danger-triangle-bold', 'Alertas', item.windows)}
    </Box>
  );
}
