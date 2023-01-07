import App from "$lib/auth.js";
import { collection, doc, setDoc,getDocs,where,query,getFirestore,getDoc} from "firebase/firestore";

const db = getFirestore(App)
let data = {};

export const load = async ({params}) =>{

	const querySnapshot = await getDocs(collection(db, "question"));
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		data[doc.id] = doc.data();
	});


	return{
		currentQuestions: data
	}


}