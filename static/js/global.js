//global function to handle clicks

let questionItem = [];

const letThisComponentDissapear = () =>{

}

const addChoice = (btnEl) =>{
	let choiceContainer = btnEl.parentElement;

	let btn = document.createElement("button");
	btn.classList.add("question-branch-btn","question-branch-option");
	btn.innerHTML = `<span class='question-branch-option--value' contentEditable='true'>edit</span> <span  onclick='this.parentElement.remove()' className='question-branch-option--delete'><img src='/img/close-btn.svg' alt=''></span>`

	choiceContainer.insertBefore(btn,choiceContainer.lastChild)
}

//close the branch but update the store
const closeBranch = (btnEl) =>{
	btnEl.parentElement.parentElement.style.display = "none";
}

//open Branch Modal
const openBranchModal = (btnEl) =>{
	let branchQ = btnEl.parentElement.parentElement.parentElement.querySelectorAll(".question-branch-option");
	let branchChoice = [];

	branchQ.forEach(choice=>{branchChoice.push(choice.innerText)})

	let branchChoiceBox = btnEl.nextElementSibling.querySelector(".branch-choice-box");
	let currentBranchChoice = ``

	console.log(branchChoice)
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
		let currentOption = ``
		for(let j=0;j<questionItem.length;j++){
			currentOption += `<option value='${questionItem[j]}'>${questionItem[j]}</option>`
		}
		innerSelect.innerHTML = currentOption;
		innerSelect.innerHTML += `<option value='genPdf'>Generate PDF</option>`
		currentOption = ``;
	})

	currentBranchChoice = ``;

	btnEl.nextElementSibling.style.display = "flex";
}