import { app } from "../firebase/firebase"
import {
  getFirestore,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore"

/**
 * Créer un salon de discussion
 * @param {string} name nom du groupe
 * @param {string} usernameId id du créateur du groupe
 * @param {string[]} memberIds id des membres du groupe
 */
export async function createChatGroup(name, usernameId, memberIds) {
  try {
    const firestore = getFirestore()

    const group = await addDoc(collection(firestore, "groups"), {
      name: name,
      createdBy: usernameId,
      createdAt: new Date(),
      members: memberIds,
    });

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

/**
 *
 * @returns les utilisateurs invitables
 */
export async function searchMembers() {
  let usersData = []
  try {
    const firestore = getFirestore(app)
    const request = await getDocs(collection(firestore, "users"))
    request.forEach((doc) => {
      usersData.push({
        id: doc.id,
        username: doc.data().username,
        email: doc.data().email,
      })
      console.log(doc.id, " => ", doc.data())
    })

    return usersData
  } catch (err) {
    console.error("Erreur: ", err)
    return null
  }
}

/**
 * Renvoi une liste de groupes de discussion de l'utilisateur
 * @param {string} userId id de l'utilisateur
 * @returns la liste des groupes
 */
export async function myGroupList(userId) {
  let groupList = []
  try {
    const firestore = getFirestore(app)
    const user = await getDoc(firestore, "users", userId)

    if (user.exists()) {
      const userGroups = user.data().groups

      await Promise.all(
        userGroups.map(async (groupId) => {
          const groupDoc = await getDoc(doc(firestore, "group", groupId))
          if (groupDoc.exists()) {
            groupList.push(groupDoc.data())
          }
        })
      )
      return groupList
    }
  } catch (err) {
    console.error("Erreur:", err)
    return null
  }
}


export function listenForGroupsByUserId(userId, setGroups) {
  const firestore = getFirestore(app);
  
  // Créez une requête pour trouver les groupes où le champ 'createdBy' correspond à l'userId donné
  // const groupsQuery = query(collection(firestore, "groups"), where("createdBy", "==", userId));

  const groupsQuery = query(
    collection(firestore, "groups"),
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc")
  );

  // Utilisez onSnapshot pour écouter en temps réel les changements
  const unsubscribe = onSnapshot(groupsQuery, querySnapshot => {
    const groups = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Groups updated:", groups);

    // Utilisez le setter de l'état pour mettre à jour les groupes dans le composant
    setGroups(groups);
  }, error => {
    console.error("Erreur lors de l'écoute des changements sur les groupes:", error);
  });

  // Retournez la fonction de désinscription pour pouvoir arrêter l'écoute
  return unsubscribe;
}