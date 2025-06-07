import React from "react";
import "./IgniteProgram.scss";

const IgniteProgram = () => {
  return (
    <div className="ignite-program">
      <div className="container">
        <h1 className="title">IGNITE Program</h1>
        <div className="content">
          <section className="overview">
            <h2>Program Overview</h2>
            <p>
              The IGNITE Program is our flagship 4-week intensive program launched in 2024,
              designed to empower participants with cutting-edge skills and real-world
              experience. The program culminates in a capstone project that showcases
              participants' learning and innovation.
            </p>
          </section>

          <section className="program-structure">
            <h2>Program Structure</h2>
            <div className="timeline">
              <div className="timeline-item">
                <h3>Week 1: Foundation</h3>
                <p>Building core skills and understanding key concepts</p>
              </div>
              <div className="timeline-item">
                <h3>Week 2: Development</h3>
                <p>Hands-on learning and practical application</p>
              </div>
              <div className="timeline-item">
                <h3>Week 3: Integration</h3>
                <p>Advanced concepts and team collaboration</p>
              </div>
              <div className="timeline-item">
                <h3>Week 4: Capstone</h3>
                <p>Project development and final presentation</p>
              </div>
            </div>
          </section>

          <section className="capstone">
            <h2>Capstone Project</h2>
            <p>
              The program culminates in a capstone project where participants apply their
              learning to solve real-world challenges. This final project serves as a
              portfolio piece and demonstrates practical expertise.
            </p>
          </section>

          <section className="apply">
            <h2>Apply Now</h2>
            <p>
              Applications for the next IGNITE Program cohort are now open. Join us for
              this transformative experience and take your skills to the next level.
            </p>
            <button className="apply-button">Apply Now</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IgniteProgram; 