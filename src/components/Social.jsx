import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  nameStyle: {
    fontSize: '1.5em',
  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="social">
      <p style={styles.nameStyle}>Contact me on Upwork.</p>
      {data ? data.social.map((social) => (
        <SocialIcon
          key={social.network}
          style={styles.iconStyle}
          url={social.href}
          network={social.network}
          bgColor={theme.socialIconBgColor}
          target="_blank"
          rel="noopener"
        />
      )) : null}
    </div>
  );
}

export default Social;

// {
//   "network" : "linkedin",
//   "href": "https://www.linkedin.com/in/tanzila-hameed-282588220/"
// },
// {
//   "network" : "github",
//   "href": "https://github.com/tanzila01"
// },
// {
//   "network" : "email",
//   "href": "mailto:tanzilahameed0@gmail.com"
// },
