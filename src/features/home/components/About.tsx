import { Component, createRef } from "react";
import { Link } from "react-router-dom";

import GA from "../../../util/GoogleAnalytics";
import OutboundLink from "../../../components/OutboundLink";
import images from "../../../constants/optimizedImages";
import HomePageSections from "../../../content/sections";
import CarouselSlides from "../content/carousel";
import Carousel, { type CarouselSlideItem } from "./Carousel";

const FoundingStoryLink =
  "https://medium.com/techatucla/exploretechla-founding-story-3bb8a947f931";

// Match the two-column layout without sending desktop images to narrow screens.
const AboutImageSizes =
  "(min-width: 1100px) 520px, (min-width: 640px) 640px, 100vw";

interface AboutState {
  readonly activeIndex: number;
  readonly primed: boolean;
  readonly requestedIndex: number | null;
}

export default class About extends Component<
  Record<string, never>,
  AboutState
> {
  private readonly loadedSlides = new Set<number>();

  private readonly failedSlides = new Set<number>();
  private readonly imageRefs = CarouselSlides.map(() =>
    createRef<HTMLImageElement>(),
  );

  componentDidMount() {
    // Prerendered images may finish before hydration attaches load/error handlers.
    // Reconcile the whole set first so an already-failed neighbour is skipped too.
    this.imageRefs.forEach((ref, index) => {
      const image = ref.current;
      if (!image?.complete) return;
      if (image.naturalWidth > 0) this.loadedSlides.add(index);
      else this.failedSlides.add(index);
    });
    if (this.loadedSlides.size > 0) this.setState({ primed: true });
    if (this.failedSlides.has(this.state.activeIndex))
      this._onSelect(this.state.activeIndex);
  }

  state: AboutState = { activeIndex: 0, primed: false, requestedIndex: null };

  render() {
    return (
      <section
        className="About page-container"
        id={HomePageSections.ABOUT.name}
      >
        <div className="about-content about-org">
          <div className="left-column text">
            <h2 className="section-heading">
              Technology students can try for themselves
            </h2>
            <p>
              Our past events have included virtual reality demonstrations,
              Scratch projects, and developer tools workshops. Students meet
              engineers and UCLA volunteers, ask questions, and try new skills.
            </p>
            <Link className="text-link" to="/resources2026">
              Browse past workshops and resources
            </Link>
          </div>
          {this._renderCarousel()}
        </div>
        <div className="about-content about-team">
          <img
            {...images["images/explore-tech-2022.jpg"]}
            sizes={AboutImageSizes}
            loading="lazy"
            decoding="async"
            className="team-photo left-column"
            alt="The exploretech.la team at the 2022 event"
          />
          <div className="right-column text">
            <h2 className="section-heading">Run by UCLA students since 2017</h2>
            <p>
              exploretech.la is a UCLA Samueli School of Engineering student
              organization. We work with industry and academic organizations to
              give high school students access to STEM experiences.
            </p>
            <div className="section-links">
              <Link
                className="text-link"
                to="/our_team/leadership"
                onClick={() =>
                  GA.trackEvent({
                    category: "Home",
                    action: "Click",
                    label: "Meet the team",
                  })
                }
              >
                Meet the team
              </Link>
              <OutboundLink
                className="text-link"
                href={FoundingStoryLink}
                target="_blank"
                eventLabel="founding_story"
              >
                Read our founding story
              </OutboundLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /**
   * Selection is advisory: the carousel only moves once the requested slide has
   * loaded, and failed slides are stepped over in the direction of travel.
   */
  private _onSelect = (index: number) => {
    const count = CarouselSlides.length;
    if (this.failedSlides.size === count) {
      this.setState({ requestedIndex: null, primed: false });
      return;
    }
    const previous = (this.state.activeIndex + count - 1) % count;
    const direction = index === previous ? -1 : 1;
    let target = index;
    while (this.failedSlides.has(target)) {
      target = (target + direction + count) % count;
    }
    if (this.loadedSlides.has(target)) {
      this.setState({ activeIndex: target, requestedIndex: null });
    } else {
      this.setState({ requestedIndex: target });
    }
  };

  private _onSlideLoad = (index: number) => {
    this.failedSlides.delete(index);
    this.loadedSlides.add(index);
    this.setState((state) => ({
      primed: true,
      activeIndex: state.requestedIndex === index ? index : state.activeIndex,
      requestedIndex:
        state.requestedIndex === index ? null : state.requestedIndex,
    }));
  };

  private _onSlideError = (index: number) => {
    this.failedSlides.add(index);
    this.loadedSlides.delete(index);
    const { activeIndex, requestedIndex } = this.state;
    if (
      index === requestedIndex ||
      (requestedIndex === null && index === activeIndex)
    ) {
      this._onSelect(index);
    }
  };

  // Keep the current slide visible until a requested slide has loaded.
  private _renderCarousel() {
    const { activeIndex, primed, requestedIndex } = this.state;
    const total = CarouselSlides.length;
    const items: readonly CarouselSlideItem[] = CarouselSlides.map(
      (img, index) => {
        const isNeighbour =
          index === activeIndex ||
          index === (activeIndex + 1) % total ||
          index === (activeIndex + total - 1) % total;
        return {
          key: img.alt,
          content: (
            <img
              ref={this.imageRefs[index]}
              {...img}
              alt={img.alt}
              sizes={AboutImageSizes}
              loading={
                index === requestedIndex || (primed && isNeighbour)
                  ? "eager"
                  : "lazy"
              }
              decoding="async"
              onLoad={() => this._onSlideLoad(index)}
              onError={() => this._onSlideError(index)}
            />
          ),
        };
      },
    );

    return (
      <Carousel
        className="right-column"
        items={items}
        activeIndex={activeIndex}
        status={
          this.failedSlides.size === total
            ? "Photos could not load. You can still browse our past workshop resources."
            : requestedIndex !== null
              ? `Loading photo ${requestedIndex + 1} of ${total}.`
              : `Photo ${activeIndex + 1} of ${total}: ${CarouselSlides[activeIndex].alt}`
        }
        onSelect={this._onSelect}
      />
    );
  }
}
