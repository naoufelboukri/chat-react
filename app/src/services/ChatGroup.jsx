import { app } from "../firebase/firebase"
import {
  getFirestore,
  doc,
  addDoc,
  updateDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore"

/**
 * Créer un salon de discussion
 * @param {*} name nom du groupe 
 * @param {*} username id du créateur du groupe
 * @param {string[]} memberIds id des membres du groupe
 */
export async function createChatGroup(name, usernameId, memberIds) {
  try {
    const firestore = getFirestore(app)
    const group = await addDoc(doc(firestore, "group"), {
      name: name,
      createdBy: usernameId,
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

export async function MemberChatGroupList() {
  try {
    const firestore = getFirestore(app)
  } catch (err) {
    console.error("Erreur: ", err)
  }
}
