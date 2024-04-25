import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
// import Fade from 'react-reveal';
import { Container, Row } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 40,
    width: 40,
    // marginLeft: 36,
    marginBottom: 0,
    marginTop: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    fontSize: '1.4em',
  },
  introTexts: {
    whiteSpace: 'pre-wrap',
    fontSize: '1.4em',
    // marginBottom: '60px',
    height: '60px',
  },
  introTextContainers: {
    marginTop: '-95px',
    // '@media (max-width: 768px)': {
    //   marginTop: '-30%',
    // },
    // '@media (min-width: 769px)': {
    //   marginTop: '-30%',
    // },
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.1em',
    fontWeight: 500,
    width: '117%',
    scale: '0.7',
  },
  introContainers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    marginTop: 4,
    marginLeft: '-7%',
    marginBottom: '-28%',
  },
  there: {
    width: '90px',
    height: '70px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  const renderIntro = (intro) => (
    <h4 style={styles.introTexts}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setDatas(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="idfier">
          <div className="section-content-container">
            <Container style={{ padding: '0px', margin: '0px' }}>
              <Row xs={1} sm={1} md={2} lg={2} style={{ display: 'flex', margin: '0px', padding: '0px' }}>
                {/* <div style={{ width: '60%', marginTop: '0px' }}> */}
                <Row style={{ padding: '0px', margin: '0px' }}>
                  {datas
                    ? (
                      <div style={{ padding: '0px', margin: '0px' }}>
                        <div style={styles.introContainers}>
                          <h4 style={{ paddingLeft: '17%' }}>{datas.brings}</h4>
                          <div style={styles.introTextContainers}>
                            {/* {renderSkillsIntro(datas.brings)} */}
                            {renderSkillsIntro(datas.fornt)}
                            {renderSkillsIntro(datas.back)}
                            {renderSkillsIntro(datas.database)}
                            {renderSkillsIntro(datas.api)}
                            {renderSkillsIntro(datas.debug)}
                            {renderSkillsIntro(datas.third)}
                            {renderSkillsIntro(datas.code)}
                            {renderSkillsIntro(datas.com)}
                          </div>
                          {/* <div style={styles.introImageContainer}>
                            <img style={{ width: '80%' }} src={data?.imageSource} alt="profile" />
                          </div> */}
                        </div>
                      </div>
                    )
                    : <FallbackSpinner />}
                </Row>
                {/* </div> */}
                {/* <div style={{ width: '40%', marginLeft: '30px' }}> */}
                <Row>
                  {renderIntro(data.intro)}
                  {data.skills?.map((rows) => (
                    <div key={rows.title} style={{ display: 'flex', paddingLeft: '23%', marginTop: '20px' }}>
                      <br />
                      {/* <h3 style={{ fontSize: '1.2em' }}>{rows.title}</h3> */}
                      {rows.items.map((item) => (
                        <div key={item.title} style={styles.there}>
                          <img
                            style={styles.iconStyle}
                            src={item.icon}
                            alt={item.title}
                          />
                          <p>{item.title}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </Row>
                {/* </div> */}
              </Row>
            </Container>
          </div>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
