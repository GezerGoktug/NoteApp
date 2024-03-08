class authentication{
  //! Kayıt işlemi için statik bir metot.
  static signUp(): void {
    if (inputName !== null && inputSurname !== null) {
        if (inputName.value.trim() === "" || inputSurname.value.trim() === "") {
            //! İsim veya soyisim alanları boşsa veya sadece boşluk içeriyorsa hata göster.
            showToast("Lütfen en az 3 karakter içeren bir isim ve soyisim giriniz.", ToastType.Error);
            return;
        }
    }

    if (inputPassword !== null) {
        var letterCount: number = inputPassword.value.replace(/[^a-zA-Z]/g, "").length;
        if (letterCount < 4) {
            //! Şifrede en az 4 harf kullanılmamışsa hata göster.
            showToast("Lütfen şifrede en az 4 harf kullanın.", ToastType.Error);
            return;
        }
    }

    const form: HTMLFormElement | null = document.getElementById("myForm") as HTMLFormElement | null;
    if (form !== null) {
        if (!form.checkValidity()) {
            //! Form geçerliliğini kontrol et, geçersizse hata göster.
            form.reportValidity();
            return;
        }
    }

    if (inputName !== null && inputSurname !== null && inputPassword !== null && inputEmail !== null) {
        //! Yeni kullanıcı oluştur ve kaydet.
        const newUser: userData = new userData(inputName.value, inputSurname.value, inputEmail.value, inputPassword.value);
        currentUser = { ...newUser, id: userList.length };
        userList.push(newUser);

        //! Formu temizle ve giriş sayfasını göster.
        inputName.value = "";
        inputSurname.value = "";
        inputPassword.value = "";
        inputEmail.value = "";
        togglePasswordVisibility();
        isLogin = true;
        showPage();

        //! Hesap bilgilerini görüntüle, başarılı kayıt mesajı göster ve kullanıcı verilerini sakla.
        authentication.accountDisplay(currentUser);
        showToast("Başarıyla kayıt oldunuz", ToastType.Success);
        const usersData = { userList };
        sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
        localStorage.setItem("noteUserdata", JSON.stringify(usersData));
    }
  }
  //! Giriş işlemi için statik bir metot.
  static signIn(): void {
    if (loginEmail !== null && loginPassword !== null) {
        //! Kullanıcıyı e-posta ve şifreyle bul.
        const user: userData | undefined = userList.find(item =>
            (item.userMail === loginEmail.value && item.userPassword === loginPassword.value)
        );

        if (user !== undefined) {
            //! Kullanıcı varsa, oturumu başlat ve notları göster.
            currentUser = { ...user, id: userList.indexOf(user) };
            notesList = currentUser.notesArray;
        } else {
            //! Kullanıcı yoksa hata göster.
            showToast("Şifre veya e-posta yanlış. Tekrar deneyin.", ToastType.Error);
            return;
        }

        //! Oturumu başlat, sayfayı göster, hesap bilgilerini görüntüle, notları göster, başarılı giriş mesajı göster ve kullanıcı verilerini sakla.
        isLogin = true;
        loginEmail.value = "";
        loginPassword.value = "";
        togglePasswordVisibility();
        showPage();
        authentication.accountDisplay(currentUser);
        UI.notesDisplay(notesList);
        showToast("Hesabınız başarıyla giriş yapıldı", ToastType.Success);
        const usersData = { userList };
        sessionStorage.setItem("currentUserdata", JSON.stringify(currentUser));
        localStorage.setItem("noteUserdata", JSON.stringify(usersData));
    }
  }
  //! Oturumu kapatmak için statik bir metot.
  static signOut(): void {
    notesList = [];
    for (let key in currentUser) {
        delete currentUser[key];
    }
    UI.notesDisplay(notesList);
    authentication.accountDisplay(currentUser);
    isLogin = false;
    showPage();

    //! Oturumu kapat, kullanıcı verilerini sil, başarılı çıkış mesajı göster.
    sessionStorage.removeItem("currentUserdata");
    showToast("Hesap başarıyla çıkış yapıldı.", ToastType.Success);
  }
}