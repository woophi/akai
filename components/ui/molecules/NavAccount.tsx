import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { goToSpecific } from 'core/common';
import { checkAuth, logout } from 'core/operations/auth';
import { getUserId, hasRoleSuperAdmin, isAdmin } from 'core/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';

const gotoLogin = () => goToSpecific('/login');

const gotoRegistration = () => goToSpecific('/register');

const gotoAdmin = () => goToSpecific('/admin');

const gotoAgenda = () => goToSpecific('/dash');

const gotoProfile = () => goToSpecific('/me');

export const NavAccount = React.memo<{ mobile?: boolean }>(({ mobile = false }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userAdmin = useSelector(isAdmin);
  const userGod = useSelector(hasRoleSuperAdmin);
  const userId = useSelector(getUserId);
  const open = Boolean(anchorEl);

  const { t } = useTranslation('common');

  React.useEffect(() => {
    checkAuth();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = React.useCallback(() => {
    handleClose();
    logout();
  }, []);
  return (
    <Box marginLeft={mobile ? undefined : 'auto'}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color={mobile ? 'primary' : undefined}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {userId ? (
          <div>
            {userAdmin && <MenuItem onClick={gotoAdmin}>Админ</MenuItem>}
            {userGod && <MenuItem onClick={gotoAgenda}>Agenda</MenuItem>}
            <MenuItem onClick={gotoProfile}>{t('acc.profile')}</MenuItem>
            <MenuItem onClick={handleLogout}>{t('acc.logOut')}</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={gotoLogin}>{t('acc.logIn')}</MenuItem>
            <MenuItem onClick={gotoRegistration}>{t('acc.registr')}</MenuItem>
          </div>
        )}
      </Menu>
    </Box>
  );
});
