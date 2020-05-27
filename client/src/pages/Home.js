import React from 'react';

import './Home.css';
import PageContent from '../PageContent';

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-heading">Hero Heading</h1>
          <p>Hero subtext goes here</p>
        </div>
      </div>
      <PageContent>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et felis in arcu pulvinar cursus. Nullam auctor, ligula sit amet interdum euismod, justo ex convallis sapien, molestie tristique dolor elit quis mauris. Aliquam purus sapien, tempus vel lacus ac, sagittis rhoncus ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam vitae dolor turpis. Donec lorem elit, sollicitudin quis elit nec, interdum cursus neque. Ut sagittis, dolor placerat tempus rutrum, risus libero mollis nisi, vitae mattis augue urna vel metus. Proin at felis neque. Aliquam porttitor felis non turpis ullamcorper, et venenatis felis ornare. Phasellus turpis eros, tristique et odio ac, ullamcorper interdum ipsum.</p>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce vitae eros sit amet nisl vehicula iaculis at suscipit diam. Aenean orci libero, suscipit at ultricies eget, tincidunt a leo. Donec lacinia condimentum tincidunt. Donec aliquam fringilla facilisis. Praesent mattis lacinia commodo. Mauris turpis lectus, laoreet sed imperdiet tincidunt, volutpat a justo. Quisque aliquam ante quis augue porttitor lacinia. Mauris iaculis, odio malesuada gravida aliquet, sem erat feugiat nulla, sed ullamcorper dui massa lobortis felis. Sed semper urna dolor, a tristique est mollis at. Sed urna odio, mattis sit amet magna ut, tincidunt gravida leo.</p>
      </PageContent>
    </>
  );
}