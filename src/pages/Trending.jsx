import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../components/SingleContent/SingleContent";
import CustomPagination from "../components/Pagination/CustomPagination";


const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=c4ce730828b8e525bc1c971d590c7b03&page=${page}`
    );
    // console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <span className="capitalize flex justify-center font-mono xl:text-[2vw] rounded-3xl p-[4px] lg:text-[2.4vw]">
        Today's Trending
      </span>
      <div className="flex flex-wrap justify-around">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
