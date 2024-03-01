import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
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
    marginBottom: '60px',
  },
  introTextContainers: {
    margin: 5,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '0.8em',
    fontWeight: 500,
  },
  introContainers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    marginTop: 4,
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
        <Fade>
          <div className="section-content-container">
            <Container>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '60%', marginTop: '0px' }}>
                  {datas
                    ? (
                      <div>
                        <div style={styles.introContainers}>
                          <h4>{datas.brings}</h4>
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
                </div>
                <div style={{ width: '40%', marginLeft: '30px' }}>
                  {renderIntro(data.intro)}
                  {data.skills?.map((rows) => (
                    <div key={rows.title} style={{ display: 'flex', paddingLeft: '78px', marginTop: '20px' }}>
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
                </div>
              </div>
              {/* {renderSkillsIntro(data.intro)}
              {data.skills?.map((rows) => (
                <div key={rows.title}>
                  <br />
                  <h3>{rows.title}</h3>
                  {rows.items.map((item) => (
                    <div key={item.title} style={{ display: 'inline-block' }}>
                      <img
                        style={styles.iconStyle}
                        src={item.icon}
                        alt={item.title}
                      />
                      <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              ))} */}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
