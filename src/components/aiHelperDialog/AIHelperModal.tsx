import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type AiModalProps = {
  open:boolean;
  label:string;
  suggestion:string;
  onAccept: (text: string)=>void;
  onClose: ()=>void;
}
/* 
  * Component to show AI suggestion for field of Situatuion form with all action recommended
 */
const AIHelperModal = ({ open, label, suggestion, onAccept, onClose }: AiModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(suggestion);
  const { t } = useTranslation();

  /* 
  * update test and status on modal close
  */
  const handleClose = () => {
    setIsEditing(false);
    setEditedText("");
    onClose();
  };

  /* 
  * Trigger event and close modal on accepting the suggestion
  */
  const handleAccept = () => {
    onAccept(editedText);
    setIsEditing(false);
  };

  /* handleEdit
  * make editable suggestion  in textfield
  */
  const handleEdit = () => {
    setIsEditing(true)
    setEditedText(suggestion);
  }

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
          <Button onClick={() => handleEdit()}>{t("edit")}</Button>
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
