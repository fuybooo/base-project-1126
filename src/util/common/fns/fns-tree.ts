/**
 * @Description: 操作树的函数
 * @date 2019-06-27
 */
declare type SortType = 0 | 1 | 2

export interface TreeNode {
  _level: number,
  _sort: number,
  _isLeaf: boolean,
  _parent: TreeNode,
  children: TreeNode[],
  
  [p: string]: any,
}

let nodeMap: any = {}
let sort = 0

/**
 * 将数组转换为树
 * @param list
 * @param sortType 1: 正序排序 2 倒序排序 0 不排序
 * @returns {any[]}
 * 该方法执行过后 访问 nodeMap 可以快捷根据id查找到节点
 */
export function convertListToTree (list: any[], sortType: SortType = 1): TreeNode[] {
  const array = []
  nodeMap = {}
  sort = 0
  for (const item of list) {
    if (isRoot(list, item)) {
      sort ++
      item._level = 1
      item._sort = sort
      nodeMap[item.id] = item
      const children = getChildren(list, item, sortType)
      if (children.length > 0) {
        item.children = children
        item._isLeaf = false
      } else {
        item._isLeaf = true
      }
      array.push(item)
    }
  }
  return sortType === 1 ? array.sort((a: any, b: any) => a.sort - b.sort) : array
}


/**
 * 判断节点是否为根
 * @param list
 * @param item
 * @returns {boolean}
 */
export function isRoot (list: any[], item: any): boolean {
  for (const a of list) {
    if (a.id === item.parentId) {
      return false
    }
  }
  return true
}

/**
 * 获取所有的子元素
 * @param list
 * @param item
 * @param sortType
 * @returns {any[]}
 */
export function getChildren (list: any[], item: any, sortType: SortType = 1) {
  const children = []
  for (const data of list) {
    if (item.id === data.parentId) {
      sort ++
      data._level = item._level + 1
      data._parent = item
      data._sort = sort
      nodeMap[data.id] = data
      const childList = getChildren(list, data, sortType)
      if (childList.length > 0) {
        data.children = childList
        data._isLeaf = false
      } else {
        data._isLeaf = true
      }
      children.push(data)
    }
  }
  return sortType === 1 ? children.sort((a: any, b: any) => a.sort - b.sort) : children
}

/**
 * 获取所有的铺平的子元素
 * @param list
 * @param id
 * @returns {any[]}
 */
export function getFlatChildren (list: any[], id: number) {
  const children: any[] = []
  for (const data of list) {
    if (id === data.parentId) {
      const childList = getFlatChildren(list, data.id)
      if (childList.length) {
        children.push(...childList)
      }
      children.push(data)
    }
  }
  return children
}

export function getRoot (list: any[]) {
  return list.find(item => item.parentId === 0)
}

export function getParentById (list: any[], id: number | string) {
  const crt = list.find(item => item.id === id)
  if (crt) {
    const parent = list.find(item => item.id === crt.parentId)
    if (parent) {
      return parent
    }
  }
  return null
}

export function getParentId (list: any[], id: number) {
  const parent = getParentById(list, id)
  return parent ? parent.id : null
}

export function getAllParentId (list: any[], id: number): any[] {
  return getAllParentById(list, id).map(item => item.id)
}

export function getAllParentById (list: any[], id: number | string, parents: any[] = []): any[] {
  const parent = getParentById(list, id)
  if (parent) {
    parents.unshift(parent)
    const paParent = getParentById(list, parent.id)
    if (paParent) {
      return getAllParentById(list, parent.id, parents)
    }
  }
  return parents
}

export function getAllParentAndChildren (list: any[], id: number): any[] {
  const allParent = getAllParentById(list, id)
  const self = list.find(item => item.id === id)
  const children = getFlatChildren(list, id)
  return [ ...allParent, self, ...children ]
}

/**
 * 根据 value 和 key 获取当前树中的节点
 */
export function getNodeById (treeData: any[], nodeId: number) {
  let resNode = null
  reGetNodeByValue(treeData, nodeId)
  return resNode
  
  function reGetNodeByValue (tree: any[], id: number) {
    for (let i = 0, l = tree.length; i < l; i ++) {
      const node = tree[i]
      if (node.id === id) {
        resNode = node
        break
      } else {
        if (node.children && node.children.length) {
          reGetNodeByValue(node.children, id)
        }
      }
    }
  }
}
