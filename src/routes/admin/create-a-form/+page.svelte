<script>
	import {onMount, onDestroy} from 'svelte';
	import App from "$lib/auth";
	import { collection, doc, setDoc, getFirestore, Timestamp} from "firebase/firestore";


	let editor = {}
	let editorCount = 0;


	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"]
	];



	//random id generator
	function makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}


	let num = 0;
	let q =  "q";
	let questCount;

	let questionTitle = "";
	let collectionTitle = "";
	let created_at;
	let updated_at;
	let qid = "";
	let questionQuery = []
	let currentUrl = ""
	let pathUrl = "";
	let pushAlready = false;
	let publishBtn;
	let firstQuestion = true;

	//publish the question to the database

	const db = getFirestore(App);
	const colRef = collection(db,"question");

	async function pushToDB(){

		//to make sure we are only pushing 1 date per publish to the db
		if(!pushAlready){


			//if inside pushDB

			//if there is any gen pdf do this
			questionQuery.push({
				title:"Thank you for your time",
				qid:"genPdf",
				answer:{"Generate PDF":"genPdf"},
				choice:["Generate PDF"],

			})

			let result = await setDoc(doc(colRef,currentUrl),{
				created_at:Date.now(),
				collection_title:questionTitle?questionTitle:"Default Title",
				isPublish:true,
				updated_at:Date.now(),
				question:questionQuery
			}).then(()=>{
				console.log(`push succesfully`)
				pushAlready = true;
				firstQuestion = true;
			})
			pushAlready = false;
			//after publish clear the questions box
			let questionBox = document.querySelectorAll(".question-box");
			questionBox.forEach(el=>el.remove())

			//after publish clear the questionQuery array to reset everything so that we can create new question again without page refresh
			//clear everything
			num = 0;
			q =  "q";
			questCount = 0;
			questionTitle = "";
			collectionTitle = "";
			created_at = 0;
			updated_at = 0;
			qid = "";
			questionQuery = []
			questionItem = [];

			//make the copy div visible
			let copyDiv = document.querySelector(".afterPublish-form");
			copyDiv.classList.remove("invisible");


			//if inside pushDB
		}


	}

	onMount(async ()=>{

			//close the element after milliseconds second after clicking the copy btn
			const closeTheDiv = (el,milliseconds)=>{
				setTimeout(()=>{
					console.log(el)
					el.classList.add("invisible");
				},milliseconds)
			}
			//click for publish button
			publishBtn = document.querySelector("#afterPublish-btn")
			publishBtn.addEventListener("click",(e)=>{
				let urlVal = document.querySelector(".afterPublish-input").value;

				//copy to clipboard the generated url, if succesful, display the copied message
				(async () =>{
					await navigator.clipboard.writeText(urlVal).then(()=>{
						let msgEL = document.querySelector(".afterPublish-message");
						msgEL.classList.remove("invisible");
						closeTheDiv(msgEL,500)
						closeTheDiv(publishBtn.parentElement.parentElement,1000)

					});
				})()
			})

		// const db = getFirestore(App);
		// const colRef = collection(db,"question");

			//Push to DB
			async function pushToDB(){

				//to make sure we are only pushing 1 date per publish to the db
				if(!pushAlready){


					//if inside pushDB

					//if there is any gen pdf do this
					questionQuery.push({
						title:"Thank you for your time",
						qid:"genPdf",
						answer:{"Generate PDF":"genPdf"},
						choice:["Generate PDF"],

					})

					let result = await setDoc(doc(colRef,currentUrl),{
						created_at:Date.now(),
						collection_title:questionTitle?questionTitle:"Default Title",
						isPublish:true,
						updated_at:Date.now(),
						question:questionQuery
					}).then(()=>{
						console.log(`push succesfully`)
						pushAlready = true;
						firstQuestion = true;
					})
					pushAlready = false;
					//after publish clear the questions box
					let questionBox = document.querySelectorAll(".question-box");
					questionBox.forEach(el=>el.remove())

					//after publish clear the questionQuery array to reset everything so that we can create new question again without page refresh
					//clear everything
					num = 0;
					q =  "q";
					questCount = 0;
					questionTitle = "";
					collectionTitle = "";
					created_at = 0;
					updated_at = 0;
					qid = "";
					questionQuery = []
					questionItem = [];

					//make the copy div visible
					let copyDiv = document.querySelector(".afterPublish-form");
					copyDiv.classList.remove("invisible");


					//if inside pushDB
				}


			}

		document.querySelector(".publish-btn").addEventListener(("click"),(e)=>{
			currentUrl = makeid(20);
			let allQuestion = document.querySelectorAll(".question-box");


			allQuestion.forEach(divEl=>{
				let choiceArr = [];
				let answerObj = {};
				let answerInputPlaceValue = "";
				let answerInput = divEl.querySelector('.question-input')
				let answerInputActive = false;
				let textareaInput = divEl.querySelector(".question-textarea");
				let answerTextareaActive = false;
				let editorWrapper = divEl.querySelector('.editor-wrapper');
				let htmlCode = ``;

				//for short question
				if(answerInput){
					answerInputActive = true;
					answerInputPlaceValue = answerInput.value;
				}
				//for long question
				if(textareaInput){
					answerTextareaActive = true;
					answerInputPlaceValue = textareaInput.value;
				}

				//for editor wrapper i.e the info question
				if(editorWrapper){
					htmlCode = "<div class='question-info-box'>"
					htmlCode += editorWrapper.querySelector(".ql-editor").innerHTML;
					htmlCode += "</div>";

				}



				let choices = divEl.querySelectorAll(".question-branch-option--value");

				choices.forEach(choice=>{
					choiceArr.push(choice.innerText)
				})

				let branchAnswer = divEl.querySelectorAll(".branch-choice");
				branchAnswer.forEach(answ=>{
					let selectedVal = answ.parentElement.querySelector(".branch-select")
					selectedVal = selectedVal.options[selectedVal.selectedIndex].value;

					answerObj[`${answ.getAttribute("data-value")}`] = selectedVal;
				})


				questionQuery.push({
					title: divEl.querySelector(".question-box-title--primary__text").value,
					qid:divEl.getAttribute("data-qid"),
					choice:choiceArr,
					answer:answerObj,
					answerInputPlaceValue,
					answerInputActive,
					html:htmlCode,
					answerTextareaActive,
					firstQ:firstQuestion
				})
				firstQuestion = false;

			})
			// console.log(questionQuery,"Successfully Publish")
			pathUrl = window.location.href
			pathUrl = pathUrl.replace("/admin/create-a-form",`/question/${currentUrl}`)
			pushToDB();
		})

	})
	onDestroy(()=>{
		publishBtn;
		questionItem = [];
		getFirestore(App);
		collection(db,"question");
		generateQuestion
		pushToDB
		console.log("destroyed")

	})



	const generateQuestion = async (e,choice) =>{
		document.querySelector(".modal-backdrop").style.height = `${document.documentElement.scrollHeight +1000}px`;

		let mainForm = document.querySelector(".main-form");
		num++;
		qid = q+num;

		let questCount = q+num;
		if(choice === "short"){
			questionItem.push(qid);
			let questionBox = document.createElement("div");
			questionBox.classList.add("question-box","question-box-margin-top");
			questionBox.dataset.qid = qid;
			questionBox.innerHTML = `
				<button class='closeBtn' onclick='closeQuestionBox(this)'>X</button>
				<h2 class='question-box-title'><span class='question-box-title--primary'><span class='small-text-question'>q${num}</span> <input class='question-box-title--primary__text' value="" type='text' placeholder="Question title"/></h2>
				<div class='question-input-box'>
					<div class='question-input-box-btn'>
					<button class='question-input-box-btn-t'><img src='/img/t-btn.svg' alt=''></button>
							<button class='question-input-box-btn-menu' onclick='openBranchModal(this)'><img src='/img/menu.svg' alt=''></button>
							<div class='branch-modal'>
								<h4 class='branch-title'>Branch</h4>
								<div class='branch-choice-box'>
								<div class='branch-form'>
								<h4 class='branch-choice'>No, go to:</h4>
								<select class='branch-select' id=''>

								</select>
								</div>
								<div class='branch-form'>
								<h4 class='branch-choice'>Yes, go to:</h4>
								<select class='branch-select' id=''>

								</select>
								</div>
							</div>
							<div class='branch-button-bottom'>
							<button class='branch-good' onclick='closeBranch(this)'>Looks Good!</button>
							<button class='branch-cancel' onclick='closeBranch(this)'>Cancel</button>
							</div>
							</div>
							</div>
					<input type='text' placeholder='Click to add placeholder text' class='question-input' id='input-data-answer-${qid}' class='input-data-answer' value=''>
				</div>
				<div class='option_choice'>
				<button class='question-branch-btn question-branch-option question-branch-option-next'>Next</button>
				</div>
			 `
			mainForm.insertBefore(questionBox,mainForm.lastChild)

		}
		else if(choice === "multi"){
			questionItem.push(qid);
			let questionBox = document.createElement("div");
			questionBox.classList.add("question-box","question-box-margin-top");
			questionBox.dataset.qid = qid;
			questionBox.innerHTML = `
						<button class='closeBtn' onclick='closeQuestionBox(this)'>X</button>
						<h2 class='question-box-title'><span class='question-box-title--primary'><span class='small-text-question'>q${num}</span> <input class='question-box-title--primary__text' value='' type='text' placeholder="Question title"/></h2>
						<div class='question-input-box'>
						<div class='question-input-box-btn'>
							<button class='question-input-box-btn-t'><img src='/img/t-btn.svg' alt=''></button>
							<button class='question-input-box-btn-menu' onclick='openBranchModal(this)'><img src='/img/menu.svg' alt=''></button>
							<div class='branch-modal'>
								<h4 class='branch-title'>Branch</h4>

								<div class='branch-choice-box' id='branch-choice-box-${qid}'>
									<div class='branch-form'>
										<h4 class='branch-choice'>No, go to:</h4>
										<select class='branch-select' id=''>

										</select>
									</div>

							</div>
							<div class='branch-button-bottom'>
							<button class='branch-good' onclick='closeBranch(this)'>Looks Good!</button>
							<button class='branch-cancel' onclick='closeBranch(this)'>Cancel</button>
							</div>
							</div>
						</div>
						<div class='option_choice'>
							<button class='question-branch-btn question-branch-add' onclick="addChoice(this)">Add Option</button>
						</div>
					</div>
			`
			mainForm.insertBefore(questionBox,mainForm.lastChild)
		}
		else if(choice === "info"){
			await (async function() {
				const { default: Quill } = await import("quill");
				let infoCount = `info${editorCount}`;

				editor[infoCount] = infoCount;
				console.log(editor[infoCount])

				editorCount++;
				// reference for info count
				questionItem.push(qid);
				let questionBox = document.createElement("div");
				questionBox.classList.add("question-box", "question-box-margin-top", "question-info-box");
				questionBox.dataset.qid = qid;

				questionBox.innerHTML = `
						<button class='closeBtn' onclick='closeQuestionBox(this)'>X</button>
						<h2 class='question-box-title'><span class='question-box-title--primary'><span class='small-text-question'>q${num}</span> <input class='question-box-title--primary__text' value='' type='text' placeholder="Question title"/></h2>
						<div class="editor-wrapper"><div id='${editor[infoCount]}' /></div></div>
						<br>
						<div class='question-input-box'>
						<div class='question-input-box-btn'>
							<button class='question-input-box-btn-t'><img src='/img/t-btn.svg' alt=''></button>
							<button class='question-input-box-btn-menu' onclick='openBranchModal(this)'><img src='/img/menu.svg' alt=''></button>
							<div class='branch-modal'>
								<h4 class='branch-title'>Branch</h4>

								<div class='branch-choice-box' id='branch-choice-box-${qid}'>
									<div class='branch-form'>
										<h4 class='branch-choice'>No, go to:</h4>
										<select class='branch-select' id=''>

										</select>
									</div>
									<div class='branch-form'>
										<h4 class='branch-choice'>Yes, go to:</h4>
										<select class='branch-select' id=''>

										</select>
									</div>
							</div>
							<div class='branch-button-bottom'>
							<button class='branch-good' onclick='closeBranch(this)'>Looks Good!</button>
							<button class='branch-cancel' onclick='closeBranch(this)'>Cancel</button>
							</div>
							</div>
						</div>
						<div class='option_choice'>
							<button class='question-branch-btn question-branch-add' onclick="addChoice(this)">Add Option</button>
						</div>
					</div>
			`


				mainForm.insertBefore(questionBox, mainForm.lastChild)

				let quill = new Quill(`#${editor[infoCount]}`, {
					modules: {
						toolbar: toolbarOptions
					},
					theme: "snow",
					placeholder: "Write your story..."
				});



			})();

		}
		if(choice === "long"){
			questionItem.push(qid);
			let questionBox = document.createElement("div");
			questionBox.classList.add("question-box","question-box-margin-top");
			questionBox.dataset.qid = qid;
			questionBox.innerHTML = `
				<button class='closeBtn' onclick='closeQuestionBox(this)'>X</button>
				<h2 class='question-box-title'><span class='question-box-title--primary'><span class='small-text-question'>q${num}</span> <input class='question-box-title--primary__text' value="" type='text' placeholder="Question title"/></h2>
				<div class='question-input-box'>
					<div class='question-input-box-btn'>
					<button class='question-input-box-btn-t'><img src='/img/t-btn.svg' alt=''></button>
							<button class='question-input-box-btn-menu' onclick='openBranchModal(this)'><img src='/img/menu.svg' alt=''></button>
							<div class='branch-modal'>
								<h4 class='branch-title'>Branch</h4>
								<div class='branch-choice-box'>
								<div class='branch-form'>
								<h4 class='branch-choice'>No, go to:</h4>
								<select class='branch-select' id=''>

								</select>
								</div>
								<div class='branch-form'>
								<h4 class='branch-choice'>Yes, go to:</h4>
								<select class='branch-select' id=''>

								</select>
								</div>
							</div>
							<div class='branch-button-bottom'>
							<button class='branch-good' onclick='closeBranch(this)'>Looks Good!</button>
							<button class='branch-cancel' onclick='closeBranch(this)'>Cancel</button>
							</div>
							</div>
							</div>
					<textarea placeholder='Click to add placeholder text' class='question-textarea question-input' id='input-data-answer-${qid}' class='input-data-answer' value=''></textarea>
				</div>
				<div class='option_choice'>
				<button class='question-branch-btn question-branch-option question-branch-option-next'>Next</button>
				</div>
			 `;
			mainForm.insertBefore(questionBox,mainForm.lastChild)

		}


		window.scrollTo(0, document.body.scrollHeight);

	}







</script>
<main class='main'>

	<div class='main-form'>
		<!--Question Response box-->
		<div class='ques-res-box'>
			<button class='question-selected question-btn'>Questions</button>
			<button class='response-btn'>Responses</button>
			<div>
				<input type='text' placeholder='Question title here' id='question-title-here' bind:value={questionTitle}>
			</div>
		</div>

		<!--End Question Response box-->

		<div></div>
	</div>

	<div class='afterPublish'>
		<div class='afterPublish-form invisible'>
			<h4 class='afterPublish-title'>Published successfully.</h4>
			<small class='afterPublish-small'>Direct URL</small>
			<div class='afterPublish-input-container'>
				<input type='text' class='afterPublish-input' bind:value={pathUrl}>
				<button class='afterPublish-btn' id='afterPublish-btn'>Copy</button>
			</div>
		</div>
		<span class='afterPublish-message invisible'>Copied to clipboard.</span>
	</div>

</main>

<footer>
	<div class='add-new-question-box'>
	<h2 class='add-new-question-box-title'>Add New Question</h2>
	<div class='add-new-question-box-btns'>
		<button class='add-new-question-btn short-btn' on:click|preventDefault={(e)=>generateQuestion(e,"short")}><img src='/img/short-btn.svg' alt=''>Short</button>
		<button class='add-new-question-btn long-btn' on:click|preventDefault={(e)=>generateQuestion(e,"long")}><img src='/img/long-btn.svg' alt=''>Long</button>
		<button class='add-new-question-btn info-btn' on:click|preventDefault={(e)=>generateQuestion(e,"info")}><img src='/img/info-btn.svg' alt=''>Info</button>
		<button class='add-new-question-btn multi-btn' on:click|preventDefault={(e)=>generateQuestion(e,"multi")}><img src='/img/multi-btn.svg' alt=''>Multi</button>
	</div>
</div>
</footer>

<style>
    @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

    :global(.invisible){
				display: none !important;

		}
		footer{
				background-color: #fff;
				width: 100vw;
				height: 200px;
				position: relative;
				bottom:0;

		}
		#question-title-here{
				margin-top: 20px;
        width: 100%;
        background: rgba(240, 240, 240, 0.41);
        border-radius: 4px;
        padding: 9px 8px;
        font-style: normal;
        color: #888888;
        font-weight: 700;
        font-size: 16px;
        line-height: 29px;
		}
		.add-new-question-box{
				margin-top: 0;
		}
		:global(.afterPublish-small){
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
				margin-bottom: -8px;
        /* identical to box height */


        color: #000000;

    }
		:global(.afterPublish){
        position: absolute;
				right: 20px;
				top: 100px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: baseline;

				gap: 16px;

		}
		:global(.afterPublish-form){
        background: #FFFFFF;
				width: 265px;
				display: flex;
				gap: 16px;
				flex-direction: column;
				justify-content: center;
				align-items: baseline;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
				padding: 16px;

		}
    :global(.afterPublish-input-container){
				display: block;
    }
    :global(.afterPublish-input){
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
				padding-left: 8px;
				display: inline-block;
				margin-right: 8px;
        /* identical to box height */
				background-color: #F0F0F0;
				border-radius: 4px;
				height: 24px;
        color: #111111;

    }
    :global(.afterPublish-btn){
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        display: inline-block;

        color: #111111;
    }

    :global(.afterPublish-message){
        transition: all .5s linear;
        background: #FFFFFF;
        /* Card Shadow */
        width: 265px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        /* identical to box height */
				height: 54px;
				display: flex;
				align-items: center;
				justify-content: center;
        color: #000000;

        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
		}
		:global(.question-branch-option-next){
				display: block;
				transform: translateX(22px);
		}
		:global(.branch-backdrop){
				width: 100vw;
				height: 100vh;
				background-color: #000;
		}
    :global(.branch-button-bottom){
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				gap: 4px;
    }
    :global(.branch-cancel){

        /* Tertiary Black */
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        text-align: center;
				justify-content: center;
        width:96px;
        height: 24px;
        /* Black */

        color: #111111;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
    }
		:global(.branch-good){

        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        display: flex;
				width:96px;
				height: 24px;
				justify-content: center;
        align-items: center;
        text-align: center;
        background: #111111;
        border-radius: 4px;
        /* White */


        color: #FFFFFF;
		}
		:global(.branch-modal){
				z-index: 999999;
				display: none;
				flex-direction: column;
        width: 114px;
				padding: 9px 0;
				transform: translate(-100%,53%);
        position: absolute;
				gap: 4px;
        background: #FFFFFF !important;
        /* Card Shadow */
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
		}
		:global(.branch-modal >*){
				padding-left: 8px;
				padding-right: 8px;

		}
		:global(.branch-choice-box){
				padding-left: 0;
				padding-right: 0;
		}
    :global(.branch-title){
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        /* identical to box height */
        /* Black */
        color: #111111
		}
		:global(.branch-form){
				width: 100%;
		}
		:global(select){
				width: 100%;
        /* Tertiary Black */
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        display: flex;
        align-items: center;

        color: #000000;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
		}
		:global(.branch-choice){
				padding-top: 8px;
				padding-bottom: 8px;
				padding-left: 8px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
				color: #ffffff;
        /* identical to box height */
				background-color: #808080;
		}

		:global(.question-branch-option--value){
				cursor: text !important;
		}
		:global(.option_choice){
				display: flex;
				flex-wrap: wrap;
				gap: 10px;
				justify-content: left;
				align-items: center;

		}
    :global(footer){
				width: 100vw;
				height: 10vh;
				margin-top: 5rem;
		}
    :global(button){
        cursor: pointer;
    }
    :global(main){
        display: flex;
        align-items: center;
        justify-content: center;

    }
    :global(.add-new-question-box){
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin-top: 64px;
        gap: 16px;

    }
    :global(.add-new-question-box-btns){
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;

    }
    :global(.add-new-question-btn){
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
    :global(.add-new-question-box-title){
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #111111;
    }
    :global(.main-form){

        margin-top: 156px;
        width:444px;
        position: relative;
    }
    :global(.ques-res-box){
        margin-left: 8px;
				margin-bottom: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;

    }
    :global(.response-btn),:global(.question-btn){
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
    :global(.question-selected){
        /* Black */
        color: #111111;
        background: #F0F0F0;
    }
    :global(.small-text-question){
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: right;
        color: #888888;
        transform: rotate(-0.01deg);
    }
    :global(.question-box-title--secondary){
        color: #CF5D5D;
    }
    :global(.question-box-title--primary),:global(.question-box-title--primary__text),:global(.question-box-title--primary__textarea){
        color: #111111;
    }
    :global(.question-box-title--primary),:global(.question-box-title--secondary),:global(.question-box-title--primary__text),:global(.question-box-title--primary__question-box-title--primary__textarea){
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
    }
    :global(.question-box){
        box-shadow: 0 2px 10px rgba(0,0,0,.2);
				padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: center;
        gap: 8px;

    }
    :global(.question-input-box){
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        width: 100%;
        gap:8px;

    }
    :global(.question-input-box-btn){
        position: relative;
        display: flex;
        align-items: baseline;
        justify-content: center;
        flex-direction: column;
        gap: 9.5px;
    }
    :global(.question-input){

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
    :global(.question-box-margin-top){
        margin-top: 24px;
    }
    :global(.small-text-question){
        margin-right: 8px;
				font-weight: 700;
    }
    :global(.question-branch-btn){
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
    :global(.question-branch-add){
        padding:11px;
    }

		:global(.question-box-title--primary__textarea){
				display: block;
				width: 424px !important;
				margin-left: 20px;
				padding: 8px;
				height: 150px;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
				background-color: #F0F0F0;
		}
		:global(.closeBtn){
				font-weight: 700;
				color: #888888;
				font-size: 20px;
				cursor: pointer;
		}


</style>