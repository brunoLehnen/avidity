import React, { memo } from 'react';
import { ResponsePodcastData } from 'api_types';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './PodcastBox.scss';

interface Props {
  podcast: ResponsePodcastData;
}

const Podcast: React.FunctionComponent<Props> = ({ podcast }: Props) => {
  const size = {
    xs: 100,
    sm: 150,
    md: 200,
    lg: 250,
    xl: 300,
    xxl: 300,
  };

  const img = podcast.artwork.big || podcast.artwork.medium || podcast.artwork.small;

  return (
    <div className="podcast-box">
      <div className="podcast-box__title">{ podcast.name }</div>
      <div>
        { (podcast.author.name && <div className="podcast-box__subTitle">{ podcast.author.name }</div>) }
        {
          (img)
            ? <Avatar shape="square" size={size} src={img} />
            : <Avatar shape="square" size={size} icon={<UserOutlined />} />
        }
      </div>
      <div className="podcast-box__menu">
        { podcast.genres.map((genre) => (<span className="podcast-box__menu__genre" key={genre}>{genre}</span>))}
        <a href="/" className="podcast-box__menu__more-details">More details</a>
      </div>
      <div className="podcast-box__summary">
        { (podcast.additionalInfo?.summary) }
      </div>
    </div>
  );
};

export default memo(Podcast);
