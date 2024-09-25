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

const male_polygons = {
    "Axillae1": [[100, 130], [118, 203], [83, 204]],
    "Axillae2": [[214, 132], [198, 198], [232, 201]],
    "Groin": [[131, 249], [189, 249], [168, 278], [146, 278]],
    "Buttocks": [[406, 237], [458, 250], [509, 238], [518, 284], [459, 287], [401, 275]],
    "Inframammary": [[105, 153], [209, 153], [201, 176], [111, 175]],
    "Perianal": [[452, 239], [469, 240], [466, 248], [454, 249]],
    "Genital": [[146, 279], [170, 280], [167, 294], [147, 293]],
    "InnerThigh1": [[147, 297], [154, 297], [143, 391], [130, 389]],
    "InnerThigh2": [[158, 297], [169, 297], [178, 395], [170, 395]],
    "InnerThigh3": [[447, 289], [458, 291], [447, 380], [435, 375]],
    "InnerThigh4": [[461, 291], [471, 382], [488, 381], [473, 289]],
    "Axillae3": [[400, 140], [421, 198], [385, 202]],
    "Axillae4": [[517, 138], [500, 202], [536, 204]]
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

const female_polygons = {
    "Axillae1": [[119, 131], [134, 135], [133, 208], [112, 204]],
    "Axillae2": [[212, 133], [225, 127], [234, 213], [214, 212]],
    "Axillae3": [[427, 131], [439, 132], [443, 204], [422, 204]],
    "Axillae4": [[521, 135], [534, 133], [538, 210], [519, 208]],
    "Groin": [[149, 251], [201, 251], [195, 273], [161, 273]],
    "Buttocks": [[426, 244], [480, 261], [536, 249], [543, 295], [494, 302], [480, 289], [469, 302], [416, 283]],
    "Perianal": [[472, 248], [490, 249], [487, 259], [474, 259]],
    "Genital": [[161, 276], [194, 275], [193, 293], [163, 292]],
    "InnerThigh1": [[159, 298], [145, 427], [167, 426], [175, 300]],
    "InnerThigh2": [[178, 300], [194, 298], [200, 437], [182, 430]],
    "InnerThigh3": [[461, 304], [474, 305], [465, 419], [456, 417]],
    "InnerThigh4": [[487, 307], [501, 305], [504, 421], [494, 421]],
    "Inframammary": [[134, 169], [174, 155], [212, 172], [212, 184], [134, 181]]

}