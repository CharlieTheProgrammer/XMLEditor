"use strict"

// A function from an event listener cannot return a value
// Thereofre, I must create a global var for the function
// to update. 
var mismo

// Add event listener to input so we can start the file reader accordingly
var fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", readFile);

function readFile(event) {
    // An input returns a FileList object. We need to get the first file.
    // The FileList object is simply the filename/path, not the actual file
    var file = event.target.files[0]

    if (file) {                             // Check file exist
        const reader = new FileReader();    // Start up FileReader instance
        reader.onload = function () {       // onload creates a callback
            var text = reader.result;       // stores string into text
            alert(text.substring(0, 90))    // outputs part of result as alert
            var parsedText = parseXml(text) // takes the text and parses it into dom.
            // xml2json needs a dom object, feeding it text will not work
            // xml2json outputs json as a string.
            var mismoStr = xml2json(parsedText, "\t")
            mismo = JSON.parse(mismoStr)  // Parse json string to json object
        }

        reader.readAsText(file)     // Starts reading the file. Once done, it
                                    // will trigger the onload function.
                                    // ie, onload means file was read successfully
    } else {
        alert("Failed to load file.")
    }
}


function parseXml(xml) {
/* Takes xml string and parses it into a DOM object */    
    var dom = null;
    if (window.DOMParser) {         // Checks if browser supports DOMParser
       try {
           // Parses XML string to DOM
          dom = (new DOMParser()).parseFromString(xml, "text/xml");
       }
       catch (e) { dom = null; }    // If any error occurs, we "erase" the attempt
    }
    else if (window.ActiveXObject) {    // Checks browser support for ActiveX
       try {
          dom = new ActiveXObject('Microsoft.XMLDOM');
          dom.async = false;
          if (!dom.loadXML(xml)) // parse error ..

             window.alert(dom.parseError.reason + dom.parseError.srcText);
       }
       catch (e) { dom = null; }
    }
    else
       alert("cannot parse xml string!");
    return dom;
 }

