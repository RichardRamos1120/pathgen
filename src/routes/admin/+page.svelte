<script>
import {goto} from '$app/navigation';
import { redirect } from '@sveltejs/kit';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

import { doc } from 'firebase/firestore';
import {isLoggedIn} from '../../stores/authStore';
import { afterUpdate, onMount } from 'svelte';

export let data;
let { currentQuestions } =  data;

console.log(currentQuestions)
function redirecTo(){
	window.location.replace("/admin/create-a-form");

}



afterUpdate(()=>{
	let formList = document.querySelector(".form-list");


	if(formList){
		for(const question in  currentQuestions){
			let currentHtml = "";
			let div = document.createElement("div");
			let currDate = currentQuestions[question]["updated_at"];
			currentHtml = `
			<div class='form-list-individual'>
				<div class='form-list-individual-status'>
					<a class='form-list-individual-title' href='/question/${question}' target="_blank">${currentQuestions[question].collection_title}</a>
					<small class='form-list-individual-date'>${timeAgo.format(new Date(currDate))}</small>
				</div>
				<div class='form-list-individual-state'>
					<span class='form-list-individual-state-${currentQuestions[question].isPublish?"published":"unpublished"}'>${currentQuestions[question].isPublish?"Published":"UNPUBLISHED"}</span>
					<span class='form-list-individual-state-delete'>
						<img src='/img/unpublish.svg' alt=''>
					</span>
				</div>
			</div>
		`
			div.innerHTML = currentHtml;
			formList.appendChild(div)
		}


	}


})

</script>


{#if $isLoggedIn === true}
<main class='main'>
	<div class='form-list' >

		<div class='form-list-individual--create' on:click={redirecTo}>
			<p class='form-list-individual-title'>+ Create a form</p>
		</div>


	</div>

</main>
{/if}

<style>

		:global(.form-list){
        display: flex;
				width: 100%;
				justify-content:left;
				align-items: center;
				gap: 24px;
				padding: 56px;
				flex-wrap: wrap;
				margin-top: 100px;

		}
    :global(.form-list-individual),	:global(.form-list-individual--create){
				display: flex;
				flex-direction: column;
        border-radius: 4px;
				width: 240px;
				height: 160px;


    }
    :global(.form-list-individual){
        background: #FFFFFF;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
        justify-content: space-between;
				align-items: center;
				padding: 16px;

    }
    :global(.form-list-individual--create){
				cursor: pointer;
        justify-content: center;
        align-items: center;
        border: 1px solid #CCCCCC;
		}
    :global(.form-list-individual-state){
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
		}
    :global(.form-list-individual-status){
				width: 100%;
		}
    :global(.form-list-individual-status .form-list-individual-title){
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;

        /* Black */

        color: #111111;
		}
    :global(.form-list-individual-title){
        cursor: pointer;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        /* identical to box height */

        display: flex;
        align-items: center;

        /* Secondary Black */

        color: #888888;

    }

    :global(.form-list-individual-date){

        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        color: #888888;
    }

    :global(.form-list-individual-state-unpublished),	:global(.form-list-individual-state-published){
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        text-align: center;

        /* Black */
        border-radius: 4px;
				padding: 8px 14px;
		}
    :global(.form-list-individual-state-unpublished){
        color: #111111;
        background: #F0F0F0;
		}
    :global(.form-list-individual-state-published){
        color: #FFFFFF;
        background: #111111;
		}
    :global(.form-list-individual-state-delete){
        cursor: pointer;
		}



</style>
