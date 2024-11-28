window.addEventListener("load", () => {
    history.replaceState(null, null, window.location.href);
    history.pushState(null, null, window.location.href);

    window.addEventListener("popstate", () => {
        history.pushState(null, null, window.location.href);
    });
});
