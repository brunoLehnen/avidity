import React, { memo } from 'react';
import { Layout } from 'antd';

import './Header.scss';

const Header: React.FunctionComponent = () => (
  <Layout.Header className="header">
    <div className="header__logo">
      <span className="header__company_name">Audry</span>
      <span className="header__product_name">
        <span>&#60;</span>
        PODCASTS
        <span>&#62;</span>
      </span>
    </div>
  </Layout.Header>
);

export default memo(Header);
