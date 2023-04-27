import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory(); // copy of our container browser history

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // destructure pathname from the location arg & rename
      onNavigate: ({ pathname: nextPathname }) => {
        // get current location in our container
        const { pathname } = history.location;

        // if current path does not equal next path then update history
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    // listen for changes in child microfes
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />
};
