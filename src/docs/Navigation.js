import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({componentNames}) => {
  return ( 
    <ul className="navigation">
      {
        componentNames.map(name => {
          return (
            <li key={name}>
              <a href={`#${name}`}>{name}</a>
            </li>
          );
        })
      }
    </ul>
   );
}

Navigation.propTypes = {
  componentNames: PropTypes.array.isRequired
}
 
export default Navigation;