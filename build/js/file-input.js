document.addEventListener('DOMContentLoaded', function () {

	const fileInput = document.querySelector('.file-input'); 
	const fileInputText = document.querySelector('.form__file-btn-text'); 

	if (fileInput && fileInputText) {
		fileInput.addEventListener('change', function () {
			let filename = this.files[0].name;
			fileInputText.innerText = filename;
		});
	}

})