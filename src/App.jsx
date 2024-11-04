import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import youtubefyfull from "./assets/Youtubefy_full.png";
import Input from "./components/Input";

function App() {
  const theme = createTheme({
    spacing: 10,
    palette: {
      primary: {
        main: "#c80000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 10,
        }}
      >
        <Box component="img" my={4} src={youtubefyfull} />
        <Input />
      </Container>
    </ThemeProvider>
  );
}

export default App;
