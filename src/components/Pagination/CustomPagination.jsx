import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});
export default function CustomPagination({ setPage, numOfPages = 987 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Pagination
            onChange={(e) => handlePageChange(e.target.textContent)}
            count={numOfPages}
            color="primary"
            
          />
        </ThemeProvider>
      </div>
    </>
  );
}
