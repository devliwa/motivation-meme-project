const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
const topTextInput = document.getElementById('top-text');
const bottomTextInput = document.getElementById('bottom-text');
const downloadBtn = document.getElementById('download-btn');

let image = null;

function drawMeme() {
	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Draw image if loaded
	if (image) {
		// Fit image to canvas
		const ratio = Math.min(canvas.width / image.width, canvas.height / image.height);
		const newWidth = image.width * ratio;
		const newHeight = image.height * ratio;
		const x = (canvas.width - newWidth) / 2;
		const y = (canvas.height - newHeight) / 2;
		ctx.drawImage(image, x, y, newWidth, newHeight);
	} else {
		// Placeholder background
		ctx.fillStyle = '#e0e7ff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#6c63ff';
		ctx.font = 'bold 1.5rem Montserrat, Arial, sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText('Upload an image to start', canvas.width / 2, canvas.height / 2);
		return;
	}

	// Draw top text
	drawText(topTextInput.value, canvas.width / 2, 50, 'top');
	// Draw bottom text
	drawText(bottomTextInput.value, canvas.width / 2, canvas.height - 30, 'bottom');
}


function drawText(text, x, y, position) {
	if (!text) return;
	ctx.save();
	const maxWidth = canvas.width - 40; // 20px padding each side
	let fontSize = 44;
	ctx.font = `bold ${fontSize}px Montserrat, Arial, sans-serif`;
	// Shrink font until text fits
	while (ctx.measureText(text.toUpperCase()).width > maxWidth && fontSize > 16) {
		fontSize -= 2;
		ctx.font = `bold ${fontSize}px Montserrat, Arial, sans-serif`;
	}
	ctx.textAlign = 'center';
	ctx.lineWidth = Math.max(4, fontSize / 8);
	ctx.strokeStyle = 'rgba(30, 64, 175, 0.7)'; // blue outline
	ctx.fillStyle = '#2563eb'; // blue fill
	ctx.textBaseline = position === 'top' ? 'top' : 'bottom';
	ctx.strokeText(text.toUpperCase(), x, y);
	ctx.fillText(text.toUpperCase(), x, y);
	ctx.restore();
}

imageUpload.addEventListener('change', (e) => {
	const file = e.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = function (event) {
		image = new window.Image();
		image.onload = drawMeme;
		image.src = event.target.result;
	};
	reader.readAsDataURL(file);
});

topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);

downloadBtn.addEventListener('click', () => {
	const link = document.createElement('a');
	link.download = 'motivation-meme.png';
	link.href = canvas.toDataURL('image/png');
	link.click();
});

// Initial draw
drawMeme();
