const treeModel = (function makeTreeModel() {
    const nodes = [];
    function addNode() {
        nodes.push('node');
        console.log(nodes);
    }
    return {
        addNode: addNode,
    };
}());

export default treeModel;