Global = {
    treeList : []
};

window.onload = MultiWayTree;

function MultiWayTree() {
    var _root = createTree(4);
    var domTree = createDomTree(_root);
    domTree.className = domTree.className.replace('margin-10 child','parent');
    document.getElementById('container').appendChild(domTree);
}

function node(value, childNum) {
    this.value = value;
    this.children = [];
}

function createTree(depth) {
    var childNum = parseInt(Math.random() * 3) + 1;
    var _root = new node(depth, childNum);
    if (depth > 1) {
        for (var i = 0; i < childNum; i++) {
            _root.children[i] = createTree(depth - 1);
        }
    }
    return _root;
}

function createDomTree(_root) {
    var newDiv = document.createElement('div');
    var newContent = document.createTextNode(_root.value);
    newDiv.appendChild(newContent);
    newDiv.className += 'padding-10 margin-10 child';
    
    Global.treeList.push(newDiv);

    if (_root.children.length != 0) {
        for (child of _root.children) {
            newDiv.appendChild(createDomTree(child));
        }
    }
    return newDiv;
}

function bfsTraverse() {
    var list = Global.treeList;
    var i = 0;
    var timer = setInterval(function() {
        if (i > 0)
            list[i - 1].className = list[i - 1].className.replace(' active', '');
        if (i < list.length) 
            list[i].className += ' active';
        else clearInterval(timer);
        i++;
    }, 500);
}
