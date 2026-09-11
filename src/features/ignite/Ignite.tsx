import Footer from "../../components/Footer";
import PageNotFound from "../../components/PageNotFound";
import images from "../../constants/optimizedImages";

// Workshop cards sit three-up on desktop; the capstone and apply photos are
// single large images inside their own containers.
const WorkshopImageSizes = "(min-width: 992px) 33vw, 100vw";
const CapstoneImageSizes = "(min-width: 1000px) 900px, 90vw";
const ApplyImageSizes = "(min-width: 992px) 50vw, 100vw";

const ApplicationForm = "https://forms.gle/DKUZARUPjWoxrUif6";

// Every image on this page is below the header section, so they are all lazy.
function lazyPhoto(key: keyof typeof images, sizes: string) {
  return {
    ...images[key],
    sizes,
    loading: "lazy",
    decoding: "async",
  } as const;
}

const IGNITE_ENABLED: boolean = true; // gate

export default function Ignite() {
  if (!IGNITE_ENABLED) {
    return <PageNotFound />;
  }

  return (
    <div className="Ignite">
      <section className="ignite-section header-section">
        <div className="content-wrapper">
          <h1 className="ignite-title">Ignite</h1>
          <div className="ignite-description">
            <p>
              Ignite is a 4-week series of beginner-friendly workshops offering
              an in-depth exploration of current trending topics in technology.
              It is designed to inspire and encourage high school students to
              pursue a career in the STEM/Tech field.
            </p>
          </div>
          <div className="header-buttons">
            <button
              type="button"
              className="btn-apply action action-primary"
              onClick={() => window.open(ApplicationForm, "_blank")}
            >
              Apply Now!
            </button>
            <button
              type="button"
              className="btn-previous action action-inverse"
              onClick={() =>
                document
                  .getElementById("workshops-2025")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Previous Workshop
            </button>
          </div>
        </div>
      </section>

      <section className="ignite-section structure-section">
        <div className="content-wrapper">
          <h2 className="section-header">Program Structure</h2>
          <div className="program-cards-container">
            <div className="program-card">
              <h3 className="content-card-title">Week 1: Foundation</h3>
              <p className="card-description">
                Building core skills and understanding key concepts.
              </p>
            </div>
            <div className="program-card">
              <h3 className="content-card-title">Week 2: Development</h3>
              <p className="card-description">
                Hands-on learning and practical application.
              </p>
            </div>
            <div className="program-card">
              <h3 className="content-card-title">Week 3: Integration</h3>
              <p className="card-description">
                Advanced concepts and team collaboration.
              </p>
            </div>
            <div className="program-card">
              <h3 className="content-card-title">
                Week 4:
                <br />
                Capstone
              </h3>
              <p className="card-description">
                Project development and final presentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="workshops-2025"
        className="ignite-section workshop-section theme-light"
      >
        <div className="content-wrapper">
          <h2 className="section-header">2025 Workshops</h2>
          <div className="workshop-cards-container">
            <div className="workshop-card">
              <h3 className="content-card-title">Introduction to Python</h3>
              <p className="card-description">
                Dive into one of the most versatile and widely used programming
                languages. This track will teach you essential Python concepts
                and guide you through practical projects, perfect for beginners.
              </p>
              <div className="card-image">
                <img
                  {...lazyPhoto("images/ignite/python.jpg", WorkshopImageSizes)}
                  alt="Introduction to Python"
                />
              </div>
            </div>
            <div className="workshop-card">
              <h3 className="content-card-title">
                Game Development with Roblox
              </h3>
              <p className="card-description">
                Design and develop an exciting speed run parkour game using
                Roblox Studio. From building dynamic levels to scripting game
                mechanics with Lua, you'll gain hands-on experience in game
                creation.
              </p>
              <div className="card-image">
                <img
                  {...lazyPhoto(
                    "images/ignite/gamedevroblox.jpg",
                    WorkshopImageSizes,
                  )}
                  alt="Game Development with Roblox"
                />
              </div>
            </div>
            <div className="workshop-card">
              <h3 className="content-card-title">Web Development</h3>
              <p className="card-description">
                Learn how websites are built using HTML and CSS. Build your
                skills throughout the sessions and create your very own custom
                website as a capstone project.
              </p>
              <div className="card-image">
                <img
                  {...lazyPhoto("images/ignite/webdev.jpg", WorkshopImageSizes)}
                  alt="Web Development"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ignite-section workshop-section theme-light">
        <div className="content-wrapper">
          <h2 className="section-header">2024 Workshops</h2>
          <div className="workshop-cards-container">
            <div className="workshop-card">
              <h3 className="content-card-title">Introduction to Python</h3>
              <p className="card-description">
                Dive into one of the most versatile and widely used programming
                languages. This track will teach you essential Python concepts
                and guide you through practical projects, perfect for beginners.
              </p>
              <div className="card-image">
                <img
                  {...lazyPhoto(
                    "images/ignite/PXL_20250215_212102361.MP.jpg",
                    WorkshopImageSizes,
                  )}
                  alt="Introduction to Python"
                />
              </div>
            </div>
            <div className="workshop-card">
              <h3 className="content-card-title">
                Game Development with Unity
              </h3>
              <p className="card-description">
                Design and develop an exciting speed run parkour game using
                Roblox Studio. From building dynamic levels to scripting game
                mechanics with Lua, you'll gain hands-on experience in game
                creation.
              </p>
              <div className="card-image">
                <img
                  {...lazyPhoto(
                    "images/ignite/gamdev.jpeg",
                    WorkshopImageSizes,
                  )}
                  alt="Game Development with Unity"
                />
              </div>
            </div>
            <div className="workshop-card">
              <h3 className="content-card-title">Machine Learning</h3>
              <p className="card-description">
                Learn how websites are built using HTML and CSS. Build your
                skills throughout the sessions and create your very own custom
                website as a capstone project.
              </p>
              <div className="card-image">
                <img
                  {...lazyPhoto("images/ignite/ML.png", WorkshopImageSizes)}
                  alt="Machine Learning"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ignite-section capstone-section theme-light">
        <div className="content-wrapper">
          <h2 className="section-header">Capstone Project</h2>
          <p className="section-subtitle">
            The program culminates in a capstone project...
          </p>
          <div className="capstone-image-container">
            <img
              {...lazyPhoto("images/ignite/collab1.jpg", CapstoneImageSizes)}
              alt="Capstone Project Presentation"
            />
          </div>
        </div>
      </section>

      <section className="ignite-section footer-apply-section">
        <div className="content-wrapper split-layout">
          <div className="left-text-col">
            <h1 className="section-header align-left">Apply Now!</h1>
            <p className="section-subtitle-small">
              Applications for the next IGNITE are open...
            </p>
            <button
              type="button"
              className="btn-apply-large action action-primary"
              onClick={() => window.open(ApplicationForm, "_blank")}
            >
              Apply
            </button>
          </div>

          <div className="right-image-col">
            <div className="apply-image">
              <img
                {...lazyPhoto("images/ignite/cllab2.jpg", ApplyImageSizes)}
                alt="Students Workshop"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
