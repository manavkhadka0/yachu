"use client";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

const VideoShowcase = () => {
  return (
    <div>
      <Lightbox
        plugins={[Video]}
        slides={[
          {
            type: "video",
            width: 1280,
            height: 720,
            poster: "/public/poster-image.jpg",
            sources: [
              {
                src: "https://youtu.be/ApQO7TFqubI",
                type: "video/mp4",
              },
            ],
          },
          // ...
        ]}
        // ...
      />
    </div>
  );
};
export default VideoShowcase;
