const elemCreator = (function makeElemCreator() {
    function createInput(type) {
        const input = document.createElement('input');
        input.type = type;
        return input;
    }
    function createButton(innerHTML, classVal) {
        const button = document.createElement('button');
        button.innerHTML = innerHTML;
        button.classList.add(classVal);
        return button;
    }
    function createDiv(children) {
        const div = document.createElement('div');
        div.classList.add('node');
        for (const c of children) {
            div.append(c);
        }
        return div;
    }
    return {
        createInput: createInput,
        createButton: createButton,
        createDiv: createDiv,
    };
}());

export default elemCreator;