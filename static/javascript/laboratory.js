var urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("lab")) {
    var lurl = localStorage.getItem("index");
    if (lurl === null) {
        redirectToHomepage();
    } else {
        let labName = urlParams.get("lab");
        lurl = lurl + "/" + labName;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = this.responseText;
                let root = JSON.parse(response);
                storeUrl(labName, root);
                renderLabExperiments(root.labExperiments);
            }
        };
        xmlhttp.open("GET", lurl, true);
        xmlhttp.send();
    }
} else {
    redirectToHomepage();
}

function renderLabExperiments(labExperiments) {
    let programsDiv = document.getElementById("programs-div");
    for (let i = 0; i < labExperiments.length; i++) {
        let experimentDiv = document.createElement("div");
        renderExperiment(experimentDiv, labExperiments[i]);
        programsDiv.appendChild(experimentDiv);
    }
}

function renderExperiment(experimentDiv, laboratory) {
    let labExperimentSubParts = laboratory.labExperimentSubParts;
    for (let i = 0; i < labExperimentSubParts.length; i++) {
        let subPartDiv = document.createElement("div");
        renderSubPart(subPartDiv, labExperimentSubParts[i]);
        experimentDiv.appendChild(subPartDiv);
    }
}

function renderSubPart(subPartDiv, labExperimentSubPart) {
    let contentFiles = labExperimentSubPart.contentFiles;
    for (let i = 0; i < contentFiles.length; i++) {
        let contentFileDiv = document.createElement("div");
        renderContentFile(contentFileDiv, contentFiles[i]);
        subPartDiv.appendChild(contentFileDiv);
    }
}

function renderContentFile(contentFileDiv, contentFile) {
    let name = formatFileName(contentFile.fileName);
    let nameTextNode = document.createTextNode(name);
    contentFileDiv.appendChild(nameTextNode);
    contentFileDiv.addEventListener("click", function () {
        console.log("Click Detected");
    });
}

function formatFileName(fileName) {
    let parts = fileName.split(".");
    if (parts.length > 2) {
        return parts[parts.length - 2].replace(/_/g, " ");
    }
}
