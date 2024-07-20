import { TextPage } from "./TextPage.js";

let initStr = '<Action do={() => code.update`\n'
let endStr = '\n`}/>\n' 
let replaceThing = `/////end///////`

export class PresentationBroker{
    
    presentation

    constructor(presentation){
        this.presentation = presentation
    }

    importSTRtoPresentation(text){
        

        let str = text.replaceAll(initStr,"")
        console.log(str)
        str = str.replaceAll(endStr,replaceThing)
        let strs = str.split(replaceThing)
        let pages = []
        
        for (let index = 0; index < strs.length; index++) {
            const element = strs[index];
            pages.push(new TextPage(element))
        }

        return pages;
    }

    exportPresentationToString(){
        let str = "";

        let pages = this.presentation.getPages()
        for (let index = 0; index < pages.length; index++) {
            const element = pages[index];
            str += initStr+element.gettext()+endStr;
        }

        return str;
    }

}