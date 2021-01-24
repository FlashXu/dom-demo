window.dom = {
  // 创建新节点
  create(htmlStr) {
    let container = document.createElement("template");
    container.innerHTML = htmlStr.trim(); // 防止用户加空格变成text
    return container.content.firstChild; // 获取template首个子节点的正确用法
  },
  // 在node1后面插入兄弟节点node2
  after(node1, node2) {
    node1.parentNode.insertBefore(node2, node1.nextSibling);
  },
  // 在node1前面插入兄弟节点node2
  before(node1, node2) {
    node1.parentNode.insertBefore(node2, node1);
  },
  // 新增儿子
  append(node1, node2) {
    node1.appendChild(node2);
  },
  // 新增父节点
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  // 删除节点
  remove(node) {
    // node.remove(); 比较新，可能不适用
    node.parentNode.removeChild(node);
    return node;
  },
  // 删除所有子节点
  empty(node) {
    let array = [];
    let currentChild = node.firstChild;
    while (currentChild) {
      array.push(dom.remove(node.firstChild));
      currentChild = node.firstChild;
    }
    return array;
  },
  // 更改属性值
  setAttr(node, name, value) {
    node.setAttribute(name, value);
  },
  // 获取属性值
  getAttr(node, name) {
    return node.getAttribute(name);
  },
  // 更改文本
  text(node, str) {
    if ("innerText" in node) {
      // ie
      node.innerText = str;
    } else {
      // firefox chrome
      node.textContent = str;
    }
  },
  // 更改html
  html(node, str) {
    node.innerHTML = str;
  },
  // 更改style
  style(node, obj) {
    if (arguments.length === 3) {
      node.style[arguments[1]] = arguments[2];
    } else if (typeof obj === "string") {
      return node.style[obj];
    } else {
      for (let key in obj) {
        node.style[key] = obj[key];
      }
    }
  },
  // 更改class操作
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  // 更改事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 查询节点
  find(str, scope) {
    return (scope || document).querySelectorAll(str);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    // 先将伪数组转换为数组再filter
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let currentNode = node.nextSibling;
    while (currentNode && currentNode.nodeType === 3) {
      currentNode = currentNode.nextSibling;
    }
    return currentNode;
  },
  previous(node) {
    let currentNode = node.previousSibling;
    while (currentNode && currentNode.nodeType === 3) {
      currentNode = currentNode.previousSibling;
    }
    return currentNode;
  },
  each(nodeList, fn) {
    nodeList.forEach((item) => {
      fn(item);
    });
  },
  index(node) {
    let childList = node.parentNode.children;
    for (let i = 0; i < childList.length; i++) {
      if (node === childList[i]) return i + 1;
    }
    return undefined;
  },
};
