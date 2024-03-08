class userData {
    constructor(userName, userSurname, userMail, userPassword) {
        this.userName = userName;
        this.userSurname = userSurname;
        this.userMail = userMail;
        this.userPassword = userPassword;
        this.notesArray = [];
    }
}
class noteInfo {
    constructor(title, content, uploadDate, updateDate) {
        this.title = title;
        this.content = content;
        this.uploadDate = uploadDate;
        this.updateDate = updateDate;
        this.id = 0;
    }
}
class CurrentUser extends userData {
    constructor(userName, userSurname, userMail, userPassword, id) {
        super(userName, userSurname, userMail, userPassword);
        this.id = id;
    }
}
