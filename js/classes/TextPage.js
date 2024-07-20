export class TextPage {
    text = "";
    constructor(text){
        this.text = text;
    }

    gettext() {
        return this.text;
    }

    settext(text) {
        this.text = text;
    }

    clone() {
        return new TextPage(this.text)
    }
}