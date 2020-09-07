module.exports=class Page{
    constructor(p){
        this.contentBoxList=[];
        this.page=p;
        
    }
    addContentBox(contentBox){
        this.contentBoxList.push(contentBox);
    }
    drawAllContentBoxes(){
        this.contentBoxList.forEach(contentBox=>{
            contentBox.drawContentBox(this.page);
        });
    }
    drawAllBoxMargins(){
        this.contentBoxList.forEach(contentBox=>{
            contentBox.drawBoxMargins(this.page);
        });
    }
    getWidth(){
        return this.page.getSize().width;
    }
    getHeight(){
        return this.page.getSize().height;
    }
    getNumContentBoxes(){
        return this.contentBoxList.length;
    }
}

