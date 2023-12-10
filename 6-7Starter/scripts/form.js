"use-strict";

window.addEventListener("load", function() {
    var petForm = this.document.forms.petForm;
    petForm.elements.weight.onchange = kennelSize;
    petForm.elements.days.onchange = boardDays;
    petForm.elements.sing.onchange = singCheck;
    petForm.elements.cute.onchange = cuteCheck;
    petForm.elements.trick.onchange = trickCheck;
});

// Kennel Size
function kennelSize() {
    var size;
    var weight = document.getElementById("weight").value;
    switch (true) {
        case weight <= 4:
            size = "mini";
            break;
        case weight <= 12 && weight > 4:
            size = "small";
            break;
        case weight <= 50 && weight > 12:
            size = "medium";
            break;
        case weight > 50:
            size = "large";
            break;
        default:
            size = "";
            break;
    }
    petForm.elements.size.value = size;
}

// Boarding Days
function boardDays() {
    var numDays = document.getElementById("days").value;
    var boardFee;
    switch (true) {
        case numDays != null:
            numDays = parseInt(numDays);
            boardFee = (numDays * 19.99).toFixed(2);
            break;
        default:
            numDays = 0;
            boardFee = 0.00;
            break;
    }
    petForm.elements.days.value = numDays;
    petForm.elements.boardingFee.value = boardFee;
    totalCosts();
}

// Total Costs
function totalCosts() {
    var totalCost;
    var registerCost = 0;
    var numEvents = 0;
    var boardCost;
    // Set Boarding Cost
    if (petForm.elements.days.value === "") {
        boardCost = 0;
    }
    else {
        boardCost = Number(petForm.elements.boardingFee.value);
    }
    petForm.elements.boardingCost.value = boardCost.toFixed(2);
    // Sing
    if (petForm.elements.sing.checked) {
        numEvents++;
    }
    // Cute
    if (petForm.elements.cute.checked) {
        numEvents++;
    }
    // Trick
    if (petForm.elements.trick.checked) {
        numEvents++;
    }
    registerCost = 120 * numEvents;
    petForm.elements.registrationCost.value = registerCost.toFixed(2);
    totalCost = registerCost + boardCost;
    petForm.elements.totalCost.value = totalCost.toFixed(2);
}

// Sing
function singCheck() {
    if (petForm.elements.sing.checked) {
        document.getElementById("singAdd").style.display = "block";
    }
    else {
        document.getElementById("singAdd").style.display = "none";
    }
    totalCosts();
}

// Cute
function cuteCheck() {
    if (petForm.elements.cute.checked) {
        document.getElementById("cuteAdd").style.display = "block";
    }
    else {
        document.getElementById("cuteAdd").style.display = "none";
    }
    totalCosts();
}

// Trick
function trickCheck() {
    if (petForm.elements.trick.checked) {
        document.getElementById("trickAdd").style.display = "block";
    }
    else {
        document.getElementById("trickAdd").style.display = "none";
    }
    totalCosts();
}