export class InternConsole {
    
    consoleCont = document.getElementById("consoleCont")
    
    constructor(){
        this.print("Console started.")
    }

    print(text){
        let textContainer = document.createElement("label")

        this.consoleCont.appendChild(textContainer)

        textContainer.innerText = "> " + text
    }
}

let console = new InternConsole();

export default console;

export function print(text){
    console.print(text);
}