import React from 'react';

export default function PageContent({children}) {
  return (
    <div className="main-content">
      {children}
    </div>
  );
}