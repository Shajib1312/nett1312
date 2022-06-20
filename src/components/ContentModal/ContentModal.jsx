import axios from "axios";
import "./ContantModel.css";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/config.jsx";
import YouTube from "@mui/icons-material/YouTube";
import Carousel from "./Carousel/Carousel";
import { useEffect, useState } from "react";
import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";

const style = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#000",
    border: "1px solid #0a1929",
    borderRadius: 10,
  },
  position: "relative",
  top: "50%",
  left: "50%",
  backgroundColor: "#0a1929",
  width: "70vw",
  boxShadow: 24,
  transform: "translate(-50%, -50%)",
  color: "#fff",
  padding: 4,
};

export default function ContentModal({ children, media_type, id }) {
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=c4ce730828b8e525bc1c971d590c7b03&language=en-US`
      );

      setContent(data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=c4ce730828b8e525bc1c971d590c7b03&language=en-US`
      );

      setVideo(data.results[0]?.key);
    };

    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
