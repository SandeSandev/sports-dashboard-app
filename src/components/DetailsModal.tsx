import { Dialog, DialogTitle, DialogContent, Box } from "@mui/material";

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const DetailsModal = ({
  open,
  onClose,
  title,
  children,
}: DetailsModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};
