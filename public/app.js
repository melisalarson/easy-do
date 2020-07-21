function findElement(query, isMulti = false) {
    return (!isMulti) ?
            document.querySelector(query) :
            document.querySelectorAll(query);
}

//Universal Click Mask To Close

if(findElement('.prompt-mask') !== null) {
    findElement('.prompt-mask').addEventListener('click', (e) => {
        if (e.target !== findElement('.prompt-mask')) return;
        findElement('.prompt-mask').classList.remove('show');   
    })
}

if(findElement('.alert-mask') !== null) {
    findElement('.alert-mask').addEventListener('click', (e) => {
        if (e.target !== findElement('.alert-mask')) return;
        findElement('.alert-mask').classList.remove('show');   
    })
}


//Delete Prompt
if(findElement('.delete-collab-btn') !== null) {
    findElement('.delete-collab-btn').addEventListener('click', () =>{
        findElement('.prompt-mask').classList.add('show');   
    })
}
if(findElement('.delete-btn') !== null) {
    console.log("test");
    findElement('.delete-btn').addEventListener('click', () =>{
        findElement('.prompt-mask').classList.add('show');   
    })
}
if(findElement('.prompt-cancel-btn') !== null) {
    findElement('.prompt-cancel-btn').addEventListener('click', (e) => {
        findElement('.prompt-mask').classList.remove('show');   
    })
}


//Cannot Edit Not Assigned Prompt
if(findElement('.index-cancel-btn') !== null) {
    findElement('.index-cancel-btn').addEventListener('click', (e) => {
        findElement('.alert-mask').classList.remove('show');   
    })
}
if(findElement('#not-assigned') !== null) {
    findElement('#not-assigned').addEventListener('click', () =>{
        findElement('.alert-mask').classList.add('show');   
    })
}



// Add/Remove Doc Mask
if(findElement('#doc-btn') !== null) {
    findElement('#doc-btn').addEventListener('click', () =>{
        findElement('.mask').classList.add('show');   
    })
}

if(findElement('.doc-mask') !== null) {
    findElement('.doc-mask').addEventListener('click', (e) => {
        if (e.target !== findElement('.doc-mask')) return;
        findElement('.doc-mask').classList.remove('show');   
    })
}
