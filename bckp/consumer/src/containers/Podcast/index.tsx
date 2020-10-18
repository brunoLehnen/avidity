/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Layout } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';

import { getPodcast } from '../../reducers/PodcastReducer';
import { ApplicationState, PodcastState } from '../../reducers/States';

// Components
import Loader from '../../components/Loader';
import PodcastBox from '../../components/PodcastBox';

import './Podcast.scss';

const mapStateToProps = (state: ApplicationState) => ({
  podcast: getPodcast(state),
});

const connector = connect(mapStateToProps);

interface Props extends ConnectedProps<typeof connector> {
  podcast: PodcastState;
}

const Podcast: React.FunctionComponent<Props> = ({ podcast }: Props) => {
  const history = useHistory();
  return (
    <div className="podcast">
      <Layout.Content className="podcast__content">
        <div className="podcast__back-button">
          <span tabIndex={0} role="button" onClick={() => history.push('/')}>
            <CaretLeftOutlined />
            <span>Back</span>
          </span>
        </div>
        <Loader show={podcast.loading}>
          { (podcast.podcastData) ? <PodcastBox podcast={podcast.podcastData} /> : <Redirect to="/" /> }
        </Loader>
      </Layout.Content>
    </div>
  );
};

export default connector(memo(Podcast));
