const iurl = 'https://raw.githubusercontent.com/vtucs/Index_v3/master/index.json';

let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let response = this.responseText;
        let root = JSON.parse(response);
        let laboratoriesDiv = document.getElementById('laboratories-div');
        for (let i = 0; i < root.laboratories.length; i++) {
            let eachLabDiv = document.createElement('div');
            eachLabDiv.classList.add("tile-div");
            let lab = root.laboratories[i];
            let name = document.createTextNode(lab.name);
            eachLabDiv.appendChild(name);
            eachLabDiv.addEventListener('click', function () {
                laboratoryClickHandler(lab.url);
            });
            laboratoriesDiv.appendChild(eachLabDiv);
        }
    }
};
xmlhttp.open("GET", iurl, true);
xmlhttp.send();

function laboratoryClickHandler(lurl) {
    let laboratoryXmlHttp = new XMLHttpRequest();
    laboratoryXmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = this.responseText;
            let root = JSON.parse(response);
            let codeDiv = document.getElementById('experiments-div');
            for (let i = 0; i < root.labExperiments.length; i++) {
                let programDiv = document.createElement('div');
                programDiv.setAttribute('class', 'program-div');
                // programDiv.style.margin = '20px';
                // programDiv.style.color = 'white';
                // programDiv.style.backgroundColor = 'black';
                // programDiv.style.borderRadius = '2px';
                // programDiv.style.padding = '0.5em';
                programDiv.classList.add("tile-div");

                let prog = root.labExperiments[i];
                for (let j = 0; j < prog.labExperimentSubParts.length; j++) {
                    let subPartDiv = document.createElement('div');
                    let sub = prog.labExperimentSubParts[j];
                    for (let k = 0; k < sub.contentFiles.length; k++) {
                        let fileDiv = document.createElement('div');
                        let f = sub.contentFiles[k];
                        let programTextNode = document.createTextNode(f.title);
                        fileDiv.appendChild(programTextNode);
                        fileDiv.addEventListener('click', function () {
                            experimentClickHandler(f.url)
                        });
                        subPartDiv.appendChild(fileDiv);

                    }
                    programDiv.appendChild(subPartDiv);
                }
                codeDiv.appendChild(programDiv);
            }
            codeDiv.style.display = 'block';
            document.getElementById('laboratories-div').style.display = 'none';
        }
    };
    laboratoryXmlHttp.open('GET', lurl, true);
    laboratoryXmlHttp.send();
}

function experimentClickHandler(eurl) {
    let experimentXmlHttp = new XMLHttpRequest();
    experimentXmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let res = this.responseText;
            let fetchedPre = document.getElementById('fetched-file-pre');
            fetchedPre.innerText = res;
            fetchedPre.style.display = 'block';
            document.getElementById('experiments-div').style.display = 'none';

        }
    };
    experimentXmlHttp.open('GET', eurl, true);
    experimentXmlHttp.send();
}

// function styleDivAsList(div) {
//     div.style.margin = '20px';
//     div.style.color = 'white';
//     div.style.backgroundColor = '#305D70';
//     div.style.borderRadius = '2px';
//     div.style.padding = '0.5em';
//     // div.classList.add("temp");
// }
