function storeUrl(name, root) {
    let url = root.github_raw_content + "/" + root.organization + "/" + root.repository + "/" + root.branch;
    localStorage.setItem(name, url);
}