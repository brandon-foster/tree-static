function addListener(selector, event, handler) {
    document.body.addEventListener(event, function(e) {
        if (e.target.matches(selector)) {
            handler(e);
        }
    }, true)
}

export default addListener;