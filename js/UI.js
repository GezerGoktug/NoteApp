class UI {
    static notesDisplay(myNotes) {
        let result = "";
        if (noteContainer !== null) {
            result = myNotes.map((item) => {
                item.id = myNotes.indexOf(item);
                return `
                <div class="col">   <div class="card  border border-light-subtle h-100 bg-warning-subtle">
                <div class="card-body">
                  <h4 class="card-title">${item.title}</h4>
                  <p class="card-text">${item.content}</p>
                  <p class="card-subtitle text-body-secondary">${item.uploadDate}</p>
                  <p class="card-subtitle text-body-secondary">${item.updateDate}</p>
                  <button
                    onclick="updateNote(event)"
                    data-id="${item.id}"
                    class="btn btn-success rounded-0"
                    data-bs-toggle="modal"
                    data-bs-target="#noteModal"
                  >
                    <i class="fa-solid fa-pen"></i> Update
                  </button>
                  <button
                    onclick="deleteNote(event)"
                    data-id="${item.id}"
                    type="button"
                    class="btn btn-danger rounded-0"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    <i class="fa-solid fa-trash"></i> Delete
                  </button>
    
                </div>
              </div></div>
                `;
            }).join('');
            noteContainer.innerHTML = result;
        }
        else {
            throw Error("Not access note container html element.");
        }
    }
    static addNote() {
        if (noteContent !== null && noteTitle !== null) {
            if (noteTitle.value.trim() === "" || noteContent.value.trim() === "") {
                showToast("Input fields cannot be left blank. Please write a valid text.", ToastType.Error);
                return;
            }
            let date = new Date();
            let times = time(date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), "yüklendi");
            const newNote = new noteInfo(noteTitle.value, noteContent.value, times, "No update yet");
            notesList.push(newNote);
            noteTitle.value = "";
            noteContent.value = "";
            showToast("Note added successfully", ToastType.Success);
            currentUser.notesArray = notesList;
            userList[currentUser.id].notesArray = notesList;
            UI.notesDisplay(notesList);
            authentication.accountDisplay(currentUser);
            const usersData = { userList };
            sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
            localStorage.setItem("noteUserdata", JSON.stringify(usersData));
        }
        else {
            throw new Error("Not access note title or content html elements.");
        }
    }
    static removeAllList() {
        if (noteContainer !== null) {
            notesList = [];
            showToast("All notes have been cleared successfully.", ToastType.Success);
            currentUser.notesArray = [];
            userList[currentUser.id].notesArray = [];
            UI.notesDisplay(notesList);
            authentication.accountDisplay(currentUser);
            const usersData = { userList };
            sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
            localStorage.setItem("noteUserdata", JSON.stringify(usersData));
        }
        else {
            throw new Error("Not access note container html element.");
        }
    }
    static deletesNote(e) {
        const clickedElement = e.target;
        const noteID = clickedElement.dataset.id;
        if (noteID) {
            notesList.splice(Number(noteID), 1);
            showToast("The selected note has been deleted successfully", ToastType.Success);
        }
        else {
            throw new Error("Note ID is undefined.");
        }
        currentUser.notesArray = notesList;
        userList[currentUser.id].notesArray = notesList;
        UI.notesDisplay(notesList);
        authentication.accountDisplay(currentUser);
        const usersData = { userList };
        sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
        localStorage.setItem("noteUserdata", JSON.stringify(usersData));
        events = undefined;
    }
    static updatesNote(e) {
        const updateTitleInput = document.getElementById("update-name");
        const updateTextInput = document.getElementById("update-text");
        const clickedElement = e.target;
        const noteID = clickedElement.dataset.id;
        if (noteID) {
            if (updateTitleInput.value.trim() === "" || updateTextInput.value.trim() === "") {
                showToast("Input fields cannot be left blank. Please write a valid text.", ToastType.Error);
                return;
            }
            let date = new Date();
            let times = time(date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), "güncellendi");
            notesList[Number(noteID)].title = updateTitleInput.value;
            notesList[Number(noteID)].content = updateTextInput.value;
            notesList[Number(noteID)].updateDate = times;
            updateTitleInput.value = "";
            updateTextInput.value = "";
            showToast("Note updated successfully", ToastType.Success);
        }
        else {
            throw new Error("Not access update input elements or note ID is undefined.");
        }
        currentUser.notesArray = notesList;
        userList[currentUser.id].notesArray = notesList;
        UI.notesDisplay(notesList);
        const usersData = { userList };
        sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
        localStorage.setItem("noteUserdata", JSON.stringify(usersData));
        events = undefined;
    }
    static chancePasswordVisibility(e) {
        const clickedElement = e.target;
        const passwordInput = clickedElement.previousElementSibling;
        if (passwordInput !== null) {
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
            clickedElement.classList.toggle("fa-eye", passwordInput.type === "text");
            clickedElement.classList.toggle("fa-eye-slash", passwordInput.type === "password");
        }
        else {
            throw new Error("Not access password input element.");
        }
    }
}
