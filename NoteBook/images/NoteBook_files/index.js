const LOCAL_STORAGE_KEY = 'headingData';
let headingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
const AsideCategories = document.querySelector('.categories');
const catInput = document.getElementById('createNoteBook');
const asideHeading = document.querySelector('.create-cat');
const noteContainer = document.querySelector('note-container');
const hdh2 = document.querySelector('.create-cat h2');
const iBtn = document.getElementById('plusBtn');

function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(headingData));
}

function initializeUI() {
    AsideCategories.innerHTML = '';
    Object.keys(headingData).forEach((headingName) => {
        const headingDiv = document.createElement('div');
        headingDiv.classList.add('heading');
        const headingH4 = document.createElement('h4');
        headingH4.textContent = headingName;

        headingDiv.appendChild(headingH4);

        AsideCategories.appendChild(headingDiv);

        headingDiv.addEventListener('click', () => renderNotes(headingName, headingDiv));
    });

    const firstHeading = document.querySelector('.heading');
    if (firstHeading) {
        firstHeading.click();
    }
}

function renderNotes(headingName, headingDiv) {
    document.querySelectorAll('.heading').forEach((heading) => heading.classList.remove('active'));
    headingDiv.classList.add('active');
    const noteContainer = document.querySelector('.note-container');
    const deleteBtn = document.createElement('i');
    deleteBtn.innerHTML = '<i class="fa fa-times" aria-hidden="true">X</i>';
    console.log(deleteBtn);
    noteContainer.innerHTML = '';
    const headingH4 = document.createElement('h4');
    headingH4.textContent = headingName;
    noteContainer.appendChild(headingH4);

    if (!headingData[headingName]) {
        headingData[headingName] = { notes: [] };
    }

    const currentData = headingData[headingName];
    const noteContentDiv = document.createElement('div');

    noteContentDiv.classList.add('note-content-div');

    currentData.notes.forEach((note) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        noteDiv.textContent = note;
        noteContentDiv.appendChild(noteDiv);
    });

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Create New Note';
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Note';
    addButton.addEventListener('click', () => {
        const noteText = input.value.trim();
        if (noteText) {
            currentData.notes.push(noteText);
            saveToLocalStorage();
            renderNotes(headingName, headingDiv);
        }
    });

    noteContentDiv.appendChild(input);
    noteContentDiv.appendChild(addButton);
    noteContainer.appendChild(noteContentDiv);
}

catInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const headingName = catInput.value.trim();
        if (headingName && !headingData[headingName]) {
            headingData[headingName] = { notes: [] };
            catInput.style.display = 'none';
            hdh2.style.display = 'block';
            iBtn.style.display = 'block';
            saveToLocalStorage();
            initializeUI();
        }
        catInput.value = '';
    }
});

AsideCategories.addEventListener('click', (e) => {
    console.log(e.target.tagName);
});

asideHeading.addEventListener('click', () => {
    catInput.style.display = 'block';
    hdh2.style.display = 'none';
    iBtn.style.display = 'none';
});

initializeUI();
