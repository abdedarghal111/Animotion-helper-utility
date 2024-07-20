import {print} from "./Console.js";

export class FileParser {
    
    input
    file
    fileContent
    confirmButton

    constructor(inp){
        this.input = inp
    }

    validNewFile(){
        this.file = this.input.files[0]
        
        if (this.file && this.file.name && this.file.name.endsWith(".txt")) {
            return true;
        }else{
            return false;
        }
    }

    getFileName(){
        if(this.file){
            return this.file.name;
        }else{
            return "";
        }
    }

    readFile(){
        let reader = new FileReader();
        reader.readAsText(this.file, "UTF-8");

        let but = this.confirmButton

        let _this = this
        reader.onload = function (evt) {
            _this.fileContent = evt.target.result;
            print("File readed.")
            but.show();
        }

        reader.onerror = function (evt) {
            print("Error reading file.")
        }
    }

    setconfirmButton(but){
        this.confirmButton = but
    }

    getFileText(){
        return this.fileContent;
    }
}