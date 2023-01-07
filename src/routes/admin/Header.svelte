<script>
	import { goto  } from "$app/navigation";
/*	import {page} from "$app/stores"*/
	import { getAuth,signOut} from "firebase/auth";
	import { isLoggedIn } from '../../stores/authStore';


	const auth = getAuth();
	function logout() {
		signOut(auth)
		localStorage.removeItem("uid");
		isLoggedIn.update(() => false);
		goto("/admin/login");

	}



</script>

{#if $isLoggedIn === true}
<header>
	<div>
		<img src='/img/arrow-left.svg' alt='arrow-left' class='arrow-left'>
		<h2 class='title' on:click={()=>goto("/admin")}>Question List</h2>
		<small class='unpublished'>Unpublished</small>
	</div>
	<div>
		<a class="header-btn view-preview-btn" href='' on:click|preventDefault>View Preview</a>
		<a class="header-btn publish-btn" href='' on:click|preventDefault>Publish</a>

		{#if $isLoggedIn === true}
		<p>Admin</p>
		<a class="header-btn  logout-btn" on:click|preventDefault={logout}>Log out</a>
		{:else}
			<a class="header-btn  login-btn"  href='/admin/login'>Log in</a>
		{/if}
	</div>
</header>
{/if}

<style>
		
		.title{
        cursor: pointer;
		}

		header{
				z-index: 99999;
				top: 0;
				position: fixed;
				background-color:#fff;
				width: 100vw;
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
				width: 24px;
				height: 24px;
		}


</style>