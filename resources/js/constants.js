const hsMedications = [
    "Clindamycin",
    "Resorcinol Cream",
    "Doxycycline",
    "Contraceptives",
    "Spironolactone",
    "Acitretin",
    "Adalimumab",
    "Infliximab",
    "Methotrexate",
    "Cyclosporine",
    "Ibuprofen",
    "Prednisone",
    "Acetaminophen",
    "Tetracycline (doxycycline, minocycline)",
    "Spironolactone",
    "Finasteride",
    "Isotretinoin (Accutane)",
    "Acitretin",
    "Metformin",
    "Dapsone",
    "Cyclosporine",
    "Methotrexate",
    "Prednisone",
    "Triamcinolone acetonide",
    "Infliximab (Remicade)",
    "Etanercept",
    "Tofacitinib"
];

// https://pubmed.ncbi.nlm.nih.gov/33493574/
const comorbidities = [
    "Acne",
    "Dyslipidemia",
    "PD (Pilonidal Disease)",
    "PG (Pyoderma Gangrenosum",
    "Herpes Zoster",
    "Polycystic Ovary Syndrome",
    "Dyslipidemia (High Cholesterol)",
    "Musculoskeletal Disease",
    "Sexual Dysfunction",
    "Down Syndrome",
    "Diabetes",
    "Obesity",
    "Hypertension",
    "Crohn's Disease",
    "Psoriasis",
    "Arthritis",
    "Asthma",
    "Cardiovascular Disease",
    "Cancer",
    "IBD (Inflammatory Bowel Disease)",
    "Lupus",
    "Depression",
    "Epilepsy",
    "GAD (Generalized Anxiety Disorder)",
    "Atrial Fibrillation",
    "None"
];

const hsBiologics = [
    "Adalimumab (Humira)",
    "Infliximab (Remicade)",
    "Secukinumab (Cosentyx)",
    "Ustekinumab (Stelara)",
    "Etanercept (Enbrel)",
    "Tildrakizumab (Ilumya)",
    "Guselkumab (Tremfya)",
    "Brodalumab (Siliq)"
];
/*
const male_polygons = {
    "Axillae1": [[100, 130], [118, 203], [83, 204]],
    "Axillae2": [[214, 132], [198, 198], [232, 201]],
    "Groin": [[99, 267], [103, 247], [210, 252], [214, 273], [214, 296], [164, 293], [164, 280], [148, 279], [148, 293], [97, 288]],
    "Buttocks": [[406, 237], [458, 236], [512, 242], [518, 284], [497, 294], [459, 287], [428, 289], [401, 275]],
    "Inframammary": [[105, 153], [208, 153], [203, 176], [111, 175]],
    "Genital": [[149, 280], [164, 280], [164, 293], [149, 293]],
    "InnerThigh1": [[143, 293], [155, 294], [152, 327], [145, 371], [132, 368]],
    "InnerThigh2": [[158, 294], [169, 294], [179, 372], [167, 373], [159, 326]],
    "InnerThigh3": [[444, 289], [458, 288], [456, 325], [447, 369], [433, 369]],
    "InnerThigh4": [[460, 288], [462, 325], [469, 373], [484, 374], [476, 291]],
    "Axillae3": [[400, 140], [421, 198], [385, 202]],
    "Axillae4": [[517, 138], [500, 202], [536, 204]]
}
*/

// iga regions
const male_polygons = {
    "Mammary": [[96, 100], [213, 100], [223, 131], [205, 130], [204, 176], [109, 173], [105, 128], [87, 129]],
    "Axillae1": [[89, 129], [105, 129], [109, 174], [91, 173]],
    "Axillae2": [[205, 131], [222, 131], [221, 177], [204, 177]],
    "Genital": [[103, 243], [209, 247], [214, 275], [215, 303], [96, 299], [98, 270]],
    "Buttocks": [[409, 231], [509, 235], [518, 272], [516, 295], [459, 298], [400, 286], [401, 264]]
}

/*
const female_polygons = {
    "Axillae1": [[119, 131], [134, 135], [133, 208], [112, 204]],
    "Axillae2": [[212, 133], [225, 127], [234, 213], [214, 212]],
    "Axillae3": [[427, 131], [439, 132], [443, 204], [422, 204]],
    "Axillae4": [[521, 135], [534, 133], [538, 210], [519, 208]],
    "Groin": [[111, 286], [113, 264], [118, 247], [174, 242], [232, 250], [236, 273], [237, 296], [187, 293], [187, 276], [162, 275], [162, 292]],
    "Buttocks": [[420, 257], [424, 243], [481, 241], [538, 250], [542, 268], [543, 295], [522, 305], [487, 300], [487, 295], [480, 289], [473, 296], [473, 300], [439, 301], [417, 282]],
    "Genital": [[162, 276], [187, 276], [186, 293], [162, 292]],
    "InnerThigh1": [[154, 291], [148, 371], [162, 374], [168, 293]],
    "InnerThigh2": [[180, 293], [194, 294], [200, 373], [186, 376]],
    "InnerThigh3": [[455, 301], [473, 301], [467, 386], [450, 383]],
    "InnerThigh4": [[487, 301], [505, 303], [512, 386], [492, 386]],
    "Inframammary": [[134, 169], [174, 155], [212, 172], [212, 184], [134, 181]]
}
*/

// iga
const female_polygons = {
    "Axillae1": [[118, 128], [131, 125], [130, 168], [117, 168]],
    "Axillae2": [[216, 126], [229, 128], [231, 169], [219, 170]],
    "Mammary": [[131, 124], [215, 125], [218, 177], [174, 169], [131, 175]],
    "Genital": [[121, 234], [228, 239], [237, 271], [238, 290], [183, 301], [166, 300], [111, 280], [112, 262]],
    "Buttocks": [[426, 237], [534, 239], [543, 274], [543, 291], [488, 314], [473, 314], [417, 293], [417, 273]]
}

// don't use labels for the region
const male_region = [
    [[69, 105], [127, 75], [123, 19], [156, 2], [192, 17], [191, 75], [244, 102], [251, 173], [259, 273], [277, 305], [252, 325], [219, 322], [213, 404], [207, 466], [200, 513], [210, 537], [171, 547], [100, 542], [112, 500], [95, 428], [100, 389], [89, 309], [45, 326], [44, 280], [54, 264], [58, 177]],
    [[460, 4], [493, 20], [490, 77], [550, 107], [559, 189], [570, 287], [561, 317], [522, 317], [513, 398], [520, 443], [501, 511], [516, 530], [477, 545], [404, 536], [414, 502], [397, 434], [406, 392], [392, 307], [349, 319], [352, 263], [370, 102], [423, 77], [423, 18]]
]

const female_region = [
    [[144, 23], [172, 6], [198, 13], [210, 40], [198, 80], [252, 108], [252, 184], [281, 287], [283, 315], [238, 335], [229, 394], [228, 460], [219, 516], [233, 545], [190, 550], [120, 542], [129, 502], [117, 431], [119, 375], [104, 326], [65, 322], [61, 292], [78, 263], [96, 171], [92, 115], [140, 80]],
    [[445, 31], [462, 7], [503, 8], [521, 45], [507, 82], [558, 103], [565, 211], [578, 270], [589, 291], [579, 321], [547, 320], [534, 387], [536, 449], [522, 510], [538, 535], [501, 545], [427, 539], [432, 484], [420, 426], [427, 369], [411, 318], [367, 317], [373, 276], [385, 262], [400, 112], [443, 86]]
]

const male_lower = [
    [[105, 235], [207, 236], [218, 291], [209, 398], [214, 433], [209, 543], [100, 542], [103, 449], [96, 424], [103, 389], [90, 298]],
    [[409, 231], [509, 231], [518, 281], [518, 349], [510, 398], [518, 431], [508, 542], [404, 542], [402, 429], [405, 391], [394, 289], [400, 240]]
]

const female_lower = [
    [[120, 236], [230, 242], [240, 284], [229, 436], [229, 544], [120, 546], [119, 386], [107, 272]],
    [[425, 237], [536, 240], [549, 318], [530, 546], [423, 542], [423, 369], [412, 309], [416, 255]]
]

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10134037/
function hs_iga_scr(lesion_count) {
    if (lesion_count < 2) {
        return 0;
    }
    else if (lesion_count < 6) {
        return 1;
    }
    else if (lesion_count < 11) {
        return 2;
    }
    else if (lesion_count < 16) {
        return 3;
    }
    else if (lesion_count < 21) {
        return 4;
    }
    else {
        return 5;
    }
}


// https://pubmed.ncbi.nlm.nih.gov/28636793/
// takes in the lesiontypesdict
function ihs4_scr(ltd) {
    let totalNodule = 0;
    let totalAbcess = 0;
    let totalDrainingTunnel = 0;
    let totalNonDrainingTunnel = 0;

    // Iterate over the dictionary
    for (const key in ltd) {
        const lesions = ltd[key];
        totalNodule += lesions["Inflammatory Nodule"] + lesions["Non-Inflammatory Nodule"];
        totalAbcess += lesions["Abcess"];
        totalDrainingTunnel += lesions["Draining Tunnel"];
        totalNonDrainingTunnel += lesions["Non-Draining Tunnel"];
    }

    return totalNodule + 2 * totalAbcess + 4 * totalDrainingTunnel
}

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10149852/
// PGA includes non-inflammatory nodules (physician)
function pga_scr(ltd) {
    let totalNodule_inf = 0;
    let totalNodule_non_inf = 0;
    let totalAbcess = 0;
    let totalDrainingTunnel = 0;
    let totalNonDrainingTunnel = 0;

    // Iterate over the dictionary
    for (const key in ltd) {
        const lesions = ltd[key];
        totalNodule_inf += lesions["Inflammatory Nodule"];
        totalNodule_non_inf += lesions["Non-Inflammatory Nodule"];
        totalAbcess += lesions["Abcess"];
        totalDrainingTunnel += lesions["Draining Tunnel"];
        totalNonDrainingTunnel += lesions["Non-Draining Tunnel"];
    }

    ab_df = totalAbcess + totalDrainingTunnel;

    // they cannot be clear, they must have HS so returning 1 is not a possibility
    if (ab_df == 0) {
        if (totalNodule_inf == 0) {
            if (totalNodule_non_inf == 0) {
                return 1;
            }
            else {
                return 2;
            }
        }
        if (totalNodule_inf < 5) {
            return 3;
        }
        else {
            return 4;
        }
    }
    else if (ab_df == 1) {
        if (totalNodule_inf == 0) {
            return 3;
        }
        else {
            return 4;
        }
    }
    else if (ab_df < 6) {
        if (totalNodule_inf < 10) {
            return 4;
        }
        else {
            return 5;
        }
    }
    return 6;
}