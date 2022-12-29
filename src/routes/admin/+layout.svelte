<script>
	import App from "$lib/auth";
	import {onMount} from "svelte"; //life cycle method, after all components load on the page do xyz
	import { getAuth, onAuthStateChanged  } from "firebase/auth";
	import { goto } from "$app/navigation" //allow us for redirect
	import { isLoggedIn } from '../../stores/authStore';

	import Header from "./Header.svelte";


	onMount(()=>{
		const auth = getAuth();
		onAuthStateChanged(auth,(user)=>{
			if(user){
				isLoggedIn.update(() => true)
			}
			else{
				isLoggedIn.update(() => false)
				goto("/admin/login")
			}
			console.log($isLoggedIn)
		})
	})


</script>


<Header/>
<slot></slot>





<style>
</style>

