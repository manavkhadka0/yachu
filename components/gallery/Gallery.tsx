// "use client";
// import LightGallery from "lightgallery/react";
// import Link from "next/link";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";

// import lgThumbnail from "lightgallery/plugins/thumbnail";
// import lgZoom from "lightgallery/plugins/zoom";
// import { BASE_API_URL } from "@/utils/config";

// export default function Gallery(props: { images: any[]; project_name: string; project_address: string; }) {
//   const onInit = () => {
//     console.log("lightGallery has been initialized");
//   };

//   const newImages = (images:any[]) => {
//     let neImgs = images;
//     neImgs.forEach((image) => {
//       image.image = BASE_API_URL + image.image;
//     });
//     for (let i = images.length; i < 7; i++) {
//       neImgs.push({
//         id: 0,
//         image: "https://condomonk.ca/noimage.webp",
//       });
//     }
//     return neImgs;
//   };

//   return (
//     <div className="my-3 grid-cont">
//       <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
//         {newImages(props.images)
//           ?.slice(0, 7)
//           .map((image, no) => (
//             <Link
//               href={`${image.image}`}
//               className={`position-relative g-item grid-item${parseInt(
//                 no + 1
//               )}`} /* Adjusted class assignment */
//               key={no}
//             >
//               <img
//                 alt={`${props.project_name} located at ${props.project_address
//                   } image ${no + 1}`}
//                 className="img-fluid w-100 h-100 rounded-mine lazy"
//                 src={`${image.image}`}
//               />
//             </Link>
//           ))}
//       </LightGallery>
//     </div>
//   );
// }
