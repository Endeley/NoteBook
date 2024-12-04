// Key for local storage
const LOCAL_STORAGE_KEY = 'headingData';
let headingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
const AsideCategories = document.querySelector('.categories');
const catInput = document.getElementById('createNoteBook');
const asideHeading = document.querySelector('.create-cat');
const noteContainer = document.querySelector('.note-container'); // Fixed selector (add dot before class name)
const hdh2 = document.querySelector('.create-cat h2');
const iBtn = document.getElementById('plusBtn');

// Save the heading data to local storage
function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(headingData));
}

// Initialize the UI with saved headings
function initializeUI() {
    AsideCategories.innerHTML = ''; // Clear existing headings
    Object.keys(headingData).forEach((headingName) => {
        const headingDiv = document.createElement('div');
        headingDiv.classList.add('heading');
        const headingH4 = document.createElement('h4');
        headingH4.textContent = headingName;

        headingDiv.appendChild(headingH4);

        // Add a delete button
        const deleteBtn = document.createElement('i');
        deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        deleteBtn.classList.add('deleteBtn');
        headingDiv.appendChild(deleteBtn);

        // Append to categories
        AsideCategories.appendChild(headingDiv);

        // Handle heading click to render notes
        headingDiv.addEventListener('click', () => renderNotes(headingName, headingDiv));

        // Handle delete button click
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering heading click event
            delete headingData[headingName]; // Remove from localStorage
            saveToLocalStorage(); // Save updated data
            headingDiv.remove(); // Remove from the page
        });
    });

    // Select the first heading if any
    const firstHeading = document.querySelector('.heading');
    if (firstHeading) {
        firstHeading.click();
    }
}

// Render notes for a selected heading
function renderNotes(headingName, headingDiv) {
    document.querySelectorAll('.heading').forEach((heading) => heading.classList.remove('active'));
    headingDiv.classList.add('active');
    noteContainer.innerHTML = ''; // Clear current notes

    const headingH4 = document.createElement('h4');
    headingH4.textContent = headingName;
    noteContainer.appendChild(headingH4);

    if (!headingData[headingName]) {
        headingData[headingName] = { notes: [] }; // Initialize empty notes if not exist
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

    // Add input and button to create new notes
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Click here to write';
    input.classList.add('input-note');
    const addButton = document.createElement('button');
    addButton.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
    addButton.classList.add('addNoteBtn');
    addButton.addEventListener('click', () => {
        const noteText = input.value.trim();
        if (noteText) {
            currentData.notes.push(noteText);
            saveToLocalStorage();
            renderNotes(headingName, headingDiv); // Re-render notes
        }
    });

    noteContentDiv.appendChild(input);
    noteContentDiv.appendChild(addButton);
    noteContainer.appendChild(noteContentDiv);
}

// Create a new heading when pressing Enter
catInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const headingName = catInput.value.trim();
        if (headingName && !headingData[headingName]) {
            headingData[headingName] = { notes: [] }; // Initialize notes for new heading
            catInput.style.display = 'none';
            hdh2.style.display = 'block';
            iBtn.style.display = 'block';
            saveToLocalStorage(); // Save to localStorage
            initializeUI(); // Re-initialize UI with new heading
        }
        catInput.value = ''; // Clear input
    }
});

// Toggle the input field for creating a new category
asideHeading.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        catInput.style.display = 'block';
        hdh2.style.display = 'none';
        iBtn.style.display = 'none';
    } else if (e.target.tagName === 'DIV') {
        hdh2.style.display = 'block';
        iBtn.style.display = 'block';
        catInput.style.display = 'none';
    }
});

// Initialize the UI on page load
initializeUI();
