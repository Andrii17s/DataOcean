import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import useIsLogin from 'hooks/loginHooks';
// import PropTypes from 'prop-types';
import menuItems from 'static/mock/menuItems';
import Nav from 'components/nav/Nav';
import NavDropdown from 'components/nav/NavDropdown';
import NavItem from 'components/nav/NavItem';
import NavMobile from 'components/nav/NavMobile';
import NavMobileDropdown from 'components/nav/NavMobileDropdown';
import NavMobileItem from 'components/nav/NavMobileItem';

import AnalyticsPage from 'components/pages/AnalyticsPage';
import ConstructorPage from 'components/pages/ConstructorPage';
import ContactsPage from 'components/pages/ContactsPage';
import DocumentsPage from 'components/pages/DocumentsPage';

import paths from 'const/paths';

const HomePage = ({ location }) => {
  const isLogin = useIsLogin();
  const [isMobileMenuOpen, setMobileMenuOpened] = useState(false);
  if (!isLogin) {
    return (
      <Redirect
        to={{
          pathname: '/auth/sign-in/',
          state: { from: location },
        }}
      />
    );
  }

  return (
    <>
      <NavMobile isOpen={isMobileMenuOpen} setOpened={setMobileMenuOpened}>
        {
            menuItems.map((item) => (
              item.items ? (
                <NavMobileDropdown item={item}>
                  {
                    item.items.map((i) => (
                      <NavMobileItem item={i} onActivateItem={() => setMobileMenuOpened(false)} />
                    ))
                  }
                </NavMobileDropdown>
              ) :
                <NavMobileItem item={item} onActivateItem={() => setMobileMenuOpened(false)} />))
          }
      </NavMobile>
      <div className="flex">
        <Nav>
          {
            menuItems.map((item) => (
              item.items ? (
                <NavDropdown item={item} pathname={location && location.pathname}>
                  {
                    item.items.map((i) => (
                      <NavItem item={i} />
                    ))
                  }
                </NavDropdown>
              ) :
                <NavItem item={item} />))
          }
        </Nav>
        <div className="content">
          <Switch>
            <Route exact path={paths.CONSTRUCTOR} component={ConstructorPage} />
            <Route exact path={paths.DOCUMENTS} component={DocumentsPage} />
            <Route exact path={paths.CONTACTS} component={ContactsPage} />
            <Route exact path={paths.ANALYTICS} component={AnalyticsPage} />
            <Route exact path={paths.DATASETS} component={ConstructorPage} />
            <Route exact path={paths.MY_DATA} component={ConstructorPage} />
            <Route exact path={paths.HOME} component={() => <div>Home Page </div>} />
            <Route path={paths.LOGIN} render={() => <Redirect to="/auth/sign-in/" />} />
            <Route exact path="*" render={() => <Redirect to="/404/" />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

HomePage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default HomePage;
