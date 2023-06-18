import React, {useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState('Enter the text here');

    const handleUpClick = () =>{
        let newText = text.toUpperCase();
        setText(newText);
        props.alert('Converted to Upper Case', 'success');
    }

    const handleLoClick = () =>{
        let newText = text.toLowerCase();
        setText(newText);
        props.alert('Converted to Lower Case', 'success');
    }

    const handleTextClear = () =>{
        let newText = '';
        setText(newText);
        props.alert('Text Cleared', 'success')
    }

    const handleReadText = () =>{
         // Check if the browser supports speech synthesis
        if ('speechSynthesis' in window) {
            // Create a new SpeechSynthesisUtterance instance
            const speechSynthesisUtterance = new SpeechSynthesisUtterance();

            // Set the text to be spoken
            speechSynthesisUtterance.text = text;

            // Use the default voice
            speechSynthesisUtterance.voice = speechSynthesis.getVoices()[0];

            // Speak the text
            speechSynthesis.speak(speechSynthesisUtterance);
        } else {
            console.log('Speech synthesis is not supported.');
        }

        props.alert('Speaking...', 'success');
    }

    const handleCopy = () => {
        let text = document.getElementById('myBox');
        text.select();
        navigator.clipboard.writeText(text.value);
        props.alert('Text Copied', 'success');
    }

    const handleExtraSpaces = () =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.alert('Extra spaces has been removed', 'success');
    }

    const handleOnChange = (event) =>{
        setText(event.target.value);
    }
  return (
    <>
    <div className="mb-3" style={{backgroundColor: props.mode==='light'?'#0c0027':'white'}}>
    <label htmlFor="exampleFormControlTextarea1" className="form-label"><h2>{props.heading}</h2></label>
    <textarea style={{backgroundColor: props.mode==='light'?'grey':'white', color: props.mode==='dark'?'black':'white'}} className="form-control" id="myBox" rows="8" value={text} onChange={handleOnChange}></textarea>
    </div>
    <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to UpperCase</button>
    <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to LowerCase</button>
    <button className="btn btn-primary mx-1" onClick={handleTextClear}>Clear</button>
    <button className="btn btn-primary mx-1" onClick={handleReadText}>Read</button>
    <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy</button>
    <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
    <div className="container" style={{backgroundColor: props.mode==='light'?'#0c0027':'white'}}>
        <h2 className='my-3'>Your Text Summary</h2>
        <p>{text.split(" ").length} words, {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} Minutes to Read</p>
        <h2>Preview</h2>
        <p>{text.length<=0?'Enter any text into above box to preview here':text}</p>
    </div>
    </>
  )
}
