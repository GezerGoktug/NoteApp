window.addEventListener("DOMContentLoaded", (): void => {
  //! localStorage ve sessionStorage'den kullanıcı verilerini al
  const localData = localStorage.getItem("noteUserdata");
  const sessionData = sessionStorage.getItem("currentUserdata");
  if (localData) {
    //! localStorage'ta kullanıcı verileri varsa, userList'e aktar
    const localUsers = JSON.parse(localData);
    userList = localUsers.userList;
  }
  if (sessionData) {
    //! sessionStorage'ta kullanıcı verileri varsa, kullanıcı oturumunu başlat
    const sessionUser = JSON.parse(sessionData);
    isLogin = true;
    currentUser = sessionUser;
    notesList = currentUser.notesArray;
  }
  showPage();
  UI.notesDisplay(notesList);
  authentication.accountDisplay(currentUser)
  togglePasswordVisibility();
});
//! Tarih ve saat bilgisini belirli bir formatta döndürür
const time = (date: number,month: number,year: number,hours: number,minutes: number,type: string): string => {
  let formattedMonth: string = month + 1 < 10 ? "0" : "";
  let formattedMinutes: string = minutes + 1 < 10 ? "0" : "";
  return `${date}/${formattedMonth}${month + 1}/${year} tarihinde saat ${hours}:${formattedMinutes}${minutes}'de ${type}.`;
};
//! Not ekle butonuna tıklanınca not ekleme işlemini gerçekleştir
if (addNote !== null)
addNote.addEventListener("click", (): void => {UI.addNote();});
//! Tüm notları sil butonuna tıklanınca tüm notları silme işlemini gerçekleştir
if (removeList !== null)
removeList.addEventListener("click", (): void => { UI.removeAllList();});
//! Notu sil butonuna tıklanınca seçilen notu silme işlemini gerçekleştir
let events: MouseEvent | undefined;
if (deleteNotes !== null) {
  deleteNotes.addEventListener("click", (): void => {
    if (events !== undefined) UI.deletesNote(events);
  });
}
//! Notu güncelle butonuna tıklanınca seçilen notu güncelleme işlemini gerçekleştir
if (updateNotes !== null) {
  updateNotes.addEventListener("click", (): void => {
    if (events !== undefined) UI.updatesNote(events);
  });
}
//! Silinecek notu belirlemek için fare olayını takip et
const deleteNote = (e: MouseEvent): void => {events = e;};
//! Güncellenecek notu belirlemek için fare olayını takip et ve ilgili input alanlarını doldur
const updateNote = (e: MouseEvent): void => {
  events = e;
  const updateTitleInput: HTMLInputElement | null = document.getElementById("update-name") as HTMLInputElement;
  const updateTextInput: HTMLInputElement | null = document.getElementById("update-text") as HTMLInputElement;
  if (events !== undefined) {
    const clickedElement = events.target as HTMLElement;
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
  }
//! Kayıt ol veya giriş yap panelini değiştir
const chanceSignPanel = (e: MouseEvent): void => {
  if (signUp !== null && signİn !== null) {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.classList.contains("sign-in")) {
      signUp.classList.remove("d-none");
      signİn.classList.add("d-none");
      togglePasswordVisibility();
    } else {
      signUp.classList.add("d-none");
      signİn.classList.remove("d-none");
      togglePasswordVisibility();
    }
  }
  else {
    throw new Error("Sign-up or sign-in element is missing.");
  }
};
//! Kullanıcı giriş yapmışsa ana sayfayı, yoksa giriş sayfasını göster
const showPage = (): void => {
  if (login !== null && main !== null) {
    if (isLogin === false) {
      login.classList.remove("d-none");
      main.classList.add("d-none");
      togglePasswordVisibility();
    } else {
      login.classList.add("d-none");
      main.classList.remove("d-none");
      togglePasswordVisibility();
    }
  }
  else {
    throw new Error("Login or main element is missing.");
  }
};
//! Şifrenin görünürlüğünü değiştirme işlevi
const passwordVisibility = (e: MouseEvent): void => { UI.chancePasswordVisibility(e);};
//! Şifrenin görünürlüğünü sıfırlar
const togglePasswordVisibility = (): void => {
  if (inputPassword !== null && loginPassword !== null) {
    inputPassword.type = "password";
    loginPassword.type = "password";
    const element1 = inputPassword.nextElementSibling as HTMLElement;
    const element2 = loginPassword.nextElementSibling as HTMLElement;
    element1.classList.remove("fa-eye");
    element2.classList.remove("fa-eye");
    element1.classList.add("fa-eye-slash");
    element2.classList.add("fa-eye-slash");
  }
  else {
    throw new Error("Password input elements are missing.");
  }
};
//! Kullanıcı giriş yapma işlemi
const loginAccount = (e: MouseEvent): void => {
  e.preventDefault();
  authentication.signİn();
};
//! Kullanıcı kayıt olma işlemi
const register = (e: MouseEvent): void => {
  e.preventDefault();
  authentication.signUp();
};
//! Kullanıcı çıkış yapma işlemi
const exitAccount = (): void => {authentication.outAccount();};
enum ToastType {
  Success = "success",
  Error = "danger",
  Info = "info",
}
//! Bildirim gösterme işlevi(Bootstrapten alınmıştır.)
function showToast(
  message: string,
  type: ToastType = ToastType.Info,
  duration: number = 3000
) {
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
  icon.className = `bi ${
    type === ToastType.Success
      ? "bi-check-circle-fill"
      : type === ToastType.Error
      ? "bi-x-circle-fill"
      : "bi-info-circle-fill"
  } me-1`;
  icon.setAttribute("role", "img");
  icon.setAttribute(
    "aria-label",
    type === ToastType.Success
      ? "Success"
      : type === ToastType.Error
      ? "Error"
      : "Info"
  );
  toast.appendChild(icon);

  // Toast içeriğini oluştur
  const toastContent = document.createElement("div");
  toastContent.className = "toast-body";
  toastContent.innerText = message;
  toast.appendChild(toastContent);

  // Eğer toast container bulunamazsa body'e ekle
  if (!toastContainer) {
    document.body.appendChild(toast);
  } else {
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
