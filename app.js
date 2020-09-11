const factTypes = document.querySelectorAll('input[type="radio"]'),
      form = document.querySelector(".form"),
      input = document.querySelector(".form-input"),
      submit = document.querySelector(".submit-button"),
      random = document.querySelector(".random"),
      factContainer = document.querySelector(".fact");


const getFact = async(type = "trivia", number = "random") => {
        const numbersAPI = await fetch(`http://numbersapi.com/${number}/${type}`);
        const response = await numbersAPI.text();
        return response;
        
    };

function showFact(fact){
        factContainer.classList.remove("hide");
        factContainer.textContent = fact;
    }


function whichType () {
    for (let factType of factTypes) {
		if (factType.checked) {
			return factType.value;
		}
	}
}

function getRandomFact(e){
    if(whichType() != undefined){
        getFact(whichType()).then((fact) => {
            showFact(fact);
        });
    } else {
        getFact().then((fact) => {
            showFact(fact);
        });
    }

}


function getParticularFact(event){
    event.preventDefault();
    if(input.value != ""){
        getFact(whichType(), input.value).then((fact) =>{
            showFact(fact);
        });
    } else{
        getRandomFact();
    }
}

form.addEventListener("submit", getParticularFact);
random.addEventListener("click", getRandomFact);