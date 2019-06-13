import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const env = functions.config();

import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(env.algolia.appid, env.algolia.appkey);
const index = client.initIndex('people_search');

exports.indexPeople = functions.firestore
  .document('users/{peopleId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;

    return index.addObject({
      objectId,
      ...data
    });
  });

exports.unidexPeople = functions.firestore
  .document('users/{peopleId}')
  .onDelete((snap, context) => {
    const objectId = snap.id;
    return index.deleteObject(objectId)
  });


