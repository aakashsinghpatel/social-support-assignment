import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";

/* 
  * MainLayout
  * Main layout under while all pagest/component renders : Durinng routins
*/
const MainLayout = () => {
  return (
    <Container maxWidth="md">
      <Box mt={1}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default MainLayout;
