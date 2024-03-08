class UI {
  //! Notları görüntüleme işlevi
  static notesDisplay(myNotes: noteInfo[]): void {
    let result: string = ""; 
    if (noteContainer !== null) {
      result = myNotes.map((item) => {
        item.id = myNotes.indexOf(item); //! Her notun bir kimlik numarası atanır
        return `
          <div class="col">
            <div class="card border border-light-subtle h-100 bg-warning-subtle">
              <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text">${item.content}</p>
                <p class="card-subtitle text-body-secondary">${item.uploadDate}</p>
                <p class="card-subtitle text-body-secondary">${item.updateDate}</p>
                <button onclick="updateNote(event)" data-id="${item.id}" class="btn btn-success rounded-0" data-bs-toggle="modal" data-bs-target="#noteModal">
                  <i class="fa-solid fa-pen"></i> Update
                </button>
                <button onclick="deleteNote(event)" data-id="${item.id}" type="button" class="btn btn-danger rounded-0" data-bs-toggle="modal" data-bs-target="#deleteModal">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        `;
      }).join(""); 

      noteContainer.innerHTML = result; 
    } else {
      throw Error("Not access note container html element."); //! Eğer noteContainer elementine erişilemiyorsa hata fırlatılır
    }
  }

  //! Not ekleme işlevi
  static addNote(): void {
    if (noteContent !== null && noteTitle !== null) {
      //! Not başlığı ve içeriği boş olamaz, doldurulmadıysa hata göster
      if (noteTitle.value.trim() === "" || noteContent.value.trim() === "") {
        showToast("Input fields cannot be left blank. Please write a valid text.", ToastType.Error);
        return;
      }

      let date: Date = new Date(); //! Şu anki tarih ve saat bilgisi alınır
      let times: string = time(date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), "yüklendi"); //! Formatlanmış tarih oluşturulur

      //! Yeni bir not oluşturulur ve notlar listesine eklenir
      const newNote: noteInfo = new noteInfo(noteTitle.value, noteContent.value, times, "No update yet");
      notesList.push(newNote);

      //! Input alanları temizlenir ve başarılı ekleme mesajı gösterilir
      noteTitle.value = "";
      noteContent.value = "";
      showToast("Note added successfully", ToastType.Success);

      //! Kullanıcıya ve not listesine ait veriler güncellenir
      currentUser.notesArray = notesList;
      userList[currentUser.id].notesArray = notesList;

      //! UI yeniden yüklenir ve veriler saklanır
      UI.notesDisplay(notesList);
      authentication.accountDisplay(currentUser);
      const usersData = { userList };
      sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
      localStorage.setItem("noteUserdata", JSON.stringify(usersData));
    } else {
      throw new Error("Not access note title or content html elements."); //! Eğer noteTitle veya noteContent elementine erişilemiyorsa hata fırlatılır
    }
  }

  //! Tüm notları kaldırma işlevi
  static removeAllList(): void {
    if (noteContainer !== null) {
      //! Tüm notlar ve ilgili kullanıcı verileri temizlenir
      notesList = [];
      showToast("All notes have been cleared successfully.", ToastType.Success);
      currentUser.notesArray = [];
      userList[currentUser.id].notesArray = [];

      //! UI yeniden yüklenir ve veriler saklanır
      UI.notesDisplay(notesList);
      authentication.accountDisplay(currentUser);
      const usersData = { userList };
      sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
      localStorage.setItem("noteUserdata", JSON.stringify(usersData));
    } else {
      throw new Error("Not access note container html element."); //! Eğer noteContainer elementine erişilemiyorsa hata fırlatılır
    }
  }

  //! Not silme işlevi
  static deletesNote(e: MouseEvent): void {
    //! Tıklanan notun kimliği alınır ve listeden kaldırılır
    const clickedElement = e.target as HTMLElement;
    const noteID = clickedElement.dataset.id;

    if (noteID) {
      notesList.splice(Number(noteID), 1);
      showToast("The selected note has been deleted successfully", ToastType.Success);
    } else {
      throw new Error("Note ID is undefined."); //! Eğer not kimliği tanımlı değilse hata fırlatılır
    }

    //! Kullanıcı ve not listesine ait veriler güncellenir, UI yeniden yüklenir ve veriler saklanır
    currentUser.notesArray = notesList;
    userList[currentUser.id].notesArray = notesList;
    UI.notesDisplay(notesList);
    authentication.accountDisplay(currentUser);
    const usersData = { userList };
    sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
    localStorage.setItem("noteUserdata", JSON.stringify(usersData));
    events = undefined;
  }

  //! Not güncelleme işlevi
  static updatesNote(e: MouseEvent): void {
    //! Tıklanan notun kimliği alınır
    const updateTitleInput: HTMLInputElement | null = document.getElementById("update-name") as HTMLInputElement;
    const updateTextInput: HTMLInputElement | null = document.getElementById("update-text") as HTMLInputElement;
    const clickedElement = e.target as HTMLElement;
    const noteID = clickedElement.dataset.id;

    if (noteID) {
      //! Eğer güncelleme alanları boşsa hata gösterilir
      if (updateTitleInput.value.trim() === "" || updateTextInput.value.trim() === "") {
        showToast("Input fields cannot be left blank. Please write a valid text.", ToastType.Error);
        return;
      }

      let date: Date = new Date(); //! Şu anki tarih ve saat bilgisi alınır
      let times: string = time(date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), "güncellendi"); //! Formatlanmış tarih oluşturulur

      //! Not bilgileri güncellenir ve güncelleme tarihini kaydedilir
      notesList[Number(noteID)].title = updateTitleInput.value;
      notesList[Number(noteID)].content = updateTextInput.value;
      notesList[Number(noteID)].updateDate = times;

      //! Input alanları temizlenir ve başarılı güncelleme mesajı gösterilir
      updateTitleInput.value = "";
      updateTextInput.value = "";
      showToast("Note updated successfully", ToastType.Success);
    } else {
      throw new Error("Not access update input elements or note ID is undefined."); //! Eğer güncelleme alanlarına veya not kimliğine erişilemiyorsa hata fırlatılır
    }

    //! Kullanıcı ve not listesine ait veriler güncellenir, UI yeniden yüklenir ve veriler saklanır
    currentUser.notesArray = notesList;
    userList[currentUser.id].notesArray = notesList;
    UI.notesDisplay(notesList);
    const usersData = { userList };
    sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
    localStorage.setItem("noteUserdata", JSON.stringify(usersData));
    events = undefined;
  }

  //! Şifre görünürlüğünü değiştirme işlevi
  static chancePasswordVisibility(e: MouseEvent): void {
    const clickedElement = e.target as HTMLElement;
    const passwordInput = clickedElement.previousElementSibling as HTMLInputElement;

    if (passwordInput !== null) {
      //! Eğer şifre alanı varsa, görünürlüğünü değiştirir
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      clickedElement.classList.toggle("fa-eye", passwordInput.type === "text");
      clickedElement.classList.toggle("fa-eye-slash", passwordInput.type === "password");
    } else {
      throw new Error("Not access password input element."); //! Eğer şifre alanına erişilemiyorsa hata fırlatılır
    }
  }
}
