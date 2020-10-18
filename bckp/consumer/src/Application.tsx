import React, { memo } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Podcast from './containers/Podcast';
import Header from './components/Header';
import Footer from './components/Footer';

import './Application.scss';

const Application: React.FunctionComponent = () => (
  <Layout className="container">
    <Header />
    <Layout.Content>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/podcast">
          <Podcast />
        </Route>
        <Route path="/podcasts/:id">
          <Podcast />
        </Route>
      </Switch>
    </Layout.Content>
    <Footer />
  </Layout>
);

export default memo(Application);
