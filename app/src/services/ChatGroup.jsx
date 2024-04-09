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
  deleteDoc,
  serverTimestamp,
  limit,
} from "firebase/firestore"

/**
 * Créer un salon de discussion
 * @param {string} name nom du groupe
 * @param {string} usernameId id du créateur du groupe
 * @param {string[]} memberIds id des membres du groupe
 */
export async function createChatGroup(name, currentUser) {
  try {
    const firestore = getFirestore()

    await addDoc(collection(firestore, "groups"), {
      name: name,
      createdBy: currentUser.uid,
      createdAt: new Date(),
      memberIds: [currentUser.uid],
      membersName: [currentUser.displayName],
      membersEmail: [currentUser.email],
    });

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
    where("memberIds", "array-contains", userId),
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


export async function searchUsersByPseudo(pseudoText) {
  const firestore = getFirestore(app); // Obtient une référence à la base de données Firestore
  let usersData = [];

  // Prépare une requête pour trouver des utilisateurs dont le pseudo contient le texte saisi.
  // Note : Firebase Firestore n'a pas de recherche native "contient" pour les chaînes de caractères.
  // Cette requête recherche exactement le texte saisi. Pour une recherche "commence par",
  // vous pouvez utiliser les expressions `>=` et `<` sur des chaînes.
  const pseudoQuery = query(
    collection(firestore, "users"),
    where("username", ">=", pseudoText),
    where("username", "<=", pseudoText + '\uf8ff')
  );

  try {
    const querySnapshot = await getDocs(pseudoQuery);
    querySnapshot.forEach((doc) => {
      usersData.push({
        id: doc.id,
        name: doc.data().username, // ou 'name' en fonction du champ que vous utilisez dans Firestore
        email: doc.data().email,
      });
    });

    console.log("Utilisateurs trouvés:", usersData);
    return usersData;
  } catch (err) {
    console.error("Erreur lors de la recherche d'utilisateurs:", err);
    return [];
  }
}

/**
 * Ajoute des utilisateurs à un groupe existant
 * @param {string} groupId l'identifiant du groupe à mettre à jour
 * @param {Array<Object>} newMembers les nouveaux membres à ajouter, chaque membre étant un objet { id: string, name: string }
 */
export async function addUsersToGroup(groupId, newMembers) {
  const firestore = getFirestore(app); // Obtient une référence à la base de données Firestore

  // Référence au document du groupe dans Firestore
  const groupDocRef = doc(firestore, "groups", groupId);

  try {
    // Récupère le document du groupe actuel pour obtenir la liste des membres existants
    const groupDoc = await getDoc(groupDocRef);

    if (!groupDoc.exists()) {
      throw new Error('Le groupe n\'existe pas');
    }

    // Obtient les listes actuelles des IDs, noms, et emails des membres
    const existingMemberIds = groupDoc.data().memberIds || [];
    const existingMembersName = groupDoc.data().membersName || [];
    const existingMembersEmail = groupDoc.data().membersEmail || [];

    // Prépare les nouvelles listes
    const updatedMemberIds = [...new Set([...existingMemberIds, ...newMembers.map(member => member.id)])];
    const updatedMembersName = [...new Set([...existingMembersName, ...newMembers.map(member => member.name)])];
    const updatedMembersEmail = [...new Set([...existingMembersEmail, ...newMembers.map(member => member.email)])];

    // Met à jour le document du groupe avec les nouvelles listes
    await updateDoc(groupDocRef, {
      memberIds: updatedMemberIds,
      membersName: updatedMembersName,
      membersEmail: updatedMembersEmail,
    });

    console.log('Les membres ont été ajoutés au groupe avec succès');
  } catch (err) {
    console.error("Erreur lors de l'ajout des membres au groupe:", err);
  }
}


/**
 * Supprime un utilisateur d'un groupe existant
 * @param {string} groupId l'identifiant du groupe à mettre à jour
 * @param {string} memberId l'identifiant du membre à supprimer
 */
export async function removeUserFromGroup(groupId, memberId) {
  const firestore = getFirestore(app); // Obtient une référence à la base de données Firestore

  // Référence au document du groupe dans Firestore
  const groupDocRef = doc(firestore, "groups", groupId);

  try {
    // Récupère le document du groupe actuel
    const groupDoc = await getDoc(groupDocRef);

    if (!groupDoc.exists()) {
      throw new Error('Le groupe n\'existe pas');
    }

    const groupData = groupDoc.data();

    // Vérifie si le membre à supprimer est le créateur du groupe
    if (groupData.createdBy === memberId) {
      // Le créateur quitte le groupe, donc supprime le groupe entier
      await deleteDoc(groupDocRef);
      console.log(`Le groupe ${groupId} a été supprimé car le créateur a quitté le groupe.`);
    } else {
      // Ce n'est pas le créateur, procède à la suppression du membre des listes
      const existingMemberIds = groupData.memberIds || [];
      const existingMembersName = groupData.membersName || [];
      const existingMembersEmail = groupData.membersEmail || [];

      // Indices du membre à supprimer dans chaque liste
      const indexId = existingMemberIds.indexOf(memberId);
      const indexName = existingMembersName.findIndex((name, index) => existingMemberIds[index] === memberId);
      const indexEmail = existingMembersEmail.findIndex((email, index) => existingMemberIds[index] === memberId);

      // Suppression du membre dans chaque liste
      if (indexId !== -1) existingMemberIds.splice(indexId, 1);
      if (indexName !== -1) existingMembersName.splice(indexName, 1);
      if (indexEmail !== -1) existingMembersEmail.splice(indexEmail, 1);

      // Met à jour le document du groupe avec les listes mises à jour
      await updateDoc(groupDocRef, {
        memberIds: existingMemberIds,
        membersName: existingMembersName,
        membersEmail: existingMembersEmail,
      });

      console.log(`Le membre ${memberId} a été supprimé du groupe avec succès.`);
    }
  } catch (err) {
    console.error("Erreur lors de la suppression du membre du groupe:", err);
  }
}


export async function addMessageToGroup(groupId, message) {
  try {
    const firestore = getFirestore(app); // Obtient une référence à la base de données Firestore
    // Accédez à la sous-collection 'messages' du groupe spécifié
    await addDoc(collection(firestore, "groups", groupId, "messages"), {
      ...message,
      createdAt: serverTimestamp(), // Timestamp serveur pour l'heure exacte de création
    });
    console.log("Message ajouté avec succès au groupe");
  } catch (error) {
    console.error("Erreur lors de l'ajout du message:", error);
  }
}


export function listenForMessages(groupId, setMessages) {
  const firestore = getFirestore(app);

  const messagesQuery = query(
    collection(firestore, "groups", groupId, "messages"),
    orderBy("createdAt", "asc"),
    limit(20)
  );

  const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messages);
  }, (error) => {
    console.error("Erreur lors de l'écoute des messages:", error);
  });

  return unsubscribe; // Retournez la fonction de désinscription pour arrêter l'écoute lorsque cela n'est plus nécessaire
}