let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const submitElement = document.querySelector(".to-do__submit");

function loadTasks() {	                  // загружает список
	if(localStorage.getItem("goals")){                  
		return JSON.parse(localStorage.getItem("goals")); 
	}else{
		return items;
	}
	
}


function createItem(item) {                    
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  deleteButton.addEventListener("click", ()=>{  // кнопка удаления по клику
	clone.remove();  
	let items = getTasksFromDOM(); 
	saveTasks(items);  
  });


  duplicateButton.addEventListener("click", ()=>{   // кнопка дублирования по клику
	const itemName = textElement.textContent;
	const newItem = createItem(itemName);     

	listElement.prepend(newItem); 
	let items = getTasksFromDOM(); 
	saveTasks(items);   
  });

  editButton.addEventListener("click", ()=>{              // вход в режим редактирования 
	textElement.setAttribute("contenteditable", true);
	textElement.focus();
  });

  textElement.addEventListener("blur", ()=>{              // выход из редактирования и сохранение задачи
	textElement.setAttribute("contenteditable", false);
	saveTasks(getTasksFromDOM());
  });


  textElement.textContent = item;
  return clone;
  
}


function getTasksFromDOM(){               // берёт список из того что мы видим на сайте
	
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");  
	const tasks = [];
	
	itemsNamesElements.forEach((element)=>{   
		tasks.push(element.textContent);
	});
	
	return tasks;
}



function saveTasks(tasks){          // сохраняет задачи в локальное хранилище в виде JSON стринга
	const jsonArray = JSON.stringify(tasks);
	localStorage.setItem("goals", jsonArray);

}


submitElement.addEventListener("click", (event)=>{            // создаёт плашку с задачей
	const inputValue = inputElement.value;
	
	event.preventDefault(); 
	inputElement.value = "";

	listElement.prepend(createItem(inputValue));
	items = getTasksFromDOM();
	saveTasks(items);

});

items = loadTasks(); 
items.forEach((element) => {
	listElement.append(createItem(element))
});

