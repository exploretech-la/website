import React, { Component } from 'react';
import classnames from 'classnames';
import Button from 'react-bootstrap/Button';

export const Maps = (props) => {
    const classNames = classnames('Section', 'Maps', props.className);
    const { maps } = props

    return (
        <section className={classNames}>
            <div className="maps-content">
                <div className="maps-title">
                    <h2>Maps</h2>
                    <div className="pill-divider" />
                </div>
                <h5>
                    Below are links to view all the maps you may need throughout the day!
                </h5>
                <div className="buttons">
                    {maps.map(map => {
                        return <Button size="lg" variant="outline-info" href={map.src} target="_blank">
                            {map.name}
                         </Button>
                        // return <div className="maps-container">
                        //     <img className="maps-image" src={map.src} alt={map.src} />
                        // </div>
                    })}
                </div>
            </div>
        </section>
    );
}

export default Maps;