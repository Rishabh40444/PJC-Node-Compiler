
// Code for the editor window

// Selecting elements by their ID from the index.ejs
const editor_lang = document.querySelector("#langName");
const editor_theme = document.querySelector("#themeName");
const fonts = documnent.querySelector("#editor-fonts");
const saveBtn = document.querySelector("#save-changes");
const runBtn = document.querySelector("#runcode");

// selecting  terminals

const output_window = document.querySelector("#output-terminal");
const input_window = document.querySelector("#input-terminal");

// Code for the editor Window

window.editorx = CodeMirror.fromTextArea(document.querySelector("#editor"),
{
    mode:"text/x-python",
    lineNumbers: true,
    styleActiveLine: true,
    theme : "duotone-light",
    autoCloseBrackets: true,
    autoCloseTags: true,
})

// popup display settings

function popupOnOff(id, bool = false){
    let popup = document.getElementById(id);

    if(window.getComputedStyle(popup).display == "block"){
        if(bool){
            popup.style.display = "block";
        }
        else{
            popup.style.display = "none";

        }

    }else{
        popup.style.display = "block";

    }
}


// font size settings

function editorFontSize(size){
    const cmElement = document.querySelector(".CodeMirror");
    cmElement.style.fonts = size + 'rem';
    editorx.refresh()

}
editorFontSize(1.6)

saveBtn.addEventListener('click',()=>{
    popupOnOff("popup-settings")
    switch(editor_lang.value){
        case "python":
            editorx.setOption("mode","text/x-python")
            break;
        case "c_cpp":
            editorx.setOption("mode","text/x-c++src")
            break;
        default:
            console.log("selection failure : code type");
            break;
    }

    
    switch (theme.value) {
        case "dracula":
            editorx.setOption("theme", "dracula")
            break;
        case "eclipse":
            editorx.setOption("theme", "eclipse")
            break;
        case "rubyblue":
            editorx.setOption("theme", "rubyblue")
            break;
        case "duotone-light":
            editorx.setOption("theme", "duotone-light")
            break;
        case "twilight":
            editorx.setOption("theme","twilight")
            break;
        default:
            console.log("selection falure : theme {set to default dracula}");
            editorx.setOption("theme", "dracula")
            break;
    }

    
    switch (fonts.value) {
        case "d":
            changeFontSize(1.6)
            break
        case "s":
            changeFontSize(1)
            break;
        case "m":
            changeFontSize(1.4)
            break;
        case "l":
            changeFontSize(2.0)
            break;
        default:
            console.log("selection falure : theme {set to default dracula}");
            editorx.setOption("theme", "dracula")
            break;
    }


})

runBtn.addEventListener("click",async function(){
    codeXdata = {
        code:editorx.getValue(),
        input:input_window.value,
        langmode: editor_lang.value
    }

    let from_api = await fetch("/compile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(codeXdata)

    })

    let data = await from_api.json()


    if (data.output) {

        output_window.value = data.output
        
    }
    else {
        output_window.value = data.error
    }
    
    
    popup_onoff('popup-terminals',true)



    
})

