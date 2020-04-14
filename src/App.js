import React from 'react';
import { spring, AnimatedSwitch } from 'react-router-transition';
import { Route } from 'react-router-dom';
import 'App.css';
import MainTheme from 'templates/MainTheme';
import Reports from 'views/ReportsView';
import Home from 'views/HomeView';
import Categories from 'views/CategoriesView';
import Expense from 'views/ExpenseView';
import Settings from 'views/SettingsView';
import Confirm from 'views/ConfirmView';
import { routes } from 'routes';
// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};
const App = () => {
  return (
    <MainTheme>
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper"
      >
        <Route exact path={routes.home.path} component={Home} />
        <Route exact path={routes.reports.path} component={Reports} />
        <Route exact path={routes.allExpense.path} component={Expense} />
        <Route exact path={routes.settings.path} component={Settings} />
        <Route exact path={routes.categories.path} component={Categories} />
        <Route exact path={routes.confirm.path} component={Confirm} />
      </AnimatedSwitch>
    </MainTheme>
  );
};

export default App;
