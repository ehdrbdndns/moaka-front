import React from 'react';
import NewHeaderForm from './Header/NewHeaderForm';
import Input from './Input/Input';

function Component() {
  const userTestImg = '/img/test/user-test.png';
  return (
    <div className="w-100">
      <NewHeaderForm></NewHeaderForm>
      <div style={{ width: '200px' }}>
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
    </div>
  );
}

export default Component;
