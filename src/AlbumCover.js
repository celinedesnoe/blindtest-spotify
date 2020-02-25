import React from "react";

const AlbumCover = (props) => 
(
    <img src={props.currentTrack.album.images[0].url} alt="cover" style={{ width: "50px", height: "50px" }} />
)

export default AlbumCover;