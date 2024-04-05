import {
  getFirestore,
  addDoc,
  Timestamp,
  onSnapshot,
  query,
  collection,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore"

export async function sendMessage(message, senderId, groupId) {
  try {
    const firestore = getFirestore(app)

    await addDoc(collection(firestore, "messages", groupId), {
      text: message,
      sendBy: senderId,
      createdAt: new Timestamp(),
    })
  } catch (err) {
    console.err("Erreur: ", err)
  }
}

export async function handleNewMessages(groupId) {
  const firestore = getFirestore(app)

  const request = query(
    collection(firestore, "messages", groupId),
    orderBy("createdAt", "asc")
  )
  return onSnapshot(request, (snapshot) => {
    let message = []
    snapshot.forEach(async (result) => {
      get
      const user = await getDoc(doc(firestore, "users", result.data().senderId))
      message.push({
        text: result.data().text,
        sendName: user.data().username,
        createdAt: result.data().createdAt,
      })
    })
  })
}
