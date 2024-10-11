var files_exist = false;
const fileTable = document.getElementById("fileTable");
const fileTableLabel = document.getElementById("fileTableLabel");
const downloadTableButton = document.getElementById("downloadTableBtn");
const plotHiSCRButton = document.getElementById("plotHiSCRBtn");
let patient_id_const;
let baseline_selected = false;
const visit_numbers = [];
const jsonDatas = [];
let baseline_inf_nodules;
let baseline_abcesses;
let baseline_draining_fistulas;
let baseline_visit_num;
let baseline_pga_score;
let countChart;

function allowDrop(event) {
    event.preventDefault();
    var dropArea = document.getElementById("dropArea");
    dropArea.style.border = "2px dashed #007bff";
}

function colorChange(event) {
    event.preventDefault();
    var dropArea = document.getElementById("dropArea");
    dropArea.style.border = "2px dashed #ccc";
}

function drop(event) {
    console.log("filedropped")
    event.preventDefault();
    allowDrop(event); // Reset the border color when a file is dropped
    handleFile_drop(event); // Handle the dropped file
}

function openFileInput() {
    var fileInput = document.getElementById("fileInput");
    fileInput.click();
}



function displayConfirmation(fileName, jsonData) {
    if (!files_exist) {
        files_exist = true;
        downloadTableButton.style.display = "block";
        plotHiSCRButton.style.display = "block";
        fileTable.style.display = "block";
        fileTableLabel.innerHTML = patient_id_const;
        fileTableLabel.style.display = "block";

    }
    visit_numbers.push(jsonData.visit_number);
    jsonDatas.push(jsonData);
    let json_data_index = jsonDatas.length - 1;
    var row = fileTable.insertRow(-1);
    var fname = row.insertCell(0);
    var visitnum = row.insertCell(1);
    var abcess = row.insertCell(2);
    var nodules = row.insertCell(3);
    var fistula = row.insertCell(4);
    var ihs4 = row.insertCell(5);
    var iga = row.insertCell(6);
    var pga = row.insertCell(7);
    var button = row.insertCell(8);

    // Populate the cells with data from jsonData
    fname.textContent = fileName || 'N/A';
    visitnum.textContent = jsonData.visit_number || 'N/A'; // Example field
    abcess.textContent = jsonData.abcess_count || 0; // Example field
    nodules.textContent = jsonData.inf_nodule_count || 0; // Example field
    fistula.textContent = jsonData.draining_tunnel_count || 0; // Example field
    ihs4.textContent = jsonData.ihs4_score || 'N/A'; // Example field
    iga.textContent = jsonData.iga_score || 0; // Example field
    pga.textContent = jsonData.pga_score || 'N/A'; // Example field
    button.innerHTML = `
    <input type="radio" id="bs-${json_data_index}" name="baselineSelect" class="select-row">
    `;
    (function (json_data_index) {
        document.getElementById(`bs-${json_data_index}`).addEventListener('click', function () {
            if (!baseline_selected) {
                baseline_selected = true;
            }
            baseline_inf_nodules = jsonDatas[json_data_index].inf_nodule_count;
            baseline_abcesses = jsonDatas[json_data_index].abcess_count;
            baseline_draining_fistulas = jsonDatas[json_data_index].draining_tunnel_count;
            baseline_pga_score = jsonDatas[json_data_index].pga_score;
            baseline_visit_num = jsonDatas[json_data_index].visit_number;

            console.log(`Baseline selected: json_data_index ${json_data_index}`);

            // Additional logic for handling baseline selection can be added here
        });
    })(json_data_index);

    console.log(fileName);
}


function HiSCR_50(inf_nods, abcesses, draining_fistulas) {
    if ((abcesses <= baseline_abcesses) && (draining_fistulas <= baseline_draining_fistulas) && (((inf_nods + abcesses) / (baseline_inf_nodules + baseline_abcesses)) <= 0.5)) {
        return true;
    }
    else {
        return false;
    }
}

function HiSCR_75(inf_nods, abcesses, draining_fistulas) {
    if ((abcesses <= baseline_abcesses) && (draining_fistulas <= baseline_draining_fistulas) && (((inf_nods + abcesses) / (baseline_inf_nodules + baseline_abcesses)) <= 0.25)) {
        return true;
    }
    else {
        return false;
    }
}



function handleFile_drop(event) {
    var fileInput = document.getElementById("fileInput");
    var file;

    /*
    // Check if the file is dropped
    if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        if (event.dataTransfer.items.length > 0) {
            file = event.dataTransfer.items[0].getAsFile();
        }
    } else {
        // Use the traditional way to access the file(s)
        if (event.dataTransfer.files.length > 0) {
            file = event.dataTransfer.files[0];
        }

    }
        */
    for (const file of event.dataTransfer.files) {
        if (file && file.type === 'application/json') {
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var jsonData = JSON.parse(e.target.result);
                    if (!files_exist) {
                        patient_id_const = jsonData.PatientID;
                    }
                    else {
                        if (jsonData.PatientID != patient_id_const) {
                            alert("Please upload files for the same patient");
                            return;
                        }
                        if (visit_numbers.includes(jsonData.visit_number)) {
                            alert("Duplicate visit number: " + jsonData.visit_number);
                            return;
                        }
                    }
                    console.log('JSON Data:', jsonData);
                    // Further processing of jsonData
                    displayConfirmation(file.name, jsonData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        } else {
            alert('Only JSON files are accepted.');
        }
    }
}

downloadTableButton.addEventListener('click', function () {
    // Get the table
    var table = document.getElementById('fileTable');

    // Convert the HTML table to a workbook
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Generate a downloadable file
    XLSX.writeFile(wb, patient_id_const + '.xlsx');
});






// make the plot

function plot_hiSCR() {
    const sortedJsonDatas = jsonDatas.slice().sort((a, b) => a.visit_number - b.visit_number);
    const labels = sortedJsonDatas.map(entry => parseInt(entry.visit_number, 10));
    const infNoduleCounts = sortedJsonDatas.map(entry => entry.inf_nodule_count);
    const abcessCounts = sortedJsonDatas.map(entry => entry.abcess_count);
    const drainingFistulaCount = sortedJsonDatas.map(entry => entry.draining_tunnel_count);
    const ihs4Scores = sortedJsonDatas.map(entry => entry.ihs4_score);
    const igaScores = sortedJsonDatas.map(entry => entry.iga_score);
    const pgaScores = sortedJsonDatas.map(entry => entry.pga_score);

    const HiSCR50_scores = sortedJsonDatas.map(entry => HiSCR_50(entry.inf_nodule_count, entry.abcess_count, entry.draining_tunnel_count));

    const HiSCR75_scores = sortedJsonDatas.map(entry => HiSCR_75(entry.inf_nodule_count, entry.abcess_count, entry.draining_tunnel_count));

    const ctx = document.getElementById('countChart').getContext('2d');
    const stx = document.getElementById('scoreChart').getContext('2d');

    const hiSCRAnnotations = labels.reduce((acc, visit, index) => {
        if (HiSCR75_scores[index]) {
            acc.push({
                type: 'box',
                xMin: visit - 0.5,
                xMax: visit + 0.5,
                yMin: 0,
                yMax: 'max',
                backgroundColor: 'rgba(0, 0, 255, 0.4)', // Dark Blue for HiSCR75
                borderColor: 'transparent',
            });
        } else if (HiSCR50_scores[index]) {
            acc.push({
                type: 'box',
                xMin: visit - 0.5,
                xMax: visit + 0.5,
                yMin: 0,
                yMax: 'max',
                backgroundColor: 'rgba(173, 216, 230, 0.4)', // Light blue for HiSCR50
                borderColor: 'transparent',
            });
        }
        return acc;
    }, []);

    countChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Abcess Count',
                    data: abcessCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'Inflammed Nodule Count',
                    data: infNoduleCounts,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'Draining Fistula Count',
                    data: drainingFistulaCount,
                    borderColor: 'rgba(255, 165, 0, 1)',
                    borderWidth: 2,
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Visit Number'
                    },
                    min: 0.8,
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Lesion Count'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'HS Lesion Counts',
                    font: {
                        size: 18
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                annotation: {
                    annotations: {
                        baseline: {
                            type: 'line',
                            xMin: baseline_visit_num,
                            xMax: baseline_visit_num,
                            borderColor: 'black',
                            borderWidth: 2,
                            label: {
                                content: 'Baseline',
                                enabled: true,
                                position: 'top'
                            }
                        },
                        ...hiSCRAnnotations
                    }
                },
                legend: {
                    labels: {
                        generateLabels: (chart) => {
                            const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            defaultLabels.push({
                                text: 'HiSCR50 True',
                                fillStyle: 'rgba(173, 216, 230, 0.8)',
                                strokeStyle: 'transparent',
                                lineWidth: 0
                            },
                                {
                                    text: 'HiSCR75 True',
                                    fillStyle: 'rgba(0, 0, 255, 0.8)',
                                    strokeStyle: 'transparent',
                                    lineWidth: 0
                                }
                            );
                            return defaultLabels;
                        }
                    }
                }
            }
        }

    });
    scoreChart = new Chart(stx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'IGA Score',
                    data: igaScores,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'PGA Score',
                    data: pgaScores,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'IHS4 Score',
                    data: ihs4Scores,
                    borderColor: 'rgba(255, 165, 0, 1)',
                    borderWidth: 2,
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Visit Number'
                    },
                    min: 0.8,
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Lesion Count'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'HS Severity Scores',
                    font: {
                        size: 18
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                annotation: {
                    annotations: {
                        baseline: {
                            type: 'line',
                            xMin: baseline_visit_num,
                            xMax: baseline_visit_num,
                            borderColor: 'black',
                            borderWidth: 2,
                            label: {
                                content: 'Baseline',
                                enabled: true,
                                position: 'top'
                            }
                        },
                        ...hiSCRAnnotations
                    }
                },
                legend: {
                    labels: {
                        generateLabels: (chart) => {
                            const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            defaultLabels.push({
                                text: 'HiSCR50 True',
                                fillStyle: 'rgba(173, 216, 230, 0.8)',
                                strokeStyle: 'transparent',
                                lineWidth: 0
                            },
                                {
                                    text: 'HiSCR75 True',
                                    fillStyle: 'rgba(0, 0, 255, 0.8)',
                                    strokeStyle: 'transparent',
                                    lineWidth: 0
                                }
                            );
                            return defaultLabels;
                        }
                    }
                }
            }
        }

    });

}

plotHiSCRButton.addEventListener('click', function () {
    if (!baseline_selected) {
        alert("Please select a baseline visit number");
        return;
    }
    if (countChart) {
        countChart.destroy(); // Destroy the existing chart
        countChart = null; // Reset myChart
        scoreChart.destroy(); // Destroy the existing chart
        scoreChart = null;
    }
    plot_hiSCR();
});