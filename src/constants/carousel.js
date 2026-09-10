import images from "./optimizedImages";

// Each entry spreads straight onto an <img>: src, srcSet, sizes, width, height.
const CaourselImages = [
  {
    ...images["images/demo-microsoft-vr.jpg"],
    alt: "VR Demo",
  },
  {
    ...images["images/workshop-dev-tools.jpg"],
    alt: "Dev Tools Workshop",
  },
  {
    ...images["images/workshop-kaylie.jpg"],
    alt: "Workshop Speaker",
  },
  {
    ...images["images/workshop-scratch.jpg"],
    alt: "Scratch Workshop",
  },
  {
    ...images["images/workshop-audience.jpg"],
    alt: "Workshop Audience",
  },
];

export default CaourselImages;
