import * as admin from "firebase-admin";
import * as moment from "moment";

export const store = (items: Object[], document?: string) => {
  const db = admin.firestore();
  const docRef = db.collection("news").doc(document ? document : "items");
  const created = moment().unix();
  docRef.set({
    created,
    items
  });
};

export const query = async (collection?: string, document?: string) => {
  const db = admin.firestore();
  const docRef = db
    .collection(collection ? collection : "news")
    .doc(document ? document : "items");
  const doc = await docRef.get();

  return doc.data();
};
