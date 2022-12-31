<script>
	import "./style.css";
	import { doc } from 'firebase/firestore';

	export let data;

	console.log(data.currentQuestion.question)

	function gotoNextQuestion(id){
		document.querySelectorAll(".question-form").forEach(divEl=>{
			divEl.classList.remove("visible-flex")
		})
		document.getElementById(`${id}`).classList.add("visible-flex");
		console.log(id)
	}
</script>

<section class='questionField'>
	{#each data.currentQuestion.question as question}

		<form class='question-form {question.qid === "q1" ?"visible-flex" :""}' id='{question.qid}'>
			<h2 class='question-title'>{question.title}</h2>

			<div class='choice-field'>
				{#each question.choice as choice}
					<a class='choice-field__choice' on:click|preventDefault={()=>{
						//match the linking of answer to choice
						gotoNextQuestion(question.answer[`${choice}`])
					}}>{choice}</a>
				{/each}
			</div>

		</form>
	{/each}
</section>
