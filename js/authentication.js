class authentication {
    static accountDisplay(currentUserData) {
        if (account !== null) {
            try {
                account.innerHTML = `
            <h1><i class="fa-solid fa-user"></i> ${currentUserData.userName} ${currentUserData.userSurname}</h1>
            <h4><i class="fa-solid fa-envelope"></i> ${currentUserData.userMail}</h4>
            <p>
              <i class="fa-solid fa-note-sticky"></i> Toplamda
              <span class="text-primary">${notesList.length} adet </span>notunuz var
            </p>
            `;
            }
            catch (error) {
                console.error("Error displaying account information:", error);
            }
        }
        else {
            throw Error("Not access account html element.");
        }
    }
    static signUp() {
        if (inputName !== null && inputSurname !== null) {
            if (inputName.value.trim() === "" || inputSurname.value.trim() === "") {
                showToast("Please enter a first and last name of at least 3 characters, excluding spaces.", ToastType.Error);
                return;
            }
        }
        if (inputPassword !== null) {
            var letterCount = inputPassword.value.replace(/[^a-zA-Z]/g, "").length;
            if (letterCount < 4) {
                showToast("Please use at least 4 letters in your password", ToastType.Error);
                return;
            }
        }
        const form = document.getElementById("myForm");
        if (form !== null) {
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
        }
        if (inputName !== null && inputSurname !== null && inputPassword !== null && inputEmail !== null) {
            const newUser = new userData(inputName.value, inputSurname.value, inputEmail.value, inputPassword.value);
            currentUser = { ...newUser, id: userList.length };
            userList.push(newUser);
            inputName.value = "";
            inputSurname.value = "";
            inputPassword.value = "";
            inputEmail.value = "";
            togglePasswordVisibility();
            isLogin = true;
            showPage();
            authentication.accountDisplay(currentUser);
            showToast("Successfully registered", ToastType.Success);
            const usersData = { userList };
            sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
            localStorage.setItem("noteUserdata", JSON.stringify(usersData));
        }
    }
    static signİn() {
        if (loginEmail !== null && loginPassword !== null) {
            const user = userList.find(item => (item.userMail === loginEmail.value && item.userPassword === loginPassword.value));
            if (user !== undefined) {
                currentUser = { ...user, id: userList.indexOf(user) };
                notesList = currentUser.notesArray;
            }
            else {
                showToast("The password or email is incorrect. Try again.", ToastType.Error);
                return;
            }
            isLogin = true;
            loginEmail.value = "";
            loginPassword.value = "";
            togglePasswordVisibility();
            showPage();
            authentication.accountDisplay(currentUser);
            UI.notesDisplay(notesList);
            showToast("Your account has been successfully logged in", ToastType.Success);
            const usersData = { userList };
            sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
            localStorage.setItem("noteUserdata", JSON.stringify(usersData));
        }
    }
    static outAccount() {
        notesList = [];
        for (let key in currentUser) {
            delete currentUser[key];
        }
        UI.notesDisplay(notesList);
        authentication.accountDisplay(currentUser);
        isLogin = false;
        showPage();
        sessionStorage.removeItem("currentUserdata");
        showToast("Account has been successfully logged out.", ToastType.Success);
    }
}
