import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.1em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'start',
    display: 'flex',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <div>
                <Row>
                  <Col sm={8} style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                    {parseIntro(data.newf)}
                    {parseIntro(data.newb)}
                    {parseIntro(data.pas)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img style={{ width: '80%', borderRadius: '50%' }} src={data?.imageSource} alt="profile" />
                  </Col>
                </Row>
              </div>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
