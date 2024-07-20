import { FileParser } from "./classes/FileParser.js";
import { Button } from "./classes/Button.js";
import { print } from "./classes/Console.js";
import { PresentationBroker } from "./classes/PresentationBroker.js";
import { presentation } from "./classes/Presentation.js";

document.addEventListener('DOMContentLoaded', () => {
    let fileInput = document.getElementById("fileInput");

    let fileParser = new FileParser(fileInput);
    let comfirmFileBut = new Button(document.getElementById("comfirmFileContainer"));
    let broker = new PresentationBroker(presentation)
    fileParser.setconfirmButton(comfirmFileBut);

    fileInput.onchange = function() {
        if(fileParser.validNewFile()){
            print("Fichero " + fileParser.getFileName() + " validado.")
            fileParser.readFile();
        }else{
            print("Fichero " + fileParser.getFileName() + " inválido.")
        }
    }

    document.getElementById("fileInputContainer").onclick = function(){
        fileInput.click();
    }

    comfirmFileBut.getContainer().onclick = function(){
        comfirmFileBut.hide()
        presentation.setPages(broker.importSTRtoPresentation(fileParser.getFileText()))
        presentation.setCurrentPageNumber(0)
        presentation.updateDisplay()
        print("Replaced succesfully.")
    }

    document.getElementById("exportOption").onclick = function(){
        /*
        let w = window.open();
        let doc = w.document;
        doc.write(broker.exportPresentationToString());
        doc.close();
        */

        let text = broker.exportPresentationToString();
        let blob = new Blob([text], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'archivo.txt';
        document.body.appendChild(a);
        a.click();
        window.open(url, '_blank');
        document.body.removeChild(a);
    }
});