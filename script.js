const dropArea = document.querySelector('.drag-area');
const dragText = dropArea.querySelector('header');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('input');
let file;

// button.addEventListener('click', ()=>{ });
button.onclick = () => {
	console.log('click')
	input.click();
}

//когда картинка покидает область dropArea
dropArea.ondragleave = () => {
	console.log('dragleave');
	dropArea.classList.remove('active');
	dragText.textContent = "Drag & Drop to Upload File";
}

//когда картинка находиться над областью dropArea
dropArea.ondragover = (e) => {
	e.preventDefault();
	console.log('dragover');
	dropArea.classList.add('active');
	dragText.textContent = "Release to Upload File";
}

//когда картинка брошена в область dropArea
dropArea.ondrop = (e) => {
	e.preventDefault();
	console.log('drop');
	file = e.dataTransfer.files[0];
	//console.log(e.dataTransfer.files[0]);
	showFile();
}

const showFile = () => {
	const fileType = file.type;
	const validExtensions = ["image/png", "image/jpg", "image/jpeg"];

	if(validExtensions.includes(fileType)) {
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const fileURL = fileReader.result;
			const imgTag = `<img src="${fileURL}" alt="user-picture">`;
			dropArea.innerHTML = imgTag;
			dropArea.style.border = 'none';
		}
		fileReader.readAsDataURL(file);
	} else {
		alert("This is not an Image File!");
		dropArea.classList.remove('active');
		dragText.textContent = "Drag & Drop to Upload File";
	}
}

