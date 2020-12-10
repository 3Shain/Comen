


function now(){

}

function TypeChecker(){

}

function GeneralBlock(){

}


const context = {
    now
}

interface ComenFont {
    family: string;
    size: number;
    style: 'italic'|'';
    weight: number;
    decoration: 'underline'|'deleted';

}

interface ComenBlockStyle {

    margin: [number,number,number,number];
    font: ComenFont;
    padding;
    border;
    // takedown; borderTop borderBottom
    background; //img/color
}

interface ComenTextProps {
    content: string;
}

// Runtime check (when debug)!
