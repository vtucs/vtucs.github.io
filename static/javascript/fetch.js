const url = 'https://gist.githubusercontent.com/ShivamNagpal/d7c37c7e2c87914663dec6df12d57aff/raw/e349b124cfbdd57ea39fdb1ee3680912661e6f8d/Sample%2520Response';

let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let response = this.responseText;
        let root = JSON.parse(response);
        for (let i=0;i< root.programs.length;i++) {
            let prog = root.programs[i];
            for (let j=0; j<prog.subParts.length; j++) {
                let sub = prog.subParts[j];
                for (let k=0; k<sub.files.length; k++) {
                    let f = sub.files[k];

                }
            }
        }
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
