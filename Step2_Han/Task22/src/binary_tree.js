window.onload = binary_tree;

var Global = {}

function binary_tree() {
    var tree = createBinaryDomTree(4);
    document.getElementById('container').appendChild(tree.value);
    Global.root = tree;
}

function node(left, right, value) {
    this.left = left;
    this.right = right;
    this.value = value;
}

function createBinaryDomTree(depth) {
    var newElement = document.createElement('div');
    newElement.className += ' depth-' + depth + " padding-10" + " margin-10";
    var _root = new node(null, null, newElement);
    if (depth > 1) {
        _root.left = createBinaryDomTree(depth - 1);
        _root.right = createBinaryDomTree(depth - 1);
        _root.value.appendChild(_root.left.value);
        _root.value.appendChild(_root.right.value);
    }
    return _root;
}

function PreOrderTraverse(_root, divlist) {
    divlist.push(_root.value);
    if (_root.left != null) PreOrderTraverse(_root.left, divlist);
    if (_root.right != null) PreOrderTraverse(_root.right, divlist);
}

function InOrderTraverse(_root, divlist) {
    if (_root.left != null) InOrderTraverse(_root.left, divlist);
    divlist.push(_root.value);
    if (_root.right != null) InOrderTraverse(_root.right, divlist);
}

function PostOrderTraverse(_root, divlist) {
    if (_root.left != null) PostOrderTraverse(_root.left, divlist);
    if (_root.right != null) PostOrderTraverse(_root.right, divlist);
    divlist.push(_root.value);
}

function ChangeColor(way) {
    var divlist = [];
    _root = Global.root;
    if (way == 'preorder') {
        PreOrderTraverse(_root, divlist);
    } else if (way == 'inorder') {
        InOrderTraverse(_root, divlist);
    } else if (way == 'postorder') {
        PostOrderTraverse(_root, divlist);
    }

    var i = 0;
    var timer = setInterval(function() {
        if (i > 0)
            divlist[i - 1].className = divlist[i - 1].className.replace(' active', '');
        if (i < divlist.length) {
            divlist[i].className += ' active';
        } else {
            clearInterval(timer); }
        i++;
    }, 500)
}