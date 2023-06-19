import React, {useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState('Enter the text here...');

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

    const handleStopRead = () =>{
        // Create an instance of SpeechSynthesisUtterance
        let utterance = new SpeechSynthesisUtterance();

        // Call the speech synthesis function
        speechSynthesis.speak(utterance);

        // To stop the speech
        speechSynthesis.cancel();
    }

    const handleCopy = () => {
        let text = document.getElementById('myBox');
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
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

    function printText(targetId) {
        var targetElement = document.getElementById(targetId);
      
        if (targetElement) {
          var printWindow = window.open('', '_blank');
          printWindow.document.open();
          printWindow.document.write('<html><head><title>Print</title></head><body>');
          printWindow.document.write(targetElement.innerHTML);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.print();
          printWindow.close();
        } else {
          console.log('Target element not found.');
        }
      }

      const handlePrint = () =>{
        printText('myText');
      }
  return (
    <>
    <div className="mb-3" style={{backgroundColor: props.mode==='light'?'#0c0027':'white'}}>
    <label htmlFor="exampleFormControlTextarea1" className="form-label"><h2>{props.heading}</h2></label>
    <textarea style={{backgroundColor: props.mode==='light'?'#1e0e42':'white', color: props.mode==='dark'?'black':'white'}} className="form-control" id="myBox" rows="8" value={text} onChange={handleOnChange}></textarea>
    </div>
    <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to UpperCase</button>
    <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to LowerCase</button>
    <button disabled={text.length===0} className="btn btn-danger mx-1 my-1" onClick={handleTextClear}>Clear</button>
    <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleReadText}>Read</button>
    <button disabled={text.length===0} className="btn btn-danger mx-1 my-1" onClick={handleStopRead}>Stop</button>
    <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy</button>
    <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
    <div className="container" style={{backgroundColor: props.mode==='light'?'#0c0027':'white'}}>
        <h2 className='my-3'>Your Text Summary</h2>
        <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words, {text.length} characters</p>
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes to Read</p>
        <h2>Preview</h2>
        <div id='myText'>
            <p>{text.length<=0?'Nothing to preview!':text}</p>
        </div>
        <button disabled={text.length===0} className="btn btn-primary" onClick={handlePrint}>Print</button>
    </div>
    </>
  )
}
