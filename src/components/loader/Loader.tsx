import { Backdrop, CircularProgress } from "@mui/material";


/* 
  * Loader 
  * Component to show while make submit API call
  * To blur backgroung and make all field and btn no active
*/
const Loader = ({ loading }: any) => {
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(6px)",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default Loader;
