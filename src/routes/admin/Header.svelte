<script>
	import { redirect } from '@sveltejs/kit';
	import { initializeApp } from "firebase/app";
	import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";


	const auth = getAuth();

	export let publishState = "Unpublished";
	let users = "";
	let email = "";
	let password = "";
	let formVisible = true;
	let loginErr = "";

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			users = user.uid;
			// ...
		} else {

		}
	});


	function loginFunction( ) {
		if (email && password){
			signInWithEmailAndPassword(auth, email, password).then((res)=>{
				formVisible = !formVisible;
				loginErr = "";
				email = "";
				password = "";
			}).catch(()=>{
				loginErr = "Email or password is incorrect";
			})

		}

	}
	function logoutFunction() {
		signOut(auth)
		users = "";
		window.location.href = "/admin";
	}

	function ShowLogin(){
		formVisible = !formVisible;
	}

</script>

<header>
	<div>
		<img src='/img/arrow-left.svg' alt='arrow-left' class='arrow-left'>
		<h2 class='title'>CoolClub Application</h2>
		<small class='unpublished'>{publishState}</small>
	</div>
	<div>
		<a class="header-btn view-preview-btn" href='' on:click|preventDefault>View Preview</a>
		<a class="header-btn publish-btn" href='' on:click|preventDefault>Publish</a>

		{#if users}
		<p class='not-visible'>Admin</p>
		<a class="header-btn  logout-btn" on:click|preventDefault={logoutFunction}>Log out</a>
			{:else}
			<a class="header-btn  login-btn"  on:click|preventDefault={ShowLogin}>Log in</a>
		{/if}
	</div>
</header>

<div class='login-modal-dark formVisible ' on:click={ShowLogin}  class:formVisible={formVisible?"formVisible":""}>&nbsp;</div>
<form class='login-modal-form formVisible' on:submit|preventDefault={loginFunction}  class:formVisible={formVisible?"formVisible":""} >
	<input type='email' placeholder='Your email address' bind:value={email}>
	<input type='password' placeholder='Your password' bind:value={password}>
	<small class='loginError'>{loginErr}</small>
	<button type='submit'>Login</button>
</form>


<style>

		.formVisible{
				display: none !important;
		}
    .not-visible{
        display: none;
    }
		.visible{
				display: flex !important;
		}
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

				width: 500px;
				padding: 35px;
				z-index: 9999;
				background-color: #F0F0F0;
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
		.login-modal-dark{
				background-color: rgba(0, 0, 0, 0.3);
				position: absolute;
				width: 100vw;
				height: 100vh;
        z-index: 998;
		}


    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    *{
				box-sizing: border-box;
				padding: 0;
				margin: 0;
        font-family: 'Inter', sans-serif;
				text-decoration: none;
				user-select: none;
    }
		header{
				padding: 16px;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);

    }
		header,div{
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 16px;
		}
		.title{
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        /* Black */
        color: #111111;
		}
		.unpublished{
        /* UI Text (12) */
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        background: #F0F0F0;
        border-radius: 4px;
				padding: 8px;
        /* Black */

        color: #111111;
		}
		.header-btn{

        border: 1px solid #CCCCCC;
        border-radius: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;

        align-items: center;
        text-align: center;
				padding: 8px 16px;
        cursor: pointer;
    }

		.view-preview-btn{
				color: #111111;

		}
		.publish-btn{
        border: 1px solid #CCCCCC;
				color: #FFFFFF;
        background: #111111;
    }
		.arrow-left{
				cursor: pointer;
		}


</style>