import React from 'react';
import { Spacer } from 'core/components';

const Content = () => (
  <div className="container single-page-box">

    <Spacer type="tall" />

    <div className="row">
      <div className="col-md-2 col-md-offset-1 text-right-md">
        <span className="title">LAST UPDATED</span>
        <div className="date"><span>JUNE 29,</span>2015</div>
      </div>

      <Spacer type="tall hidden-md hidden-lg" />

      <div className="col-md-8">
        <div className="text-box">
          <p>
            Audio player software is used to play back sound recordings in one of the many formats
            available for computers today. It can also play back music CDs. There is audio player
            software that is native to the computer’s operating system (Windows, Macintosh, and
            Linux) and there are web-based audio players. This article discusses the local computer
            audio players. Advantages of computer audio player software
          </p>
          <p>
            The main advantage of a computer audio player is that you can play your audio CDs and
            there is no longer any need to have a separate CD player. However the capabilities of
            the computer audio player go beyond just playing traditional music CDs. You can also
            play sound clips in one of the many audio formats found in the information technology
            industry today. The MP3 format is a standard whereby a high rate of compression can be
            achieved on sound files allowing the ability to store large numbers of them on hard
            disk. Another advantage is when the computer audio player has ripping capability you
            can extract a sample clip from the sound track for internet posting or emailing. Audio
            players in the form of portable MP3 players like Apple’s iPod are extremely advantageous
            due to their long battery life and capability to be carried practically anywhere.
            Choosing and using a computer audio player.
          </p>
        </div>
      </div>
    </div>

    <Spacer />
  </div>
);

export default Content;
