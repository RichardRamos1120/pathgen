<script>
import {goto} from '$app/navigation';
import {isLoggedIn} from '../../stores/authStore';
</script>


{#if $isLoggedIn === true}
<main class='main'>
	<div class='form-list' >

		<div class='form-list-individual--create' on:click={()=>goto("/admin/create-a-form")}>
			<p class='form-list-individual-title'>+ Create a form</p>
		</div>

		<div class='form-list-individual'>
			<div class='form-list-individual-status'>
				<p class='form-list-individual-title'>CoolClub Application</p>
				<small class='form-list-individual-date'>Updated 2 days ago</small>
			</div>
			<div class='form-list-individual-state'>
				<span class='form-list-individual-state-unpublished'>UNPUBLISHED</span>
				<span class='form-list-individual-state-delete'>
					<img src='/img/unpublish.svg' alt=''>
				</span>
			</div>
		</div>

		<div class='form-list-individual'>
			<div class='form-list-individual-status'>
				<p class='form-list-individual-title'>Hackathon UX Research</p>
				<small class='form-list-individual-date'>Updated a week ago</small>
			</div>
			<div class='form-list-individual-state'>
				<span class='form-list-individual-state-published'>PUBLISHED</span>
				<span class='form-list-individual-state-delete'>
					<img src='/img/publish.svg' alt=''>
				</span>
			</div>
		</div>

		<div class='form-list-individual'>
			<div class='form-list-individual-status'>
				<p class='form-list-individual-title'>CoolClub Application</p>
				<small class='form-list-individual-date'>Updated 2 days ago</small>
			</div>
			<div class='form-list-individual-state'>
				<span class='form-list-individual-state-unpublished'>UNPUBLISHED</span>
				<span class='form-list-individual-state-delete'>
					<img src='/img/unpublish.svg' alt=''>
				</span>
			</div>
		</div>

		<div class='form-list-individual'>
			<div class='form-list-individual-status'>
				<p class='form-list-individual-title'>Hackathon UX Research</p>
				<small class='form-list-individual-date'>Updated a week ago</small>
			</div>
			<div class='form-list-individual-state'>
				<span class='form-list-individual-state-published'>PUBLISHED</span>
				<span class='form-list-individual-state-delete'>
					<img src='/img/publish.svg' alt=''>
				</span>
			</div>
		</div>

		<div class='form-list-individual'>
			<div class='form-list-individual-status'>
				<p class='form-list-individual-title'>CoolClub Application</p>
				<small class='form-list-individual-date'>Updated 2 days ago</small>
			</div>
			<div class='form-list-individual-state'>
				<span class='form-list-individual-state-unpublished'>UNPUBLISHED</span>
				<span class='form-list-individual-state-delete'>
					<img src='/img/unpublish.svg' alt=''>
				</span>
			</div>
		</div>

		<div class='form-list-individual'>
			<div class='form-list-individual-status'>
				<p class='form-list-individual-title'>Hackathon UX Research</p>
				<small class='form-list-individual-date'>Updated a week ago</small>
			</div>
			<div class='form-list-individual-state'>
				<span class='form-list-individual-state-published'>PUBLISHED</span>
				<span class='form-list-individual-state-delete'>
					<img src='/img/publish.svg' alt=''>
				</span>
			</div>
		</div>

		<div class='form-list-individual'>
			<div class='form-list-individual-status'>
				<p class='form-list-individual-title'>Hackathon UX Research</p>
				<small class='form-list-individual-date'>Updated a week ago</small>
			</div>
			<div class='form-list-individual-state'>
				<span class='form-list-individual-state-published'>PUBLISHED</span>
				<span class='form-list-individual-state-delete'>
					<img src='/img/publish.svg' alt=''>
				</span>
			</div>
		</div>

	</div>

</main>
{/if}

<style>

		.form-list{
        display: flex;
				width: 100%;
				justify-content:left;
				align-items: center;
				gap: 24px;
				padding: 56px;
				flex-wrap: wrap;

		}
		.form-list-individual,.form-list-individual--create{
				display: flex;
				flex-direction: column;
        border-radius: 4px;
				width: 240px;
				height: 160px;


    }
		.form-list-individual{
        background: #FFFFFF;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
        justify-content: space-between;
				align-items: center;
				padding: 16px;

    }
		.form-list-individual--create{
				cursor: pointer;
        justify-content: center;
        align-items: center;
        border: 1px solid #CCCCCC;
		}
		.form-list-individual-state{
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
		}
		.form-list-individual-status{
				width: 100%;
		}
		.form-list-individual-status .form-list-individual-title{
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;

        /* Black */

        color: #111111;
		}
		.form-list-individual-title{
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

    .form-list-individual-date{

        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        color: #888888;
    }

		.form-list-individual-state-unpublished,.form-list-individual-state-published{
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
		.form-list-individual-state-unpublished{
        color: #111111;
        background: #F0F0F0;
		}
    .form-list-individual-state-published{
        color: #FFFFFF;
        background: #111111;
		}
		.form-list-individual-state-delete{
        cursor: pointer;
		}



</style>
