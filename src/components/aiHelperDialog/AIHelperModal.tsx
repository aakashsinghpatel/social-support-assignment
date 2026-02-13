import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


/* 
  * Component to show AI suggestion for field of Situatuion form with all action recommended
 */
const AIHelperModal = ({ open, label, suggestion, onAccept, onClose }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const { t } = useTranslation();

  /* 
  * Update required field as AI Modal shown
  */
  useEffect(() => {
    setEditedText(suggestion || "");
    setIsEditing(false);
  }, [open]);

  /* 
  * update test and status on modal close
  */
  const handleClose = () => {
    setIsEditing(false);
    setEditedText(suggestion);
    onClose();
  };

  /* 
  * Trigger event and close modal on accepting the suggestion
  */
  const handleAccept = () => {
    onAccept(editedText);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{label}</DialogTitle>

      <DialogContent dividers>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            minRows={4}
            maxRows={8}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <Typography whiteSpace="pre-line">{editedText}</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{t("discard")}</Button>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>{t("edit")}</Button>
        )}
        {
          <Button onClick={handleAccept} variant="contained">
            {t("accept")}
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default AIHelperModal;
