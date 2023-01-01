<script>
	import "./style.css";
	import { doc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import jsPDF from 'jspdf';
	export let data;


	let htmlDoc = "";
	let questions = {}
	let titleArrCheck = []

	let isAccess = false;
	let pushItOneTimeBeforeChecking = true;

	//if the user loop the question back
	function checkIfUserAnsweredAlready(questionTitle,answer){


		// let currQuestitle = "";
		// let currAnsw = ""

		// if(pushItOneTimeBeforeChecking){
		// 	questions.push([questionTitle,answer])
		// 	pushItOneTimeBeforeChecking = false;
		// 	titleArrCheck.push(questionTitle);
		// }

		// let arrCheck = titleArrCheck.filter((val)=> val === questionTitle);
		// if(arrCheck.length === 0){
		// 	titleArrCheck.push(questionTitle);
		// 	questions[questionTitle] = answer
		// }

		questions[questionTitle] = answer
		console.log(questions)




	}
	function gotoNextQuestion(e,questionTitle,id){

		// console.log(`currEl`,e)

		let CurrentTitle = `${questionTitle}`;
		let SelectedChoice = `Answer: ${e.srcElement.innerText}`;

		//clear all the spaces to properly format the pdf
		CurrentTitle = CurrentTitle.replace(/\s+/g, '&nbsp;');
		SelectedChoice = SelectedChoice.replace(/\s+/g, '&nbsp;');


		// let SelectedChoiceElement = document.querySelector(`#${id} .question-title`).innerText
		// console.log(SelectedChoiceElement)

		//store the value as long as you are not pressing the generate pdf button
		// console.log("current element parent ",e.srcElement)
		if(e.srcElement.innerText !== "Generate PDF" && e.srcElement.innerText !== "Next"){
			//run this only if it is already run 1 time
			// if(pushItOneTimeBeforeChecking){
			// 	questions.push([CurrentTitle,SelectedChoice])
			// 	pushItOneTimeBeforeChecking = false;
			//
			//
			// }else{
			// //else do the checking if the user decided to loop the question to not have multiple copies of the same question
			// 	checkIfUserAnsweredAlready(CurrentTitle,SelectedChoice)
			//
			// }
			checkIfUserAnsweredAlready(CurrentTitle,SelectedChoice)


			isAccess = true;
		}
		//if press the next button copy instead the input from the user value
		//access this if the previous if statement is not yet triggered, meaning this if
		//only targets the question form Next Button that is originally "short form"
		//not not multi
		if(e.srcElement.innerText === "Next"){
			if(e.srcElement.innerText === "Next" && !isAccess){

				if(e.srcElement.parentElement.parentElement.classList[0] !== "question-form")	{
					let currentUserInputVal = `Answer: ${e.srcElement.parentElement[0].value}`;
					console.log(`current user input: `,currentUserInputVal)
					//remove any space and change to html entity space the &nbsp; for proper pdf format
					currentUserInputVal = currentUserInputVal.replace(/\s+/g, '&nbsp;');

					// if(pushItOneTimeBeforeChecking){
					// 	questions.push([CurrentTitle,SelectedChoice])
					// 	pushItOneTimeBeforeChecking = false;
					//
					//
					// }else{
					// 	//else do the checking if the user decided to loop the question to not have multiple copies of the same question
					// 	checkIfUserAnsweredAlready(CurrentTitle,SelectedChoice)
					//
					// }
					checkIfUserAnsweredAlready(CurrentTitle,SelectedChoice)

				}
				else{

					let CurrentTitle = `${questionTitle}`;
					// let SelectedChoice = `Answer: ${e.srcElement.innerText}`;
					let SelectedChoice = "";
					// console.log(`elll`,e.srcElement.innerText)
					//clear all the spaces to properly format the pdf
					// console.log(`currid`,id)
					if(id === "genPdf" && e.srcElement.innerText !== "Next"){
						SelectedChoice = `Answer: ${e.srcElement.innerText}`
					}
					else if(id === "genPdf"){
						SelectedChoice = `Answer: You chose to generate a pdf file`
					}
					else{
						SelectedChoice = `Answer: ${e.srcElement.innerText}`;
					}

					CurrentTitle = CurrentTitle.replace(/\s+/g, '&nbsp;');
					SelectedChoice = SelectedChoice.replace(/\s+/g, '&nbsp;');

					// if(pushItOneTimeBeforeChecking){
					//
					// 	questions.push([CurrentTitle,SelectedChoice])
					// 	pushItOneTimeBeforeChecking = false;
					//
					// }else{
					// 	//else do the checking if the user decided to loop the question to not have multiple copies of the same question
					// 	console.log("access again")
					// 	checkIfUserAnsweredAlready(CurrentTitle,SelectedChoice)
					//
					// }

					checkIfUserAnsweredAlready(CurrentTitle,SelectedChoice)


				}

			}

		}


		//for short answer
		if(e.srcElement.parentElement.querySelector(".question-user-input")){
			let currVal = e.srcElement.parentElement.querySelector(".question-user-input");
			currVal = currVal.value;
			console.log(`currval`,currVal)
			currVal = currVal.replace(/\s+/g, '&nbsp;');

			checkIfUserAnsweredAlready(CurrentTitle,currVal)

		}



		//if access one time make it false again to be accessible for the next
		//short form
		if(isAccess){
			isAccess = false
		}

		document.querySelectorAll(".question-form").forEach(divEl=>{
			divEl.classList.remove("visible-flex")
		})
		document.getElementById(`${id}`).classList.add("visible-flex");

	}


	onMount(()=>{
		//create a pdf  when click the generate pdf button
		let genPdfBtn = document.querySelector("#genPdf .choice-field__choice");


		genPdfBtn.addEventListener("click",(e)=>{
			const doc = new jsPDF({
				orientation: 'portrait',
				unit: 'px',
				format: 'a4',
			});

			doc.setFont('Inter', 'normal');

			htmlDoc += `<h3 style='color:#0D1117'>Thank&nbsp;you&nbsp;for&nbsp;your&nbsp;time</h3>`;

			for(let question in questions){
				htmlDoc += `
				<section style='margin-top: 20px;'>
				<h5 style='color:#E67E26;font-width: bold;'>${question}</h5>
				<small style='color:#0D1117'>${questions[question]}</small>
				</section>
				`
			}

			let html_element = document.createElement("div");
			html_element.innerHTML = htmlDoc
			doc.html(html_element, {
				margin:[20,20,20,20],
				async callback(doc){await doc.save(`PathGen`)}
			})

			htmlDoc = ``;
		})

	})
</script>

<section class='questionField'>
	{#each data.currentQuestion.question as question}

		<form class='question-form {question.qid === "q1" ?"visible-flex" :""}' id='{question.qid}'>
			<h2 class='question-title'>{question.title}</h2>
			{#if question.answerInputActive}
				<input class='question-user-input' type='text' value='' placeholder='{question.answerInputPlaceValue}'>
				<a class='choice-field__choice choice-field__next' on:click|preventDefault={ (e)=>{
					gotoNextQuestion(e,question.title,question.answer.Next)
				}}>Next</a>
			{/if}
			<div class='choice-field'>
				{#each question.choice as choice}
					<!--if for some reason the user put the button value to be exactly "Next" trigger this as "Next is Reserve value word for short question"-->
					{#if choice === "Next"}

							<a class='choice-field__choice' on:click|preventDefault={(e)=>{
							//match the linking of answer to choice
							gotoNextQuestion(e,question.title,question.answer[`${choice}`])
						}}>{choice}</a>
						{:else}
						<a class='choice-field__choice' on:click|preventDefault={(e)=>{
						//match the linking of answer to choice
						gotoNextQuestion(e,question.title,question.answer[`${choice}`])
					}}>{choice}</a>
					{/if}
				{/each}
			</div>

		</form>
	{/each}
</section>
