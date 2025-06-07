import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './AnnualEvent.scss';

// Import resources components
import Workshops2021 from '../Resources/Workshops';
import Workshops2023 from '../Resources2023/Workshops';
import Ceremonies2021 from '../Resources/Ceremonies';
// import Ceremonies2023 from '../Resources2023/Ceremonies';
import Maps2021 from '../Resources/Maps';
import Maps2023 from '../Resources2023/Maps';

const AnnualEvent = () => {
  const [activeYear, setActiveYear] = useState('2023');

  const renderResources = () => {
    const Workshops = activeYear === '2021' ? Workshops2021 : Workshops2023;
    // Only show ceremonies for 2021
    const Ceremonies = activeYear === '2021' ? Ceremonies2021 : null;
    const Maps = activeYear === '2021' ? Maps2021 : Maps2023;

    return (
      <main className="resources">
        <div className="resources-content">
          <header className="resources-header">
            <h2>exploretech.la {activeYear} Resources</h2>
            <div className="pill-divider" />
            <p className="resources-intro">
              Welcome students and teachers! This webpage contains the recordings and resources of all of our 
              workshops and panels for the exploretech.la {activeYear} event! For each workshop or panel, 
              please watch the recording first and check back on this page to access the appropriate 
              resources for the activity.
            </p>
          </header>

          <div className="resources-sections">
            <section className="ceremonies-section">
              {activeYear === '2021' ? (
                <Ceremonies />
              ) : (
                <div className="no-ceremonies">
                  <h3>Ceremonies</h3>
                  <p>No opening or closing ceremony recordings are available for 2023.</p>
                </div>
              )}
            </section>

            <section className="workshops-section">
              <Workshops />
            </section>

            <section className="maps-section">
              <Maps maps={[
                {
                  src: "https://maps.ucla.edu/",
                  name: "UCLA Campus Map"
                }
              ]} />
            </section>

            <section className="feedback-section">
              <h3>Feedback</h3>
              <p>Thanks for coming to our event! Got feedback? Let us know by filling out our feedback form!</p>
              <Button size="lg" variant="info" target="_blank">
                Feedback Form (Coming Soon)
              </Button>
            </section>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className="annual-event">
      <div className="container">
        <header className="page-header">
          <h1>Annual Event</h1>
          <nav className="year-toggle" aria-label="Event year selection">
            <Button 
              variant={activeYear === '2021' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveYear('2021')}
              className={activeYear === '2021' ? 'active' : ''}
            >
              exploretech.la 2021
            </Button>
            <Button 
              variant={activeYear === '2023' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveYear('2023')}
              className={activeYear === '2023' ? 'active' : ''}
            >
              exploretech.la 2023
            </Button>
          </nav>
        </header>

        <div className="content">
          {renderResources()}
        </div>
      </div>
    </div>
  );
};

export default AnnualEvent; 