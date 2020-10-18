import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Layout } from 'antd';

import { ApplicationState } from '../../reducers/States';
import fetchPodcast from '../../actions/PodcastActions';

// Components
import Search from '../../components/SearchBox';

import './Home.scss';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<ApplicationState, unknown, Action>) => ({
  fetchPodcastData: (url: string) => dispatch(fetchPodcast(url)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {
}

const Home: React.FunctionComponent<Props> = ({ fetchPodcastData }: Props) => {
  const history = useHistory();

  function onSearch(url: string): void {
    fetchPodcastData(url);
    history.push('/podcast');
  }

  return (
    <div className="home">
      <Layout.Content className="home__content">
        <Search onSearch={(url) => onSearch(url)} />
      </Layout.Content>
    </div>
  );
};

export default connector(memo(Home));
