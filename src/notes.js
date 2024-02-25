// Notes from C3 to C5
const notesOrdered = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

class NoteGenerator {
    constructor(nbOctave, complexity, startHigh, clef) {
        this.nbOctave = nbOctave;
        this.complexity = complexity;
        this.startHigh = startHigh;
        this.clef = clef;
    }

    createNote() {
        return Math.floor((Math.random() * 1000) % (this.nbOctave * 7 + 1));
    }

    convertNote(value) {
        const high = Math.floor(value / 7);
        const note = notesOrdered[value % 7];
        return `${note}/${high + this.startHigh}`
    }

    getNoteFromPrevious(value) {
        const shift = Math.floor((Math.random() * 1000) % (this.complexity * 2));
        const note = value + shift - this.complexity;
        if (note > this.nbOctave * 7 + 1 || note < 0) {
            return this.getNoteFromPrevious(value);
        }
        return note;
    }

    getNotes(length) {
        const notes = [];
        let firstValueNote = this.createNote();
        for (let i = 0; i < length; i++) {
            const note = this.convertNote(firstValueNote);
            notes.push(note)
            firstValueNote = this.getNoteFromPrevious(firstValueNote);
        }
        return notes;
    }

}

export {
    NoteGenerator,
}