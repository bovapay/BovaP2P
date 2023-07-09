import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';

import { ThemeMode } from 'types/config';
import { CommentOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import useConfig from 'hooks/useConfig';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);
  };

  const theme = useTheme();

  const { mode, onChangeMode } = useConfig();

  const handleModeChange = () => {
    onChangeMode(mode === 'dark' ? ('light' as ThemeMode) : ('dark' as ThemeMode));
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItem>
        <FormControlLabel
          control={<Switch onClick={handleModeChange} checked={mode === 'dark'} />}
          label={'Тёмная тема'}
        ></FormControlLabel>
      </ListItem>
      {/* <ListItemButton selected={selectedIndex === 0} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 4} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton> */}
    </List>
  );
};

export default SettingTab;
