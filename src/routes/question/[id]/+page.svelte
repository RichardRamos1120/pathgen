<script>
	import "./style.css";
	import { doc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import jsPDF from 'jspdf';
	let htmlDoc = "";


	export let data;
	let questions = []

	console.log(data.currentQuestion.question)
	let isAccess = false;
	function gotoNextQuestion(e,questionTitle,id){
		let CurrentTitle = `${questionTitle}`;
		let SelectedChoice = `Answer: ${e.srcElement.innerText}`;

		//clear all the spaces to properly format the pdf
		CurrentTitle = CurrentTitle.replace(/\s+/g, '&nbsp;');
		SelectedChoice = SelectedChoice.replace(/\s+/g, '&nbsp;');

		// let SelectedChoiceElement = document.querySelector(`#${id} .question-title`).innerText
		// console.log(SelectedChoiceElement)

		//put the value to the storage as long as you are not pressing the generate pdf button
		if(e.srcElement.innerText !== "Generate PDF" && e.srcElement.innerText !== "Next"){
			questions.push([CurrentTitle,SelectedChoice])
			isAccess = true;
		}
		//if press the next button copy instead the input from the user value
		//access this if the previous if statement is not yet triggered, meaning this if
		//only targets the question form Next Button that is originally "short form"
		//not not multi
		if(e.srcElement.innerText === "Next" && !isAccess){
			let currentUserInputVal = `Answer: ${e.srcElement.parentElement[0].value}`;
			console.log(currentUserInputVal)
			//remove any space and change to html entity space the &nbsp; for proper pdf format
			currentUserInputVal = currentUserInputVal.replace(/\s+/g, '&nbsp;');

			questions.push([CurrentTitle,currentUserInputVal])
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

			for(let i=0;i<questions.length;i++){
				htmlDoc += `
				<section style='margin-top: 20px;'>
				<h5 style='color:#E67E26;font-width: bold;'>${questions[i][0]}</h5>
				<small style='color:#0D1117'>${questions[i][1]}</small>
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
					<a class='choice-field__choice' on:click|preventDefault={(e)=>{
						//match the linking of answer to choice
						gotoNextQuestion(e,question.title,question.answer[`${choice}`])
					}}>{choice}</a>
				{/each}
			</div>

		</form>
	{/each}
</section>
