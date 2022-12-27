<script>


	import "$lib/auth.svelte";

	import Header from "./Header.svelte";

	import "$lib/auth.js";
	import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

	const auth = getAuth();

	let users = "";
	let email = "";
	let password = "";
	let formVisible = true;
	let loginErr = "";

	function loginFunction( ) {
		if (email && password) {
			signInWithEmailAndPassword(auth, email, password).then((res) => {
				formVisible = !formVisible;
				loginErr = "";
				email = "";
				password = "";
			}).catch(() => {
				loginErr = "Email or password is incorrect";
			})

		}
	}

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			users = user.uid;
			console.log(users)
			// ...
		}
	});




</script>


<Header/>

{#if users}
<slot></slot>
{:else}
	<form class='login-modal-form' on:submit|preventDefault={loginFunction} >
		<input type='email' placeholder='Your email address' bind:value={email}>
		<input type='password' placeholder='Your password' bind:value={password}>
		<small class='loginError'>{loginErr}</small>
		<button type='submit'>Login</button>
	</form>
{/if}



<style>
    .loginError{
        color: #CF5D5D;
    }

    .login-modal-form{
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        gap: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
        width: 500px;
        padding: 35px;

        background-color: transparent;
				box-shadow: 0 2px 5px rgba(0,0,0,.2);
    }
    .login-modal-form >*{
        width: 100%;
        height: 30px;
        display: block;
        padding: 8px 14px;
        outline: none;
        border: none;
        background-color: transparent;

        font-size: 20px;
    }
    .login-modal-form input{
        border-bottom: 1px solid black;
    }
    .login-modal-form button{
        background-color:#2386FD;
        color: #F0F0F0;
        font-weight: 700;
        cursor: pointer;
        height: 50px;

    }
</style>

