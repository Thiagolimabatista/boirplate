'use client';

import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomTabs } from 'src/components/custom-tabs';

import { NotificationItem } from './notification-item';

import type { NotificationItemProps } from './notification-item';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'all', label: 'Todas', count: 22 },
  { value: 'unread', label: 'Não lidas', count: 12 },
  { value: 'archived', label: 'Arquivadas', count: 10 },
];

// ----------------------------------------------------------------------

export type NotificationsDrawerProps = IconButtonProps & {
  data?: NotificationItemProps[];
};

// Dados mockados de notificações em português
const MOCK_NOTIFICATIONS: NotificationItemProps[] = [
  {
    id: '1',
    type: 'order',
    title: '<p><strong>15 funcionários</strong> responderam a pesquisa de sentimentos hoje</p>',
    category: 'Pesquisa de Sentimentos',
    isUnRead: true,
    avatarUrl: null,
    createdAt: new Date().getTime() - 3600000, // 1 hora atrás
  },
  {
    id: '2',
    type: 'chat',
    title: '<p><strong>Maria Silva</strong> solicitou atendimento psicológico em <strong><a href="#">Bem-estar Mental</a></strong></p>',
    category: 'Bem-estar',
    isUnRead: true,
    avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
    createdAt: new Date().getTime() - 7200000, // 2 horas atrás
  },
  {
    id: '3',
    type: 'delivery',
    title: '<p>Taxa de engajamento atingiu <strong>85%</strong> na pesquisa desta semana</p>',
    category: 'Engajamento',
    isUnRead: false,
    avatarUrl: null,
    createdAt: new Date().getTime() - 14400000, // 4 horas atrás
  },
  {
    id: '4',
    type: 'friend',
    title: '<p><strong>João Santos</strong> completou sessão de <strong><a href="#">Acompanhamento Psicológico</a></strong></p>',
    category: 'Atendimento Psicológico',
    isUnRead: false,
    avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
    createdAt: new Date().getTime() - 21600000, // 6 horas atrás
  },
  {
    id: '5',
    type: 'mail',
    title: '<p>Relatório mensal de <strong>bem-estar dos funcionários</strong> disponível</p>',
    category: 'Relatório',
    isUnRead: true,
    avatarUrl: null,
    createdAt: new Date().getTime() - 28800000, // 8 horas atrás
  },
  {
    id: '6',
    type: 'order',
    title: '<p>Nova pesquisa de clima organizacional foi publicada</p>',
    category: 'Pesquisa',
    isUnRead: false,
    avatarUrl: null,
    createdAt: new Date().getTime() - 43200000, // 12 horas atrás
  },
  {
    id: '7',
    type: 'delivery',
    title: '<p><strong>Alerta:</strong> 3 funcionários com nível de estresse elevado</p>',
    category: 'Alerta',
    isUnRead: true,
    avatarUrl: null,
    createdAt: new Date().getTime() - 86400000, // 1 dia atrás
  },
  {
    id: '8',
    type: 'chat',
    title: '<p>Você tem <strong>5 mensagens não lidas</strong> de funcionários</p>',
    category: 'Mensagem',
    isUnRead: false,
    avatarUrl: null,
    createdAt: new Date().getTime() - 172800000, // 2 dias atrás
  },
  {
    id: '9',
    type: 'friend',
    title: '<p><strong>42 funcionários</strong> participaram de atividades de bem-estar esta semana</p>',
    category: 'Notificação',
    isUnRead: false,
    avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-5.webp',
    createdAt: new Date().getTime() - 259200000, // 3 dias atrás
  },
];

export function NotificationsDrawer({ data = [], sx, ...other }: NotificationsDrawerProps) {
  const drawer = useBoolean();

  const [currentTab, setCurrentTab] = useState('all');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  // Usando dados mockados em português ao invés dos dados das props
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isUnRead: false })));
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notificações
      </Typography>

      {!!totalUnRead && (
        <Tooltip title="Marcar todas como lidas">
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      <IconButton onClick={drawer.onFalse} sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>

      <IconButton>
        <Iconify icon="solar:settings-bold-duotone" />
      </IconButton>
    </Stack>
  );

  const renderTabs = (
    <CustomTabs variant="fullWidth" value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                (tab.value === 'archived' && 'success') ||
                'default'
              }
            >
              {tab.count}
            </Label>
          }
        />
      ))}
    </CustomTabs>
  );

  const renderList = (
    <Scrollbar>
      <Box component="ul">
        {notifications?.map((notification) => (
          <Box component="li" key={notification.id} sx={{ display: 'flex' }}>
            <NotificationItem notification={notification} />
          </Box>
        ))}
      </Box>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={drawer.onTrue}
        sx={sx}
        {...other}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <SvgIcon>
            {/* https://icon-sets.iconify.design/solar/bell-bing-bold-duotone/ */}
            <path
              fill="currentColor"
              d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
              opacity="0.5"
            />
            <path
              fill="currentColor"
              d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
            />
          </SvgIcon>
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 1, maxWidth: 420 } }}
      >
        {renderHead}

        {renderTabs}

        {renderList}

        <Box sx={{ p: 1 }}>
          <Button fullWidth size="large">
            Ver todas
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
