import * as  firebase from  'firebase';

const config = {
    apiKey: "AIzaSyDq9jrWJ7902oL4eZnMJXtun67DMxzuaOk",
    authDomain: "goalcoach-faefb.firebaseapp.com",
    databaseURL: "https://goalcoach-faefb.firebaseio.com",
    projectId: "goalcoach-faefb",
    storageBucket: "goalcoach-faefb.appspot.com",
    messagingSenderId: "1038111109874"
};

export  const firebaseApp=firebase.initializeApp(config);

export const  goalRef=firebase.database().ref('goals');