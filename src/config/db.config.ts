import admin from 'firebase-admin'
import firebaseKey from '../../firebaseKey.json'

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey as admin.ServiceAccount)
})

const db = admin.firestore()

export { db }
