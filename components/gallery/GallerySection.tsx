// import { notFound } from "next/navigation";
// import Gallery from "./Gallery";
// import Link from "next/link";
// import { BASE_API_URL } from "@/utils/config";

// async function getGalleryData() {
//     const res = await fetch(BASE_API_URL + "/image-galleries", { next: { revalidate: 10 }, });
//     if (!res.ok) {
//         notFound();
//     }
//     const data=await res.json();
//     return data
// }

// export default async function Gallery() {
//     const g_data = await getGalleryData();
//     const images=g_data.image;

//     const newImages = (images ) => {
//         let neImgs = images;
//         neImgs.forEach((image: { image: string; }) => {
//             image.image = "https://api.condomonk.ca" + image.image;
//         });
//         for (let i = images.length; i < 7; i++) {
//             neImgs.push({
//                 id: 0,
//                 image: "https://condomonk.ca/noimage.webp",
//             });
//         }
//         return neImgs;
//     };

//     const convDash = (add) => {
//         var result = add.split(" ").join("-");
//         var newresult = result.split(",").join("-");
//         return newresult;
//     };

//     const doTOcheck = (noo) => {
//         if (parseInt(noo) != 0) {
//             return "- High $ " + Nformatter(noo, 2);
//         }
//     };

//     const doTOcheck2 = (noo) => {
//         if (parseInt(noo) != 0) {
//             return "Low $ " + Nformatter(noo, 2);
//         } else {
//             return "Pricing not available";
//         }
//     };

//     function checkPricing(prii, priito) {
//         if (parseInt(prii) == 0) {
//             return `Pricing not available`;
//         } else {
//             return "Starting from " + doTOcheck2(prii);
//         }
//     }

//     return (
//         <>
//             <div className="pt-lg-1 pt-0">
//                 <div className="container ">
//                     <Gallery
//                         images={data.preconstruction.image}
//                         project_name={data.preconstruction.project_name}
//                         project_address={data.preconstruction.project_address}
//                     ></Gallery>
//                 </div>
//             </div>
//         </>
//     );
// }
