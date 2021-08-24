import React from 'react';
import Dashboard from '../components/MyPage/Dashboard';

function MyPage() {
  const contents = [
    {
      name: 'link1',
      url: 'www.naver.com',
      tag: '네이버',
      desc: '네이버로 이동합니다.',
    },
    {
      name: 'link2',
      url: 'www.daum.net',
      tag: '다음',
      desc: '다음으로 이동합니다.',
    },
  ];
  return (
    <div>
      <Dashboard contents={contents} />
    </div>
  );
}

export default MyPage;
