export type TabProps = {
  firstName: string | JSX.Element; // tab의 첫 번째 아이템 이름
  secondName: string | JSX.Element; // tab의 두 번째 아이템 이름
  firstId: string; // tab의 첫 번째 아이템의 고유 값
  secondId: string; // tab의 두 번째 아이템의 고유 값
  onClickOfFirst: () => void; //tab의 첫 번째 아이템 클릭 시 이벤트
  onClickOfSecond: () => void; //tab의 두 번째 아이템 클릭 시 이벤트
  activeMode: string; // active될 Tab 이름 ex) first or second
};
