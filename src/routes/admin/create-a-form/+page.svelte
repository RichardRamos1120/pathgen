<script>


</script>

<main class='main'>
	<div class='main-form'>
		<div class='ques-res-box'>
			<button class='question-selected question-btn'>Questions</button>
			<button class='response-btn'>Responses</button>
		</div>
		<div class='question-box'>
			<h2 class='question-box-title'>
				<span class='question-box-title--primary'><span class='small-text-question'>1</span>What's your name?</span><span class='question-box-title--secondary'>*</span>
			</h2>
			<div class='question-input-box'>
				<div class='question-input-box-btn'>
					<button class='question-input-box-btn-t'><img src='/img/t-btn.svg' alt=''></button>
					<button class='question-input-box-btn-menu'><img src='/img/menu.svg' alt=''></button>
				</div>
				<input type='text' placeholder='Click to add placeholder text' class='question-input'>
			</div>
		</div>
		<div class='question-box question-box-margin-top'>
			<h2 class='question-box-title'>
				<span class='question-box-title--primary'><span class='small-text-question'>2</span>Tell us about yourself</span>
			</h2>
			<div class='question-input-box'>
				<div class='question-input-box-btn'>
					<button class='question-input-box-btn-t'><img src='/img/t-btn.svg' alt=''></button>
					<button class='question-input-box-btn-menu'><img src='/img/menu.svg' alt=''></button>
				</div>
				<input type='text' placeholder='Click to add placeholder text' class='question-input'>
			</div>
		</div>
		<div class='question-box question-box-margin-top'>
			<h2 class='question-box-title'>
				<span class='question-box-title--primary'><span class='small-text-question'>3</span>Lorem ipsum dolor sit amet.</span>
			</h2>
			<div class='question-input-box'>
				<div class='question-input-box-btn'>
					<button class='question-input-box-btn-t'><img src='/img/t-btn.svg' alt=''></button>
					<button class='question-input-box-btn-menu'><img src='/img/menu.svg' alt=''></button>
				</div>
				<button class='question-branch-btn question-branch-option'>Okay <img src='/img/close-btn.svg' alt=''></button>
				<button class='question-branch-btn question-branch-option'>No <img src='/img/close-btn.svg' alt=''></button>
				<button class='question-branch-btn question-branch-add'>Add Option</button>
			</div>
		</div>
		<div class='add-new-question-box'>
			<h2 class='add-new-question-box-title'>Add New Question</h2>
			<div class='add-new-question-box-btns'>
				<button class='add-new-question-btn short-btn'><img src='/img/short-btn.svg' alt=''>Short</button>
				<button class='add-new-question-btn long-btn'><img src='/img/long-btn.svg' alt=''>Long</button>
				<button class='add-new-question-btn info-btn'><img src='/img/info-btn.svg' alt=''>Info</button>
				<button class='add-new-question-btn multi-btn'><img src='/img/multi-btn.svg' alt=''>Multi</button>
			</div>
		</div>
	</div>
</main>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    *{
        background-color: transparent;
        outline: none;
        border: none;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        user-select: none;
        font-family: 'Inter', sans-serif;

    }
    button{
        cursor: pointer;
    }
    main{
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .add-new-question-box{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin-top: 64px;
        gap: 16px;

    }
    .add-new-question-box-btns{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;

    }
    .add-new-question-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 22px 36px;
        gap: 12px;
        border: 0.990099px solid #CCCCCC;
        border-radius: 3.9604px;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #111111;

    }
    .add-new-question-box-title{
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #111111;
    }
    .main-form{

        margin-top: 56px;
        width:444px;
        position: relative;
    }
    .ques-res-box{
        margin-left: 8px;
        margin-bottom: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;

    }
    .response-btn,.question-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border:none;
        outline: none;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        background-color: transparent;
        padding: 8px 16px;

        color: #888888;

        border-radius: 4px;
    }
    .question-selected{
        /* Black */
        color: #111111;
        background: #F0F0F0;
    }
    .small-text-question{
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: right;
        color: #888888;
        transform: rotate(-0.01deg);
    }
    .question-box-title--secondary{
        color: #CF5D5D;
    }
    .question-box-title--primary{
        color: #111111;
    }
    .question-box-title--primary,.question-box-title--secondary{
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        transform: rotate(-0.01deg);
    }
    .question-box{
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: center;
        gap: 8px;
    }
    .question-input-box{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        width: 100%;
        gap:8px;

    }
    .question-input-box-btn{
        display: flex;
        align-items: baseline;
        justify-content: center;
        flex-direction: column;
        gap: 9.5px;
    }
    .question-input{

        width: 100%;
        background: #F0F0F0;
        border-radius: 4px;

        padding: 9px 8px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #888888;
    }
    .question-box-margin-top{
        margin-top: 24px;
    }
    .small-text-question{
        margin-right: 8px;
    }
    .question-branch-btn{
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 9px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #111111;
        padding: 8px;
    }
    .question-branch-add{
        padding-left: 34px;
    }


</style>