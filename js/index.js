import treeUi from '/tree/js/treeUi.js';
function go() {
    treeUi.paintNodeDiv();
    treeUi.focus(0);
}
window.onload = function() {
    go();
};