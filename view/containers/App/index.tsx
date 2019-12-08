import React from 'react';
import Helmet from './Helmet';
import { Switch, Route } from 'react-router';
import NotFoundPage from 'containers/NotFoundPage';
import FormPage from 'containers/FormPage/Loadable';
import EditorPage from 'containers/EditorPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import PanelPage from 'containers/PanelPage/Loadable';
import BlogPage from 'containers/BlogPage';
import BlogListPage from 'containers/BlogListPage';


const App: React.SFC<{}> = () => (
  <>
    <Helmet />
    <Switch>
      <Route path='/form/:id' exact component={FormPage} />
      <Route path='/editor/:id' exact component={EditorPage} />
      <Route path='/panel' exact component={PanelPage} />
      <Route path='/blog/:id' exact component={BlogPage} />
      <Route path='/blog' exact component={BlogListPage} />
      <Route path='/' exact component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </>
);

export default App;
