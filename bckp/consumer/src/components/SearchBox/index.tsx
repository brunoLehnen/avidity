import React, { memo } from 'react';
import { Input } from 'antd';

import './Search.scss';

interface Props {
  onSearch: (url: string) => void
}

const Search: React.FunctionComponent<Props> = (props: Props) => (
  <div className="search-box">
    <span className="search-box__title">Search Podcast</span>
    <Input.Search
      enterButton="Search"
      size="large"
      onSearch={(search) => props.onSearch(search)}
      placeholder="TYPE PODCAST URL"
    />
  </div>
);

export default memo(Search);
