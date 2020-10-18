import React, { memo, ReactElement } from 'react';
import { Facebook } from 'react-content-loader';

interface Props {
  show: boolean;
  children: ReactElement;
}

const Loader: React.FunctionComponent<Props> = ({ show, children }: Props) => (
  show ? (<Facebook />) : children
);

export default memo(Loader);
