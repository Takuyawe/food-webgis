import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";
import { useCustomContext } from "@/app/_context/context";

const TailWindListItemButton = "p-0 h-12 w-12 items-center justify-center";

const SideMenuBar = () => {
  const {
    targetedPlace,
    isFoodBoxOpen,
    setIsFoodBoxOpen,
    isDetailBoxOpen,
    setIsDetailBoxOpen,
    showSearchButton,
    setShowSearchButton,
  } = useCustomContext();

  const handleOpenCloseClick = () => {
    setIsFoodBoxOpen(!isFoodBoxOpen);
    setShowSearchButton(!showSearchButton);
    if (isDetailBoxOpen) setIsDetailBoxOpen(!isDetailBoxOpen);
  };

  return (
    <Box
      bgcolor="#ffffff"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
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
      <div className="flex justify-center items-end h-[10%] mb-4">
        {targetedPlace && (
          <IconButton onClick={handleOpenCloseClick} className="p-0">
            {isFoodBoxOpen ? (
              <KeyboardDoubleArrowLeftIcon fontSize="large" />
            ) : (
              <KeyboardDoubleArrowRightIcon fontSize="large" />
            )}
          </IconButton>
        )}
      </div>
    </Box>
  );
};

export default SideMenuBar;
