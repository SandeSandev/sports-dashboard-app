import styled from "@emotion/styled";
import { ListItemButton } from "@mui/material";

export const GameRow = styled(ListItemButton)`
  transition: background-color 0.15s ease;

  &.Mui-selected {
    background-color: rgba(0, 0, 0, 0.08);
  }

  &.Mui-selected:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;