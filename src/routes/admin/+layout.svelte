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


<div class='modal-backdrop'>&nbsp;</div>
<Header/>
<slot></slot>






<style>
	.modal-backdrop{
			display: none;
			z-index: 999999;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(35, 32, 32, 0.24);

	}
</style>

