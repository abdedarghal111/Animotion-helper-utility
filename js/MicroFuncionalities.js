document.addEventListener('DOMContentLoaded', () => {
    let textarea = document.getElementById('MainTextarea');
    addTextIndention(textarea)
    
});

function addTextIndention(textarea){
    // Insert tab character
    const insertTabCharacter = () => {
        const { value, selectionStart, selectionEnd } = textarea;

        // Insert tab character
        textarea.value = `${value.substring(0, selectionEnd)}\t${value.substring(selectionEnd)}`;

        // Move cursor to new position
        textarea.selectionStart = textarea.selectionEnd = selectionEnd + 1;
    };

    // Add indentation to each line of selected text
    const addIndentation = () => {
        const { value, selectionStart, selectionEnd } = textarea;

        const linesBeforeCaret = value.substring(0, selectionStart).split('\n');
        const startLine = linesBeforeCaret.length - 1;
        const endLine = value.substring(0, selectionEnd).split('\n').length - 1;

        const newValue = value
            .split('\n')
            .map((line, i) => (i >= startLine && i <= endLine) ? `\t${line}` : line)
            .join('\n');

        textarea.value = newValue;

        const startLineText = linesBeforeCaret[startLine];
        textarea.selectionStart = startLineText && /\S/.test(startLineText)
                                ? selectionStart + 1
                                : selectionStart;
        textarea.selectionEnd = selectionEnd + (endLine - startLine + 1);
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd } = textarea;
            (selectionStart === selectionEnd)
                ? insertTabCharacter()
                : addIndentation();
        }
    });
}