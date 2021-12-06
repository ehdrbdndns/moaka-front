export type TabProps = {
  firstName: string; // tab의 첫 번째 아이템 이름
  secondName: string; // tab의 두 번째 아이템 이름
  firstId: string; // tab의 첫 번째 아이템의 고유 값
  secondId: string; // tab의 두 번째 아이템의 고유 값
  mode: React.MutableRefObject<boolean>;
};
