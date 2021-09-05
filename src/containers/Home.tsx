import React from 'react';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <div>
      <img
        src={'img/moaka_korean_logo.png'}
        width={'100%'}
        alt={'korean_logo'}
      ></img>
      <Footer
        title="모두가 함께하는 아카이브 모아카"
        description="서로 다른 mbti들의 모임"
      />
    </div>
  );
}

export default Home;
