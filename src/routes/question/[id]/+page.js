import App from "$lib/auth.js";
import { collection, doc, setDoc,getDocs,where,query,getFirestore,getDoc} from "firebase/firestore";

const db = getFirestore(App)


export const load = async ({params}) =>{
	console.log(params.id)
	const questionRef = doc(db,"question",`${params.id}`)
	const result = await getDoc(questionRef);

	return{
		currentQuestion:result.data()
	}



}