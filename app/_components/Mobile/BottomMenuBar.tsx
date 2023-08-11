import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";

const TailWindListItemButton = "p-0 h-8 w-8 items-center justify-center";

const BottomMenuBar = () => {
  return (
    <div className="bg-white h-full w-full">
      <List className="flex justify-around h-full">
        <ListItem disablePadding className="">
          <ListItemButton className={TailWindListItemButton}>
            <ListItemIcon className="min-w-0">
              <MenuIcon fontSize="medium" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="">
          <ListItemButton className={TailWindListItemButton}>
            <ListItemIcon className="min-w-0">
              <AccountBoxIcon fontSize="medium" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="">
          <ListItemButton className={TailWindListItemButton}>
            <ListItemIcon className="min-w-0">
              <HistoryIcon fontSize="medium" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default BottomMenuBar;
