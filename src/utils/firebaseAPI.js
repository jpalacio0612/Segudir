const { firestore } = require("firebase");
const firebase = require("firebase");
const { db, auth } = require("../firebase");

function addNewUserToFirestore(user, type) {
  const collection = db.collection(`${type}s`);
  const { profile } = user.additionalUserInfo;
  const details = {
    name: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: profile.picture,
    type: `${type}`,
    createdDtm: firestore.FieldValue.serverTimestamp(),
    lastLoginTime: firestore.FieldValue.serverTimestamp(),
  };
  collection.doc(auth.currentUser.uid).set(details);
}

export const googleSign = (history, type) => {
  var provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((user) => {
      console.log(user);
      try {
        const docRef = db.collection(`${type}s`).doc(auth.currentUser.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const collection = db.collection(`${type}s`);
              collection.doc(auth.currentUser.uid).set(
                {
                  lastLoginTime: firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );
              history.push("/courses");
            } else {
              addNewUserToFirestore(user, type);
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
