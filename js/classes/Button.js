export class Button{

    container

    constructor(container){
        this.container = container
    }

    show(){
        this.container.style.display = "block";
    }

    hide(){
        this.container.style.display = "none";
    }

    getContainer(){
        return this.container
    }
}