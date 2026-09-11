import images from "../../../constants/optimizedImages";
import type { OptimizedImage } from "../../../content/types";

/** Each slide spreads straight onto an <img>: src, srcSet, sizes, width, height. */
export interface CarouselSlide extends OptimizedImage {
  readonly alt: string;
}

const CarouselSlides: readonly CarouselSlide[] = [
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

export default CarouselSlides;
