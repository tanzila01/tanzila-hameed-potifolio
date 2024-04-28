import React, { useState, useEffect } from 'react';
// import Typewriter from 'typewriter-effect';
// import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '1.5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <div style={styles.mainContainer}>
        <div style={{ flexDirection: 'row' }}>
          <h2 style={styles.inlineChild}>Hi, I&apos;m Tanzila Hameed&nbsp;</h2>
          {/* <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          /> */}
        </div>
        <p style={styles.nameStyle}>{data?.name}</p>
        {/* <p style={styles.nameStyle}>{data?.contact}</p> */}
        <Social />
      </div>
    </div>
  ) : <FallbackSpinner />;
}

export default Home;
