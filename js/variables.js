const main = document.getElementById("main");
const login = document.getElementById("login");
const signİn = document.getElementById("signİn");
const signUp = document.getElementById("signUp");
const noteContainer = document.getElementById("notes");
const account = document.getElementById("account");
const noteTitle = document.getElementById("note-name");
const noteContent = document.getElementById("note-content");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const inputPassword = document.getElementById("inputPassword");
const inputEmail = document.getElementById("inputEmail");
const inputSurname = document.getElementById("inputSurname");
const inputName = document.getElementById("inputName");
const addNote = document.getElementById("addNote");
const removeList = document.getElementById("removeList");
const deleteNotes = document.getElementById("delete");
const updateNotes = document.getElementById("update");
let isLogin = false;
let currentUser;
let userList = [];
let notesList = [];
