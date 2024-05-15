// Updated linearRegression function
function linearRegression() {
    fetch('http://localhost:3000/run-linear-regression', { // Replace with your actual server endpoint
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        console.log(result);
        alert("Linear Regression script executed successfully.");
    })
    .catch(error => console.error('There was a problem with the script execution:', error));
}


function decisionTree() {
    fetch('http://localhost:3000/run-decision-tree', { // Replace with your actual server endpoint
    method: 'GET'
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(result => {
    console.log(result);
    alert("Linear Regression script executed successfully.");
})
.catch(error => console.error('There was a problem with the script execution:', error));

  
}

function knn() {
    fetch('http://localhost:3000/run-knn', { // Replace with your actual server endpoint
    method: 'GET'
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(result => {
    console.log(result);
    alert("Linear Regression script executed successfully.");
})
.catch(error => console.error('There was a problem with the script execution:', error));

 
}

function svm() {
    // Code for SVM
    alert("SVM");
}

// Function to handle file selection
function handleFiles(files) {
    const file = files[0];
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    if (fileSize > 10) {
        alert("File size exceeds the limit of 10MB.");
        return;
    }
    // Display the name of the uploaded file
    document.getElementById("file-name").textContent = "Uploaded file: " + file.name;

    // Upload the file to the server
    uploadFile(file);
}

// Function to upload file to server
function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3000/upload', { // Assuming your server is running locally on port 3000
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => console.error('There was a problem with the upload:', error));
}

// Event listeners for file upload
const dropArea = document.getElementById("drop-area");

// Add event listeners for drag and drop functionality
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when file is dragged over it
["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

// Unhighlight drop area when file is dragged out of it or dropped
["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Prevent default behavior for drag and drop events
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Add highlight class to drop area
function highlight(e) {
    dropArea.classList.add("highlight");
}

// Remove highlight class from drop area
function unhighlight(e) {
    dropArea.classList.remove("highlight");
}

// Handle file drop event
dropArea.addEventListener("drop", handleDrop, false);

// Function to handle file drop event
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

// Function to handle file selection from input element
const fileElem = document.getElementById("fileElem");
fileElem.addEventListener("change", handleInputChange);

// Function to handle file selection from input element
function handleInputChange(event) {
    const files = event.target.files;
    handleFiles(files);
}

// Event listener for algorithm selection
const algorithmSelect = document.getElementById("algorithm");
algorithmSelect.addEventListener("change", runSelectedAlgorithm);

// Function to run the selected algorithm
function runSelectedAlgorithm() {
    const selectedAlgorithm = algorithmSelect.value;
    switch (selectedAlgorithm) {
        case "linear-regression":
            linearRegression();
            break;
        case "decision-trees":
            decisionTree();
            break;
        case "k-nearest-neighbors":
            knn();
            break;
        case "svm":
            svm();
            break;
        default:
            alert("Please select an algorithm");
    }
}

const algorithmelect = document.getElementById("algorithm");
const algorithmDescriptionsDiv = document.getElementById("algorithm-descriptions");

algorithmSelect.addEventListener("change", updateDescription);

function updateDescription() {
    const algorithm = algorithmSelect.value;
    if (algorithm === "Want to visualise linear regression without dataset") {
        // Open the link in a new tab
        window.open("https://madhavan-raja.github.io/linear-regression-visualizer/", "_blank");
    } else {
        // Update the description normally
        algorithmDescriptionsDiv.textContent = algorithmDescriptions[algorithm];
    }
}

function linearRegressionNoData() {
    var iframe = document.getElementById('urlFrame');
    iframe.style.display = "block";
    iframe.src = "https://madhavan-raja.github.io/linear-regression-visualizer/"; 
}

function ModelVisualizer() {
    var iframe = document.getElementById('ModelVisualizer');
    iframe.style.display = "block";
    iframe.src = "https://netron.app/"; 
}

function SVM() {
    var iframe = document.getElementById('SVM');
    iframe.style.display = "block";
    iframe.src = "https://greitemann.dev/svm-demo"; 
}


async function generateText() {
    const prompt = document.getElementById('prompt').value;
    const response = await fetch('/generated-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
    });
    const text = await response.text();
    document.getElementById('generated-text').innerText = text;
}