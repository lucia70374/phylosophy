//'Wikipedia:Getting_to_Philosophy'
let currentTitle = 'Art';
let counter = 0;
const elemDivText = document.createElement('div');
const elemDivCounter = document.createElement('div');
const elemDivTitle = document.createElement('div');



function startGame(){
    websiteHTML(currentTitle);
}
startGame();
function websiteHTML(title){
    console.log(title)
    const WIKI_URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`

    fetch(WIKI_URL)
        .then((response) => response.json())
        .then((response) => {
             const key = Object.keys(response.parse.text)[0];
            
            counter++;
            parseHTML(response.parse.text[key]);
           
        });
}


function parseHTML(html){
    const dummyDOM = document.createElement('html');
    let linksArray;

    dummyDOM.innerHTML = html;
    linksArray = dummyDOM.getElementsByTagName('a');
    

    for(const link of linksArray){

        if(checkLinkConditions(link) && link.title !== 'Philosophy'){
            currentTitle = link.title;
            elemDivText.innerHTML = 'Still Looking';
            elemDivTitle.innerHTML = link.title;
            elemDivCounter.innerHTML = counter;
            break;
        }else if(link.title === 'Philosophy'){
            elemDivText.innerHTML = 'Found it'
            elemDivCounter.innerHTML = counter;
            break;
        }
    }

    if(counter < 14){

        websiteHTML(currentTitle);
    }

    document.body.appendChild(elemDivText);
    document.body.appendChild(elemDivTitle);
    document.body.appendChild(elemDivCounter);
    // document.body.appendChild(dummyDOM);
   
}

function checkLinkConditions(link){
    let returnValue = true;

    if(
        link.className.includes('external')
        || link.parentElement.tagName === 'TH'
        || link.parentElement.tagName === 'TR'
        || link.parentElement.tagName === 'TD'
        || link.parentElement.tagName === 'LI'
        || link.parentElement.tagName === 'DIV'
        || link.parentElement.tagName === 'SPAN'
        || link.parentElement.tagName === 'SMALL'
        || link.parentElement.tagName === 'I'
        || link.parentElement.tagName === 'B'
        || link.title === currentTitle
        || link.href.includes('#')
        || link.className.includes('mw-redirect')
        || link.parentElement.className.includes('module-shortcutboxplain')
        || link.parentElement.className.includes('thumbcaption')
        || link.parentElement.className.includes('sidebar-title-with-pretitle')
        || link.parentElement.className.includes('box-Lead_too_short plainlinks metadata ambox ambox-content ambox-lead_too_short')
        || link.href.includes('File:')
        || link.parentElement.className.includes('hatnote')
        || link.className.includes('new')
        || link.parentElement.className.includes('reference')
        //|| link.nextElementSibling.className.includes('reference')

    ){
        returnValue = false;
    }else{
        console.log('fail');
    }

    return returnValue;
}