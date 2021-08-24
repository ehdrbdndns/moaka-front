type content = {
  name: string,
  url: string,
  tag: string,
  desc: string
};

type DashboardProps = {
  contents: Array<content>,
};

export default DashboardProps;