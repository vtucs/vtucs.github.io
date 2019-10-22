function storeUrl(name, root) {
    let url = root.github_raw_content + "/" + root.organization + "/" + root.repository + "/" + root.branch;
    localStorage.setItem(name, url);
}

function redirectToHomepage() {
    window.location.href = "/";
}

function itemClickHandler(url) {
    window.location.href = url;
}

function formatListItem(item) {
    item.classList.add("list-group-item");
}