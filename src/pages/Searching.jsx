import { Button, Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Search from "@mui/icons-material/Search";
import SingleContent from "../components/SingleContent/SingleContent";
import CustomPagination from "../components/Pagination/CustomPagination";

const Searching = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=c4ce730828b8e525bc1c971d590c7b03&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <div className="flex m-[15px 0] bg-white">
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          id="standard-basic"
          label="Searching"
          variant="standard"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={fetchSearch}
          variant="outlined"
          style={{ marginLeft: 10 }}
        >
          <Search />
        </Button>
      </div>

      <Tabs
        value={type}
        textColor="primary"
        indicatorColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab
          style={{ width: "50%", color: "grey" }}
          label="Search Movies"
        />
        <Tab
          style={{ width: "50%", color: "#fff" }}
          label="Search TV Series"
        />
      </Tabs>

      <div className="flex flex-wrap justify-around">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Searching;
