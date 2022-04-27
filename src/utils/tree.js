// 创建层级关系
export function buildHierarchyTree(menuTree, pathList = []) {
  if (!Array.isArray(menuTree)) {
    console.warn('menuTree必须是一个数组');
    return;
  }
  if (!menuTree || menuTree.length === 0) return;
  for (const [key, node] of menuTree.entries()) {
    node.id = key;
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null;
    node.pathList = [...pathList, node.id];
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren) {
      buildHierarchyTree(node.children, node.pathList);
    }
  }
  return menuTree;
}
