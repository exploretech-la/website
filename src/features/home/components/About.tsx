import { Component } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

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
  "(min-width: 1100px) 480px, (min-width: 768px) 46vw, 100vw";

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

  state: AboutState = { activeIndex: 0, primed: false, requestedIndex: null };

  render() {
    return (
      <section className="Section About" id={HomePageSections.ABOUT.name}>
        <div className="about-content about-org">
          <div className="left-column text">
            <div className="section-title">
              <h3 className="title">What is exploretech.la?</h3>
              <div className="pill-divider" />
            </div>
            <div className="about-description">
              <p>
                exploretech.la is a UCLA Samueli School of Engineering student
                organization that hosts an annual event that aims to inspire
                high school students from underserved communities in the Greater
                Los Angeles Area to explore computer science, engineering, and
                technology.
              </p>
              <p>
                In partnership with industry and academic organizations, our
                event introduces students to the various applications of tech
                through our panels, interactive workshops, and exhibition hall.
              </p>
              <p>
                Every year, exploretech.la welcomes around 500 students to our
                in-person event. The event will take place in early April, and
                we would love for you to{" "}
                <a className="in-text-link" href="#get-involved">
                  attend
                </a>
                !
              </p>
            </div>
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
            alt="Our Team"
          />
          <div className="right-column text">
            <div className="section-title">
              <h3 className="title">Who is exploretech.la?</h3>
              <div className="pill-divider" />
            </div>
            <p>
              Founded in 2017 as student organization at UCLA, exploretech.la is
              run by students for students. We apply our insights as recent high
              school graduates to create engaging and impactful learning
              experiences for our younger peers. We believe that every student
              should have equal access to STEM education and opportunities.
            </p>
            <div className="current-team">
              <Link
                to="/our_team"
                onClick={() =>
                  GA.trackEvent({
                    category: "Outbound",
                    action: "Click",
                    label: "current_team",
                  })
                }
              >
                <p>Check out our current full team</p>
                <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
              </Link>
            </div>
            <div className="founding-story">
              <OutboundLink
                href={FoundingStoryLink}
                target="_blank"
                eventLabel="founding_story"
              >
                <p>Read about our founding story</p>
                <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
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
        interval={primed && requestedIndex === null ? 5000 : null}
        onSelect={this._onSelect}
      />
    );
  }
}
