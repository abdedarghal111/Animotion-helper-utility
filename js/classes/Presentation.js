import { TextPage } from "./TextPage.js";
import { print } from "./Console.js";

class Presentation {
    
    textBox
    pageIndicator
    pages = []
    currentPage = 0
    
    constructor(textBox, pageIndicator){
        this.textBox = textBox
        this.pageIndicator = pageIndicator
        this.pages = [new TextPage("Presentación iniciada.")]

        let _this = this
        this.textBox.oninput = function(){
            _this.getCurrentPage().settext(_this.textBox.value)
        }

        this.updateDisplay()
    }

    setPage(page){
        this.textBox.value = this.pages[page].gettext()
    }

    getCurrentPage(){
        return this.pages[this.currentPage]
    }

    setCurrentPageNumber(pageNumber){
        this.currentPage = pageNumber
    }

    setPages(pages){
        this.pages = pages
    }

    getPages(){
        return this.pages;
    }
    
    updateDisplay(){
        let currentPg = this.currentPage+1
        let currentLgth = this.pages.length
        
        this.setPage(this.currentPage)
        this.pageIndicator.innerText = currentPg+"/"+currentLgth
    }

    cloneCurrentPage(){
        return this.getCurrentPage().clone()
    }

    duplicateCurrentPage(){
        let targetPage = this.currentPage
        let oldArr = this.pages
        let newArr = []

        for (let index = 0; index < targetPage; index++) {
            const element = oldArr[index];
            newArr.push(element)
        }
        newArr.push(this.cloneCurrentPage())
        newArr.push(this.getCurrentPage())
        for (let index = targetPage+1; index < oldArr.length; index++) {
            const element = oldArr[index];
            newArr.push(element)
        }

        this.pages = newArr
    }

    duplicateLeft(){
        this.duplicateCurrentPage()

        this.updateDisplay()
    }

    duplicateRight(){
        this.duplicateCurrentPage()
        this.currentPage = this.currentPage + 1

        this.updateDisplay()
    }

    navigateLeft(){
        if(this.currentPage != 0){
            this.currentPage -= 1
        }else{
            print("Current in the start page.")
        }

        this.updateDisplay()
    }

    navigateRight(){
        if(this.currentPage != this.pages.length -1){
            this.currentPage += 1
        }else{
            print("Current in the final page.")
        }

        this.updateDisplay()
    }

    eliminateCurrentPage(){
        if(this.pages.length == 1){
            print("Add other to delete this.")
            return;
        }
        let targetPage = this.currentPage
        let oldArr = this.pages
        let newArr = []

        for (let index = 0; index < targetPage; index++) {
            const element = oldArr[index];
            newArr.push(element)
        }
        for (let index = targetPage+1; index < oldArr.length; index++) {
            const element = oldArr[index];
            newArr.push(element)
        }

        this.pages = newArr

        if(this.currentPage != 0){
            this.currentPage -= 1
        }

        this.updateDisplay()
    }
}

let presentation = new Presentation(
    document.getElementById("MainTextarea"),
    document.getElementById("infoNavigation")
);

document.getElementById("leftDuplicate").onclick = function(){
    presentation.duplicateLeft();
}

document.getElementById("leftNavigation").onclick = function(){
    presentation.navigateLeft();
}

document.getElementById("rightNavigation").onclick = function(){
    presentation.navigateRight();
}

document.getElementById("rightDuplicate").onclick = function(){
    presentation.duplicateRight();
}

document.getElementById("eliminateOption").onclick = function(){
    presentation.eliminateCurrentPage();
}

export { presentation };