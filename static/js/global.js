//global function to handle clicks

let questionItem = [];


const addChoice = (btnEl) =>{
	let choiceContainer = btnEl.parentElement;

	let btn = document.createElement("button");
	btn.classList.add("question-branch-btn","question-branch-option");
	btn.innerHTML = `<span class='question-branch-option--value' contentEditable='true'>edit</span> <span  onclick='this.parentElement.remove()' className='question-branch-option--delete'><img src='/img/close-btn.svg' alt=''></span>`

	choiceContainer.insertBefore(btn,choiceContainer.lastChild)
}

//close questionBox
const closeQuestionBox = (el) => {
	let qid = el.parentElement.getAttribute("data-qid");
	questionItem = questionItem.filter(el=> el !== qid);
	el.parentElement.remove();
}

//close the branch but update the store
const closeBranch = (btnEl) =>{
	btnEl.parentElement.parentElement.style.display = "none";
	document.querySelector(".modal-backdrop").style.display = "none";
}

//open Branch Modal
const openBranchModal = (btnEl) =>{
	document.querySelector(".modal-backdrop").style.display = "block";
	let branchQ = btnEl.parentElement.parentElement.parentElement.querySelectorAll(".question-branch-option");
	let branchChoice = [];
	console.log(questionItem)

	branchQ.forEach(choice=>{branchChoice.push(choice.innerText)})

	let branchChoiceBox = btnEl.nextElementSibling.querySelector(".branch-choice-box");
	let currentBranchChoice = ``

	// console.log(branchChoice)
	for (let i=0;i<branchChoice.length;i++){
		currentBranchChoice += `<div class='branch-form'>
										<h4 class='branch-choice' data-value='${branchChoice[i]}'>${branchChoice[i]}, go to:</h4>
										<select class='branch-select' id=''>
										</select>
									</div>`
	}
	branchChoiceBox.innerHTML = currentBranchChoice

	//insert those select question
let branchSelect = 	branchChoiceBox.querySelectorAll(".branch-select");

	branchSelect.forEach(innerSelect=>{
		//get the last character of the current selected question box ie (q1,q2 etc...)
		// let currentBox = innerSelect.parentElement.parentElement.getAttribute("id").slice(-2);


		let currentOption = ``
		for(let j=0;j<questionItem.length;j++){
			console.log(questionItem[j])
			currentOption += `<option value='${questionItem[j]}'>${questionItem[j]}</option>`

		}
		innerSelect.innerHTML = currentOption;
		innerSelect.innerHTML += `<option value='genPdf'>Generate PDF</option>`


		currentOption = ``;


		//change the selected element option to the current selected question box
		// innerSelect.parentElement.parentElement.getAttribute("id")
		// console.log(innerSelect)

		let currentElId = innerSelect.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-qid")
		innerSelect.querySelectorAll("option").forEach(el=>{

			if(el.value === currentElId){
				el.selected = true;
			}
		})

	})



	currentBranchChoice = ``;

	btnEl.nextElementSibling.style.display = "flex";
}


if(document.querySelector(".modal-backdrop")){
	document.querySelector(".modal-backdrop").addEventListener("click",(e)=>{
		document.querySelectorAll(".branch-modal").forEach(modal=>{
			modal.style.display = "none";
		})
		e.target.style.display = "none";
	})
}



// document.addEventListener("DOMContentLoaded",()=>{
// 	if(document.querySelectorAll(".question-form")){
// 		document.querySelectorAll(".question-form-test").forEach(el=>{
// 			el.classList.add("visible-flex")
// 		})
// 	}
// })
