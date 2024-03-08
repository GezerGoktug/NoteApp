window.addEventListener("DOMContentLoaded", () => {
    const localData = localStorage.getItem("noteUserdata");
    const sessionData = sessionStorage.getItem("currentUserdata");
    if (localData) {
        const localUsers = JSON.parse(localData);
        userList = localUsers.userList;
    }
    if (sessionData) {
        const sessionUser = JSON.parse(sessionData);
        isLogin = true;
        currentUser = sessionUser;
        notesList = currentUser.notesArray;
    }
    showPage();
    UI.notesDisplay(notesList);
    authentication.accountDisplay(currentUser);
    togglePasswordVisibility();
});
const time = (date, month, year, hours, minutes, type) => {
    let formattedMonth = month + 1 < 10 ? "0" : "";
    let formattedMinutes = minutes + 1 < 10 ? "0" : "";
    return `${date}/${formattedMonth}${month + 1}/${year} tarihinde saat ${hours}:${formattedMinutes}${minutes}'de ${type}.`;
};
if (addNote !== null)
    addNote.addEventListener("click", () => { UI.addNote(); });
if (removeList !== null)
    removeList.addEventListener("click", () => { UI.removeAllList(); });
let events;
if (deleteNotes !== null) {
    deleteNotes.addEventListener("click", () => {
        if (events !== undefined)
            UI.deletesNote(events);
    });
}
if (updateNotes !== null) {
    updateNotes.addEventListener("click", () => {
        if (events !== undefined)
            UI.updatesNote(events);
    });
}
const deleteNote = (e) => { events = e; };
const updateNote = (e) => {
    events = e;
    const updateTitleInput = document.getElementById("update-name");
    const updateTextInput = document.getElementById("update-text");
    if (events !== undefined) {
        const clickedElement = events.target;
        const noteID = clickedElement.dataset.id;
        if (noteID !== undefined && updateTitleInput !== null && updateTextInput !== null) {
            updateTitleInput.value = notesList[Number(noteID)].title;
            updateTextInput.value = notesList[Number(noteID)].content;
        }
        else {
            throw new Error("Invalid note ID or missing input elements.");
        }
    }
    else {
        throw new Error("Mouse event is undefined.");
    }
};
const chanceSignPanel = (e) => {
    if (signUp !== null && signİn !== null) {
        const clickedElement = e.target;
        if (clickedElement.classList.contains("sign-in")) {
            signUp.classList.remove("d-none");
            signİn.classList.add("d-none");
            togglePasswordVisibility();
        }
        else {
            signUp.classList.add("d-none");
            signİn.classList.remove("d-none");
            togglePasswordVisibility();
        }
    }
    else {
        throw new Error("Sign-up or sign-in element is missing.");
    }
};
const showPage = () => {
    if (login !== null && main !== null) {
        if (isLogin === false) {
            login.classList.remove("d-none");
            main.classList.add("d-none");
            togglePasswordVisibility();
        }
        else {
            login.classList.add("d-none");
            main.classList.remove("d-none");
            togglePasswordVisibility();
        }
    }
    else {
        throw new Error("Login or main element is missing.");
    }
};
const passwordVisibility = (e) => { UI.chancePasswordVisibility(e); };
const togglePasswordVisibility = () => {
    if (inputPassword !== null && loginPassword !== null) {
        inputPassword.type = "password";
        loginPassword.type = "password";
        const element1 = inputPassword.nextElementSibling;
        const element2 = loginPassword.nextElementSibling;
        element1.classList.remove("fa-eye");
        element2.classList.remove("fa-eye");
        element1.classList.add("fa-eye-slash");
        element2.classList.add("fa-eye-slash");
    }
    else {
        throw new Error("Password input elements are missing.");
    }
};
const loginAccount = (e) => {
    e.preventDefault();
    authentication.signİn();
};
const register = (e) => {
    e.preventDefault();
    authentication.signUp();
};
const exitAccount = () => { authentication.outAccount(); };
var ToastType;
(function (ToastType) {
    ToastType["Success"] = "success";
    ToastType["Error"] = "danger";
    ToastType["Info"] = "info";
})(ToastType || (ToastType = {}));
function showToast(message, type = ToastType.Info, duration = 3000) {
    // Toast container'ını belirle
    const toastContainer = document.getElementById("toast-container");
    // Toast öğesini oluştur
    const toast = document.createElement("div");
    toast.className = `toast d-flex justify-content-left p-2 align-items-center text-white bg-${type}  `;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    // İkon oluştur
    const icon = document.createElement("i");
    icon.className = `bi ${type === ToastType.Success
        ? "bi-check-circle-fill"
        : type === ToastType.Error
            ? "bi-x-circle-fill"
            : "bi-info-circle-fill"} me-1`;
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", type === ToastType.Success
        ? "Success"
        : type === ToastType.Error
            ? "Error"
            : "Info");
    toast.appendChild(icon);
    // Toast içeriğini oluştur
    const toastContent = document.createElement("div");
    toastContent.className = "toast-body";
    toastContent.innerText = message;
    toast.appendChild(toastContent);
    // Eğer toast container bulunamazsa body'e ekle
    if (!toastContainer) {
        document.body.appendChild(toast);
    }
    else {
        // Bir önceki toast'un altında göster
        toastContainer.insertBefore(toast, toastContainer.firstChild);
    }
    // Toast'u göster
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    // Belirtilen süre sonra toast'u gizle
    setTimeout(() => {
        bsToast.hide();
        setTimeout(() => {
            // Toast'u DOM'dan kaldır
            toast.remove();
        }, 500);
    }, duration);
}
