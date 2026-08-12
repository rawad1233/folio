export interface ConfirmDialogProps {
  title: string;            // "Delete expense?"
  message: string;          // "This will remove 'Costco run' permanently."
  onConfirm: () => void;
  onCancel: () => void;
}
