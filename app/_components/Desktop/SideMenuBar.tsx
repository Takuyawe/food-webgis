import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";

const TailWindListItemButton = "p-0 h-12 w-12 items-center justify-center";

const SideMenuBar = () => {
  return (
    <Box bgcolor="#ffffff" height="100vh">
      <List className="flex flex-col h-[40%] justify-around">
        <ListItem disablePadding className="">
          <ListItemButton className={TailWindListItemButton}>
            <ListItemIcon className="min-w-0">
              <MenuIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="">
          <ListItemButton className={TailWindListItemButton}>
            <ListItemIcon className="min-w-0">
              <AccountBoxIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="">
          <ListItemButton className={TailWindListItemButton}>
            <ListItemIcon className="min-w-0">
              <HistoryIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Divider className="border-b-2" />
      </List>
    </Box>
  );
};

export default SideMenuBar;
