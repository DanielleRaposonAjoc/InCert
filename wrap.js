const { identityMatrix } = require("pdf-lib/cjs/types/matrix");

function splitStringByNumChar(text, numChar) {
    var arr = [];

    for (var i = 0; i < text.length; i += numChar) {
        arr.push(text.substring(i, i + numChar));
    }

    return arr;
}

module.exports=function splitStringByWord(text, numChar) {
    var lines =[];
    var index =0;
    var length=text.length;
    var counter=0;

    while(index<length){
        console.log("index is: "+index);
        var wrappedText=wrapOneLine(text.substring(index),numChar);
        //wrappedText=wrappedText.trim();
        console.log("wrapepdText length: "+wrappedText.length);
        if(wrappedText.charAt(wrappedText.length-1)=="-"){
            index+=((wrappedText.length)-1);
        }
        else if(wrappedText.charAt(wrappedText.length-1)==" "){
            index+=((wrappedText.length));
        }
        else{
            index+=(wrappedText.length)+1;
        }

        lines.push(wrappedText);
        console.log("==================");

    }


    return lines;

}

function wrapOneLine(text, numChar){
    text=text.trim();
    if(text.length<numChar){
        console.log('less than count');
        return text;   
    }
    var index = text.charAt(numChar-1);
    if (index==" "){
        console.log('just right');
        return text.substring(0,numChar);
        
    }
    var spacesFront=getNextWhiteSpace(text, numChar)-numChar+1;
    var spacesBack=numChar-getLastWhiteSpace(text, numChar)-2;
    console.log("at cutter, char found is: "+ index);
    console.log('spaces front: '+spacesFront);
    console.log('spaces back: '+spacesBack);
    if(spacesFront>=2 && spacesBack>=2){
        console.log('using the hyphen');
        return text.substring(0,numChar-1)+"-";
        
    }

    //console.log('just using the last words');
    if(getLastWhiteSpace(text,numChar)==-1){
        return text.substring(0);
    }
    else{
        return text.substring(0,getLastWhiteSpace(text,numChar));
    }
    
}

function getLastWhiteSpace(text, index){
    //console.log('last whitespace is at: '+ text.lastIndexOf(" ", index));
    return text.lastIndexOf(" ", index);
}

function getNextWhiteSpace(text, index){
    //console.log('next whitespace is at: '+ text.indexOf(" ", index));
    return text.indexOf(" ", index);
}

function checkStringLength(arr){
    var lengths=[];
    arr.forEach(function(a){
        lengths.push(a.length);
    })
    return lengths;
}

function testSplitStringByNumChar(){
    var numChar=3;
    var text = "Quisque eget lectus lorem. Pellentesque id vestibulum est, et fermentum diam. Proin eleifend eleifend lectus, in mollis massa auctor sit amet.";
    var splitText=splitStringByNumChar(text,numChar);
    console.log(splitText);
    console.log(checkStringLength(splitText));
}


