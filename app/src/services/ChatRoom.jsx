import { app } from "../firebase/firebase"
import {
  getFirestore,
  doc,
  addDoc,
  updateDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore"

export async function createChatRoom(name, username, memberIds) {
  try {
    const firestore = getFirestore(app)
    const group = await addDoc(doc(firestore, "group"), {
      name: name,
      createdBy: username,
      createdAt: new Timestamp(),
      members: memberIds,
    })

    const groupId = group.id

    await updateDoc(group, {
      id: groupId,
    })

    //Ajout du salon dans la liste des salons des membres
    for (let memberId of memberIds) {
      const member = await getDoc(doc(firestore, "users", memberId))

      if (member.exists()) {
        const memberData = member.data()
        const groups = memberData.groups || []

        groups.push(groupId)
      }
    }
  } catch (err) {
    console.error("Erreur: ", err)
  }
}

export async function MemberChatRoomList() {
  try {
    const firestore = getFirestore(app)
  } catch (err) {
    console.error("Erreur: ", err)
  }
}
