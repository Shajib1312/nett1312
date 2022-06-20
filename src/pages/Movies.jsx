import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../components/SingleContent/SingleContent";
import CustomPagination from "../components/Pagination/CustomPagination";
import Genres from "../components/Genres/Genres";
import useGenre from "../hooks/useGenre";

const Movies = () => {

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);


  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=c4ce730828b8e525bc1c971d590c7b03&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL,page]);

  return (
    <div>
      <span className="capitalize flex justify-center font-mono xl:text-[2vw] rounded-3xl p-[4px] lg:text-[2.4vw]">
        Movies
      </span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="flex flex-wrap justify-around">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
