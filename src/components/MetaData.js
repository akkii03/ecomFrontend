import React from 'react';
import { Helmet } from 'react-helmet';

export default function metaData({title}) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
