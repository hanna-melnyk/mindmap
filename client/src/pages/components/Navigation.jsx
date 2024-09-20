//client/src/pages/components/Navigation.jsx
import React from 'react';
import {Link} from 'react-router-dom';

export const Navigation = () => {
  return (
      <nav>
          <ul>
              <li>
                  <Link to="/">Home</Link>
              </li>
              <li>
                  <Link to="/mindmaps/new">Trial Mindmap</Link>
              </li>
          </ul>
      </nav>
  );
};