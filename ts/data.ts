class userData{
    userName: string;
    userSurname: string;
    userMail: string;
    userPassword: string;
    notesArray:noteInfo[];
    constructor(userName:string,userSurname:string,userMail:string,userPassword:string){
        this.userName=userName;
        this.userSurname=userSurname;
        this.userMail=userMail;                     
        this.userPassword=userPassword;
        this.notesArray=[];
    }
    
}
class noteInfo{
    title:string;
    content:string;
    uploadDate:string;
    updateDate:string;
    id:number;
    constructor(title:string,content:string,uploadDate:string,updateDate:string){
        this.title=title;
        this.content=content;
        this.uploadDate=uploadDate;                     
        this.updateDate=updateDate;
        this.id=0;
    }
}
class CurrentUser extends userData {
    id: number;

    constructor(userName: string, userSurname: string, userMail: string, userPassword: string, id: number) {
        super(userName, userSurname, userMail, userPassword);
        this.id = id;
    }
}
