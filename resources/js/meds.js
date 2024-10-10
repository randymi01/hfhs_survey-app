const discontinuedMedsList = [];

const currentMedsList = [];

const biologicsList = [];

const comorbiditiesList = [];



// wrap in an anonymous function so it only runs after DOM is loaded

$(function () {

    // comorbidities autocomplete

    $("#comorbidities").autocomplete({

        source: comorbidities,

        minLength: 1,

        select: function (event, ui) {

            var selected = ui.item.value;

            addComorbidity(selected);

            this.value = ''; // Clear the input field

            return false;

        }

    });



    $("#comorbidities").on("keypress", function (e) {

        if (e.which === 13) { // Enter key

            var customTag = this.value.trim();

            if (customTag && !comorbidities.includes(customTag)) {

                addComorbidity(customTag);

                this.value = ''; // Clear the input field

            }

            e.preventDefault(); // Prevent form submission

        }

    });



    function addComorbidity(comorbidity) {

        var currentComorbidities = $('#selected-comorbidities').text();

        if (!currentComorbidities.includes(comorbidity)) {

            $('#selected-comorbidities').append('<span class="badge bg-secondary me-1 comorbidity-item">' + comorbidity + '</span>');

            comorbiditiesList.push(comorbidity);

        }

    }



    $(document).on('click', '.comorbidity-item', function () {

        var comorbidity = $(this).text().trim(); // Get the text value

        $(this).remove(); // Remove the span

        var index = comorbiditiesList.indexOf(comorbidity);

        if (index > -1) {

            comorbiditiesList.splice(index, 1); // Remove comorbidity from the list

        }

    });



    // current meds autocomplete

    $("#current_hs_meds").autocomplete({

        source: hsMedications,

        minLength: 1,

        select: function (event, ui) {

            var selected = ui.item.value;

            addCurrMed(selected);

            this.value = ''; // Clear the input field

            return false;

        }

    });



    $("#current_hs_meds").on("keypress", function (e) {

        if (e.which === 13) { // Enter key

            var customTag = this.value.trim();

            if (customTag && !hsMedications.includes(customTag)) {

                addCurrMed(customTag);

                this.value = ''; // Clear the input field

            }

            e.preventDefault(); // Prevent form submission

        }

    });



    function addCurrMed(med) {

        var CurrMed = $('#selected-curr-hs-meds').text();

        if (!CurrMed.includes(med)) {

            $('#selected-curr-hs-meds').append('<span class="badge bg-secondary me-1 currmed-item">' + med + '</span>');

            currentMedsList.push(med);

        }

    }



    $(document).on('click', '.currmed-item', function () {

        var currmed = $(this).text().trim(); // Get the text value

        $(this).remove(); // Remove the span

        var index = currentMedsList.indexOf(currmed);

        if (index > -1) {

            currentMedsList.splice(index, 1);

        }

    });



    // discontinued meds autocomplete

    $("#disc_hs_meds").autocomplete({

        source: hsMedications,

        minLength: 1,

        select: function (event, ui) {

            var selected = ui.item.value;

            addDiscMed(selected);

            this.value = ''; // Clear the input field

            return false;

        }

    });



    $("#disc_hs_meds").on("keypress", function (e) {

        if (e.which === 13) { // Enter key

            var customTag = this.value.trim();

            if (customTag && !hsMedications.includes(customTag)) {

                addDiscMed(customTag);

                this.value = ''; // Clear the input field

            }

            e.preventDefault(); // Prevent form submission

        }

    });



    function addDiscMed(med) {

        var CurrMed = $('#selected-disc-hs-meds').text();

        if (!CurrMed.includes(med)) {

            $('#selected-disc-hs-meds').append('<span class="badge bg-secondary me-1 discmed-item">' + med + '</span>');

            discontinuedMedsList.push(med);

        }

    }



    $(document).on('click', '.discmed-item', function () {

        var discmed = $(this).text().trim(); // Get the text value

        $(this).remove(); // Remove the span

        var index = discontinuedMedsList.indexOf(discmed);

        if (index > -1) {

            discontinuedMedsList.splice(index, 1);

        }

    });



    // biologics list autocomplete

    $("#biologics_list").autocomplete({

        source: hsBiologics,

        minLength: 1,

        select: function (event, ui) {

            var selected = ui.item.value;

            addBiologic(selected);

            this.value = ''; // Clear the input field

            return false;

        }

    });



    $("#biologics_list").on("keypress", function (e) {

        if (e.which === 13) { // Enter key

            var customTag = this.value.trim();

            if (customTag && !hsMedications.includes(customTag)) {

                addBiologic(customTag);

                this.value = ''; // Clear the input field

            }

            e.preventDefault(); // Prevent form submission

        }

    });



    function addBiologic(med) {

        var CurrMed = $('#selected-biologics').text();

        if (!CurrMed.includes(med)) {

            $('#selected-biologics').append('<span class="badge bg-secondary me-1 biologic-item">' + med + '</span>');

            biologicsList.push(med);

        }

    }



    $(document).on('click', '.biologic-item', function () {

        var bio_item = $(this).text().trim(); // Get the text value

        $(this).remove(); // Remove the span

        var index = biologicsList.indexOf(bio_item);

        if (index > -1) {

            biologicsList.splice(index, 1);

        }

    });

});