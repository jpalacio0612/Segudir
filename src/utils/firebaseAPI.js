const { firestore } = require("firebase");
const firebase = require("firebase");
const { db, auth } = require("../firebase");

function addNewUserToFirestore(user) {
  const collection = db.collection("students");
  const { profile } = user.additionalUserInfo;
  const details = {
    name: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: profile.picture,
    createdDtm: firestore.FieldValue.serverTimestamp(),
    lastLoginTime: firestore.FieldValue.serverTimestamp(),
  };
  collection.doc(auth.currentUser.uid).set(details);
}

export const googleSign = (history) => {
  var provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((user) => {
      console.log(user);
      try {
        const docRef = db.collection("students").doc(auth.currentUser.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const collection = db.collection("students");
              collection.doc(auth.currentUser.uid).set(
                {
                  lastLoginTime: firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );
              history.push("/courses");
            } else {
              addNewUserToFirestore(user);
              history.push("/courses");
            }
          })
          .catch((error) => {
            console.error('Checking if customer exists failed" ' + error);
          });
      } catch (error) {
        console.log("Something generic went wrong, ", error);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
