var urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("lab") && urlParams.has("prog")) {
    let labName = urlParams.get("lab");
    var purl = localStorage.getItem(labName);
    if (purl === null) {
        redirectToHomepage();
    } else {
        let progName = urlParams.get("prog");
        purl = purl + "/" + progName;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = this.responseText;
                renderProgram(response);
            }
        };
        xmlhttp.open("GET", purl, true);
        xmlhttp.send();
    }
} else {
    redirectToHomepage();
}

function renderProgram(content) {
    let contentCode = document.getElementById("content-code");
    contentCode.innerText = String(content);
}