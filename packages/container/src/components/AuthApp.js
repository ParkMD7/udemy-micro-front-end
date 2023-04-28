import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';

export default ({ onAuthChange }) => {
  const ref = useRef(null);
  const history = useHistory(); // copy of our container browser history

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // callback passed to all child mfes to check for nav changes
      onNavigate: ({ pathname: nextPathname }) => {
        // get current location in our container
        const { pathname } = history.location;

        // if current path does not equal next path then update history
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      // callback passed to Auth mfe to check for changes in signup / signin / signout
      onAuthChange,
    });

    // listen for changes in child microfes
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />
};
