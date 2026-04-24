const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const processBtn = document.getElementById('processBtn');
const fileCount = document.getElementById('fileCount');

// Progress Elements
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressStatus = document.getElementById('progressStatus');
const progressPercent = document.getElementById('progressPercent');

const resultsSection = document.getElementById('resultsSection');
const statsBody = document.getElementById('statsBody');
const downloadLink = document.getElementById('downloadLink');
const timingBadge = document.getElementById('timingBadge');

// --- UI Toggles ---


const updateFileCount = () => {
    const count = fileInput.files.length;
    fileCount.style.display = count > 0 ? 'inline-block' : 'none';
    fileCount.innerText = count > 0 ? `${count} Files Selected` : '';
    
    processBtn.disabled = count === 0;
    if(count > 0) {
        dropZone.classList.add('has-files');
    } else {
        dropZone.classList.remove('has-files');
    }
};

// --- Drag & Drop Logic ---
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', updateFileCount);

dropZone.addEventListener('dragover', (e) => { 
    e.preventDefault(); 
    dropZone.classList.add('dragover'); 
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        updateFileCount();
    }
});

// --- MAIN LOGIC ---
processBtn.addEventListener('click', () => {
    const files = fileInput.files;
    if (!files.length) return;

    // 1. Generate unique Batch ID
    const batchId = 'job_' + Date.now() + '_' + Math.floor(Math.random() * 9999);

    const formData = new FormData();
    formData.append('batchId', batchId);
    formData.append('format', document.getElementById('formatSelect').value);


    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    // 2. Reset UI for UPLOAD PHASE
    resultsSection.style.display = 'none';
    progressContainer.style.display = 'block';
    processBtn.disabled = true;
    processBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;

    // Bar Starts at 0
    updateProgress(0, "Uploading Images...");

    // Start Upload and Processing
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            // Only update bar for upload if we haven't switched to processing yet
            if (progressStatus.innerText.includes("Uploading")) {
                updateProgress(percent, `Uploading: ${percent}%`);

                if (percent === 100) {
                    // Upload done, show processing indicator
                    progressStatus.innerText = "Processing images...";
                    progressBar.classList.add('indeterminate'); // Add striped animation
                }
            }
        }
    });

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            processBtn.disabled = false;
            processBtn.innerHTML = `<span>Compress Images</span> <i class="fa-solid fa-rocket"></i>`;
            progressBar.classList.remove('indeterminate');

            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                renderResults(response);
            } else {
                updateProgress(0, "Error occurred!");
                alert("Processing Failed. See console.");
            }
        }
    };

    xhr.open('POST', '/upload');
    xhr.send(formData);
});

// Helper to update bar safely
function updateProgress(percent, text) {
    progressBar.style.width = `${percent}%`;
    progressPercent.innerText = `${percent}%`;
    progressStatus.innerText = text;
}

function renderResults(data) {
    progressContainer.style.display = 'none'; // Hide bar
    statsBody.innerHTML = '';

    // Timing
    timingBadge.innerHTML = `<i class="fa-regular fa-clock"></i> Processed ${data.stats.length} images in <b>${data.elapsedTime}s</b>`;

    data.stats.forEach(item => {
        const row = document.createElement('tr');
        
        if (item.error) {
            row.innerHTML = `<td colspan="5" class="error-msg">${item.name}: ${item.error}</td>`;
        } else {
            const originalUrl = `/processed/${data.batchId}/${item.originalRef}`;
            const processedUrl = `/processed/${data.batchId}/${item.newName}`;

            row.innerHTML = `
                <td>
                    <div class="file-info">
                        <i class="fa-regular fa-image"></i>
                        <span class="fname">${item.name}</span>
                    </div>
                </td>
                <td class="meta-text">${item.originalSize}</td>
                <td class="meta-text text-white">${item.finalSize}</td>
                <td><span class="badge-success">-${item.reduction}</span></td>
                <td class="text-right">
                    <div class="action-group">
                        <button class="btn-icon btn-view" onclick="openCompare('${originalUrl}', '${processedUrl}')" title="Compare">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <a href="${item.downloadUrl}" class="btn-icon btn-down" download title="Download">
                            <i class="fa-solid fa-download"></i>
                        </a>
                    </div>
                </td>
            `;
        }
        statsBody.appendChild(row);
    });

    downloadLink.href = data.zipUrl;
    resultsSection.style.display = 'block';
    // Smooth scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// --- Modal Logic ---
const modal = document.getElementById('compareModal');
const imgBefore = document.getElementById('imgBefore');
const imgAfter = document.getElementById('imgAfter');

window.openCompare = (urlBefore, urlAfter) => {
    imgBefore.src = urlBefore;
    imgAfter.src = urlAfter;
    modal.classList.add('active');
};

window.closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
        imgBefore.src = '';
        imgAfter.src = '';
    }, 300); // Wait for fade out
};

// Close on backdrop click
window.onclick = (e) => { if (e.target == modal) closeModal(); };
