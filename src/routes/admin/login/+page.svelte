<script>
	import { goto } from "$app/navigation";
	import {isLoggedIn } from '../../../stores/authStore';
	import {
		getAuth,
		signInWithEmailAndPassword} from "firebase/auth";

	const auth = getAuth();
	let loginErr = ""
	let email = "";
	let password = "";

	function login(){
		signInWithEmailAndPassword(auth,email,password)
		.then((userCredential)=>{
			const user = userCredential.user;
			localStorage.setItem("uid",user.uid);
			isLoggedIn.update(() => true);

			goto("/admin")
		}).catch(err=>{
			loginErr = "Invalid email or password"
		})
	}

</script>


<form class='login-modal-form' on:submit|preventDefault={login} >
	<input type='email' placeholder='Your email address' bind:value={email}>
	<input type='password' placeholder='Your password' bind:value={password}>
	<small class='loginError'>{loginErr}</small>
	<button type='submit'>Login</button>
</form>


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