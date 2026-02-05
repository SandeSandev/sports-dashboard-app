import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          transition: "width 0.2s ease",
          overflowX: "hidden",
        },
      }}
    >
      <Box display="flex" justifyContent="flex-end" p={1}>
        <IconButton onClick={() => setCollapsed((v) => !v)} size="small">
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <List>
        <ListItemButton
          selected={location.pathname === "/"}
          onClick={() => navigate("/")}
        >
          <ListItemIcon>
            <DashboardOutlined />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Overview" />}
        </ListItemButton>

        <ListItemButton
          selected={location.pathname.startsWith("/teams")}
          onClick={() => navigate("/teams")}
        >
          <ListItemIcon>
            <GroupsOutlined />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Teams" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
};
