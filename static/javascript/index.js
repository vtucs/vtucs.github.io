const iurl = 'https://raw.githubusercontent.com/vtucs/Index_v3/master/Index_v3.json';

let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let response = this.responseText;
        let root = JSON.parse(response);
        storeUrl("index", root);
        renderLaboratories(root.laboratories);
    }
};
xmlhttp.open("GET", iurl, true);
xmlhttp.send();

function renderLaboratories(laboratories) {
    let laboratoriesDiv = document.getElementById('laboratories-div');
    for (let i = 0; i < laboratories.length; i++) {
        let eachLabDiv = document.createElement('div');
        formatListItem(eachLabDiv);
        let lab = laboratories[i];
        let fileName = lab.fileName;
        let name = formatLabName(fileName);
        let nameTextNode = document.createTextNode(name);
        eachLabDiv.appendChild(nameTextNode);
        eachLabDiv.addEventListener('click', function () {
            itemClickHandler("laboratory.html?lab=" + fileName);
        });
        laboratoriesDiv.appendChild(eachLabDiv);
    }
}

function formatLabName(fileName) {
    return fileName.split(".")[0].replace(/_/g, " ");
}
