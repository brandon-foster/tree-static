import treeModel from '/tree/js/treeModel.js';
import elemCreator from '/tree/js/elemCreator.js';
import addListener from '/tree/js/addListener.js';

function findByLocation(nodes, pathIndexes) {
    console.log(pathIndexes);
    let currGenerationChildren = nodes;
    for (let i = 0; i < pathIndexes.length; i++) {
        const currGenerationIndex = pathIndexes[i];
        if (pathIndexes.length === 1) {
            return currGenerationChildren[pathIndexes[i]];
        }
        return findByLocation(currGenerationChildren, pathIndexes.slice(1, pathIndexes.length));
    }
}

const treeUi = (function makeTreeUi(model) {
    let counter = 0;
    const rootChildren = [];
    addListener('button', 'click', function(e) {
        const classVal = e.target.classList[0];
        console.log(`${classVal} was clicked`);
        const location = e.target.parentElement.dataset.location;
        console.log('location is: ' + location);
        if (classVal === 'addSibling') {
            const generationIndexes = location.split('.');
            let myParentNode;
            if (generationIndexes.length === 1) {
                myParentNode = null;
            }
            else {
                myParentNode = findByLocation(rootChildren, generationIndexes.splice(0, generationIndexes.length - 1));
            }
            console.log('painting my parent node div');
            console.log(myParentNode);
            paintNodeDiv(myParentNode);
        }
        else if (classVal === 'addChild') {
            const generationIndexes = location.split('.');
            console.log('my generationIndexes: ' + generationIndexes);
            const myNode = findByLocation(rootChildren, generationIndexes);
            console.log('painting my node div');
            console.log(myNode);
            paintNodeDiv(myNode);
        }
    });
    function provideNodeInputElem(parentNode = null) {
        const input = elemCreator.createInput('text');
        input.value = 'counter is: ' + counter++;
        const buttonAddSibling = elemCreator.createButton('add sibling', 'addSibling');
        const buttonAddChild = elemCreator.createButton('add child', 'addChild');
        const div = elemCreator.createDiv([input, buttonAddSibling, buttonAddChild]);
        if (parentNode === null) {
            div.dataset.location = rootChildren.length + '';
        }
        else {
            console.log('what is parentNode?');
            console.log(parentNode);
            div.dataset.location = parentNode.dataset.location + '.' + parentNode.chilluns.length;
        }
        console.log('created element with location: ' + div.dataset.location);
        return div;
    }
    function paintNodeDiv(parentNode = null) {
        const node = provideNodeInputElem(parentNode);
        node.chilluns = [];
        if (parentNode === null) {
            rootChildren.push(node);
        }
        else {
            parentNode.chilluns.push(node);
        }
        const containerElem = document.querySelector('#container');
        containerElem.append(node);
        console.log(rootChildren);
        console.log(containerElem.outerHTML);
    }
    function focus(index) {
        rootChildren[index].querySelector('input').focus();
    }
    return {
        paintNodeDiv: paintNodeDiv,
        focus: focus,
    };
}(treeModel));

export default treeUi;