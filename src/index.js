const {
    Renderer,
    Stave,
    StaveNote,
    Voice,
    Formatter
} = Vex.Flow;

import {NoteGenerator} from "./notes.js";

let generator;

function createMeasures(length) {
    const measures = [];
    const notes = generator.getNotes(4 * length);
    for (let i = 0; i < length; i++) {
        measures.push(notes.slice(i*4,(i+1)*4))
    }
    return measures;
}

const measureWidth = 250;
const measureHeight = 130;

function run() {

    const div = document.getElementById('output');
    div.innerHTML = "";
    /*if(div.style.getPropertyValue("display") === "none"){
        return;
    }*/
    if(generator == null){
        return;
    }
    const maxWidth = div.offsetWidth;
    const height = window.innerHeight -20;
    const measureByLine = Math.floor(maxWidth / measureWidth);
    const maxLine = Math.floor(height / 130);
    const maxMeasure = maxLine * measureByLine;
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(measureByLine * measureWidth + 20, height);
    const context = renderer.getContext();

    const measures = createMeasures(maxMeasure);
    for (let i in measures) {
        const notes = [];
        for (let j = 0; j < measures[i].length; j++) {
            notes.push(new StaveNote({
                keys: [measures[i][j]],
                duration: '4',
                clef:generator.clef
            }));
        }
        const line = Math.floor(i/measureByLine);
        const column = i%measureByLine;
        const stave = new Stave(10 + measureWidth * column, line*measureHeight + 10, measureWidth);
        if (column === 0) {
            stave.addClef(generator.clef)
        }
        stave.setContext(context).draw();
        Formatter.FormatAndDraw(context, stave, notes);
    }
}

function initOptions(){
    document.querySelector('.reload-button').onclick = () => run();
    const form = document.getElementById('options').querySelector('form');
    form.querySelector('input[type="submit"]').onclick = () => {
        console.log("Clef",)
        generator = new NoteGenerator(
            parseInt(form.querySelector('#nbOctaves').value),
            parseInt(form.querySelector('#complexity').value),
            parseInt(form.querySelector('#startHigh').value),
            form.querySelector('#clef').value);
        document.getElementById('options').style.setProperty("display","none");
        document.getElementById('output').style.setProperty("display","");
        run();
        return false;
    }
}

initOptions();

export {}