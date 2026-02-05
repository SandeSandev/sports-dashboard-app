import { Box, Drawer, Typography } from "@mui/material";

export type DrawerConfig =
  | {
      open: true;
      title: string;
      content: React.ReactNode;
    }
  | {
      open: false;
    };

export const DetailsDrawer = ({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: "100vw", sm: 420 }, p: 2 }}>
        {title && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Drawer>
  );
};
