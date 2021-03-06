import './MovieCardMenu.less';

import PropTypes from 'prop-types';
import React, {useCallback, useEffect} from 'react';

import Button from '../../components/Button';

const MovieCardMenu = ({
  showSubMenu, closeSubMenu, showEditMovieWindow, showDeleteMovieWindow
}) => {
  /* https://gist.github.com/pstoica/4323d3e6e37e8a23dd59 */
  const handleBlur = (e) => {
    const {currentTarget} = e;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        // Invoke a callback here
        closeSubMenu();
      }
    }, 0);
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        closeSubMenu();
      }
    },
    [closeSubMenu]
  );

  useEffect(() => {
    if (showSubMenu) {
      window.addEventListener('keydown', handleKeyDown);
      document.getElementById('movieCardMenuCloseButton').focus();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSubMenu, handleKeyDown]);

  return showSubMenu && (
  <div className="movieCardMenuContainer" onBlur={handleBlur}>
    <Button id="movieCardMenuCloseButton" className="closeButton" onClick={closeSubMenu}>
      <i className="fa fa-times" aria-hidden="true" />
    </Button>
    <nav>
      <ul>
        <li
          role="menuitem"
          tabIndex="0"
          className="menuItem"
          onClick={showEditMovieWindow}
          onKeyPress={showEditMovieWindow}
        >
          Edit
        </li>
        <li
          role="menuitem"
          tabIndex="0"
          className="menuItem"
          onClick={showDeleteMovieWindow}
          onKeyPress={showDeleteMovieWindow}
        >
          Delete
        </li>
      </ul>
    </nav>
  </div>
  );
};

MovieCardMenu.propTypes = {
  showSubMenu: PropTypes.bool.isRequired,
  closeSubMenu: PropTypes.func.isRequired,
  showEditMovieWindow: PropTypes.func.isRequired,
  showDeleteMovieWindow: PropTypes.func.isRequired
};

export default MovieCardMenu;
