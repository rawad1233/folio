import type { ConfirmDialogProps } from './ConfirmDialog.types';
import './ConfirmDialog.css';

const ConfirmDialog = ({ title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="dialog-title">{title}</h2>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="dialog-cancel" onClick={onCancel}>Cancel</button>
          <button className="dialog-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmDialog };
