import { findParentElem } from '../../asset';

const onClickOfTreeHeader = (e: any) => {
  const treeHeadderElem = findParentElem('link-tree__header', e.target);
  const id = treeHeadderElem?.dataset.id;
  id && document.getElementById(id)?.classList.toggle('active');
};

export { onClickOfTreeHeader };
