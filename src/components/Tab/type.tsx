export type TabProps = {
  firstId: string; // tab의 첫 번째 아이템의 고유 값
  secondId: string; // tab의 두 번째 아이템의 고유 값
  mode: React.MutableRefObject<boolean>;
};
