import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../features/application/applicationSlice";


type ErrorProps = {
  errorMessage:string | null
}
/* 
  * ErrorAlert
  * Component to show error based on API Call response/error
 */
const ErrorAlert = ({ errorMessage }: ErrorProps) => {
  const dispatch = useDispatch();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!errorMessage}
      autoHideDuration={4000}
      onClose={() => dispatch(setErrorMessage(""))}
    >
      <Alert severity="error">{errorMessage}</Alert>
    </Snackbar>
  );
};

export { ErrorAlert };
