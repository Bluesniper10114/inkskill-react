import React from 'react';
import { Spacer } from 'core/components';
import Ads from 'core/components/Ads';
import Tabs, { Tab } from 'core/components/Tabs';
import Slider from 'core/components/Slider';
import NewsTabCard from 'core/components/NewsTabCard';
import { TimeLine } from 'core/modules/time-line';

import UsersSlide from './UsersSlide';
import UsersSliderWrapper from './UsersSliderWrapper';

import adsV from 'assets/img/ads-v-1.png';
import slide1 from 'assets/img/slide-work-1.jpg';
import slide2 from 'assets/img/slide-work-2.jpg';
import slide3 from 'assets/img/slide-work-3.jpg';
import newsPic1 from 'assets/img/news-tab-pic.png';

const WORK_SLIDES = [
  { label: 'The Idea Of God Is Not', image: slide1 },
  { label: 'The Idea Of God Is Not', image: slide2 },
  { label: 'The Idea Of God Is Not', image: slide3 },
];

const USER_SLIDES = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
];

const Content = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-8">
        <TimeLine />
      </div>
      <div className="col-md-4">

        <div className="row">
          <div className="col-md-12 col-sm-6 col-sm-offset-3 col-md-offset-0">
            <Tabs>
              <Tab label="Latest Blog">
                <ul><NewsTabCard data={{ image: newsPic1 }} /></ul>
              </Tab>
            </Tabs>

            <Spacer />

            <Tabs>
              <Tab label="Latest Work">
                <Slider className="work-slide" slides={WORK_SLIDES} />
              </Tab>
            </Tabs>

            <Spacer />

            <Tabs>
              <Tab label="Explore Artist">
                <Slider
                  className="user-slide"
                  slides={USER_SLIDES}
                  slideComponent={UsersSlide}
                />
              </Tab>
            </Tabs>

            <Spacer />

            <Tabs>
              <Tab label="Explore Enthusias">
                <Slider
                  className="user-slide"
                  slides={USER_SLIDES}
                  slideComponent={UsersSlide}
                  wrapper={UsersSliderWrapper}
                />
              </Tab>
            </Tabs>

            <Spacer type="tall" />
            <Ads href="#" image={adsV} />
            <Spacer type="tall" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Content;
