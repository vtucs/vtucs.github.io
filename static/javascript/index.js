const iurl = 'https://raw.githubusercontent.com/vtucs/Index_v3/master/Index_v3.json';

let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let response = this.responseText;
        let root = JSON.parse(response);
        let laboratoriesDiv = document.getElementById('laboratories-div');
        for (let i = 0; i < root.laboratories.length; i++) {
            let eachLabDiv = document.createElement('div');
            let lab = root.laboratories[i];
            let fileName = lab.fileName;
            let name = fileName.split(".")[0].replace(/_/g, " ");
            let nameTextNode = document.createTextNode(name);
            eachLabDiv.appendChild(nameTextNode);
            eachLabDiv.addEventListener('click', function () {
                laboratoryClickHandler("laboratory.html?lab=" + fileName);
            });
            laboratoriesDiv.appendChild(eachLabDiv);
        }
    }
};
xmlhttp.open("GET", iurl, true);
xmlhttp.send();

function laboratoryClickHandler(lurl) {
    window.location.href = lurl;
}
