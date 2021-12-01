import React from 'react';
import NewHeaderForm from './Header/NewHeaderForm';
import Input from './Input/Input';
import Tag from './Tag/Tag';

function Component() {
  const userTestImg = '/img/test/user-test.png';
  return (
    <div className="w-100">
      <NewHeaderForm></NewHeaderForm>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', marginRight: '50px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Input</h1>
          <Input placeholder="placeholder" />
          <Input placeholder="placeholder" prefix={userTestImg} />
          <Input placeholder="placeholder" suffix={userTestImg} />
          <Input
            placeholder="placeholder"
            prefix={userTestImg}
            suffix={userTestImg}
          />
          <Input placeholder="placeholder" error="에러메세지"></Input>
        </div>
        <div style={{ width: '150px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Tag</h1>
          <Tag value="태그" />
          <Tag value="카테고리 선택" type="black" />
        </div>
      </div>
    </div>
  );
}

export default Component;
