<header>
	<div>
		<img src='/img/arrow-left.svg' alt='arrow-left' class='arrow-left'>
		<h2 class='title'>CoolClub Application</h2>
		<small class='unpublished'>Unpublished</small>
	</div>
	<div>
		<a class="header-btn view-preview-btn" href='' on:click|preventDefault>View Preview</a>
		<a class="header-btn publish-btn" href='' on:click|preventDefault>Publish</a>
	</div>
</header>


<style>
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
        display: flex;
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