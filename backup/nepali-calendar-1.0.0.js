const nepali_digits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const nepali_places = [
    "",
    "सय",
    "हजार",
    "लाख",
    "करोड",
    "अरब",
    "खरब",
    "निल",
    "पद्म",
    "संख्य",
];
const digits_word_nepali = [
    "",
    "एक",
    "दुई",
    "तीन",
    "चार",
    "पाँच",
    "छ",
    "सात",
    "आठ",
    "नौँ",
    "दश",
    "एघार",
    "बाह्र ",
    "तेह्र",
    "चौध",
    "पन्ध्र",
    "साेह्र",
    "सत्र",
    "अठार",
    "उन्नाइस",
    "बीस",
    "एक्काइस",
    "बाइस",
    "तेइस",
    "चौबीस",
    "पच्चीस",
    "छब्बिस",
    "सत्ताइस",
    "अठ्ठाइस",
    "उन्नतीस",
    "तीस",
    "एकतीस",
    "बत्तीस",
    "तेत्तिस",
    "चौतीस",
    "पैँतीस",
    "छत्तिस",
    "सैँतीस",
    "अँड्तीस",
    "उन्चालीस",
    "चालीस",
    "एकचालीस",
    "बियालीस",
    "त्रिचालिस",
    "चौवालीस",
    "पैँतालीस",
    "छियालीस",
    "सैँतालीस",
    "अँड्चालीस",
    "उन्नपचास",
    "पचास",
    "एकाउन्न",
    "बाउन्न",
    "त्रिपन्न",
    "चौवन्न",
    "पचपन्न",
    "छपन्न",
    "सन्ताउन्न",
    "अन्ठाउन्न",
    "उन्नसाठ्ठी",
    "साठी",
    "एकसठ्ठी",
    "बैसठ्ठी",
    "त्रिसठ्ठी",
    "चौसठ्ठी",
    "पैसठ्ठी",
    "छैसठ्ठी",
    "सँड्सठ्ठी",
    "अँड्सठ्ठी",
    "उनान्सत्तरी",
    "सत्तरी",
    "एकहत्तर",
    "बहत्तर",
    "तिहत्तर",
    "चौहत्तर",
    "पचहत्तर",
    "छिहत्तर",
    "सतहत्तर",
    "अठहत्तर",
    "उनासी",
    "असी",
    "एकासी",
    "बिरासी",
    "तिरासी",
    "चौरासी",
    "पचासी",
    "छियासी",
    "सतासी",
    "अठासी",
    "उनान्नब्बे",
    "नब्बे",
    "एकानब्बे",
    "बयानब्बे",
    "त्रियानब्बे",
    "चौरानब्बे",
    "पन्चानब्बे",
    "छयानब्बे",
    "सन्तानब्बे",
    "अन्ठानब्बे",
    "उनान्सय",
    "सय",
];


let lastDate = 31;
let lastDatePreviousMonth = 30;
let today_date = 16;
let first_day = 2;

String.prototype.toNepaliDigits = function() {
    return this.replace(/[0-9]/g, (match, offset, string) => {
        return nepali_digits[match];
    });
};

const NepaliCalendar = function(selector = ".nepali-calendar") {
    this.elements = document.querySelectorAll(selector);
    //console.log("nepali calendar created!");
};

NepaliCalendar.prototype.initialize = function(options = {}) {
    //console.log(this.elements);
    if (options.width) this.setProperty("width", options.width);
    if (options.height) this.setProperty("height", options.height);
    if (options.backgroundColor)
        this.setProperty("backgroundColor", options.backgroundColor);

    options.lang ? this.render(options.lang) : this.render();
};

NepaliCalendar.prototype.setProperty = function(propertyName, propertyValue) {
    this.elements.forEach((element, key) => {
        element.style[propertyName] = propertyValue;
    });
};

NepaliCalendar.prototype.render = function(lang = "nep") {
    let html = `<div class="calendar-contain">
    <section class="calendar__days">
        <section class="calendar__title-bar">
            <span><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
            <span>This month</span>
            <span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
        </section>
        <section class="calendar__top-bar">`;

    if (lang === "nep")
        days_nepali.forEach(
            (day, count) => (html += `<span class="top-bar__days">${day}</span>`)
        );
    else
        days.forEach(
            (day, count) => (html += `<span class="top-bar__days">${day}</span>`)
        );

    html += `
        </section>`;

    html += `<section class="calendar__week">`;
    for (
        pdays = lastDatePreviousMonth - first_day + 1; pdays <= lastDatePreviousMonth; pdays++
    ) {
        html += `
                    <div class="calendar__day inactive">
                        <span class="calendar__intdate">${pdays}</span>`;

        if (lang === "nep")
            html += `<span class="calendar__date">${pdays
        .toString()
        .toNepaliDigits()}</span>`;
        else html += `<span class="calendar__date">${pdays}</span>`;

        html += `<span class="calendar__task">&nbsp;</span>
                    </div>
                `;
    }
    let date = 1;
    for (date; date <= 7 - first_day; date++) {
        html += `
                    <div class="calendar__day">
                        <span class="calendar__intdate">${date}</span>`;
        if (lang === "nep")
            html += `<span class="calendar__date">${date
        .toString()
        .toNepaliDigits()}</span>`;
        else html += `<span class="calendar__date">${date}</span>`;
        html += `<span class="calendar__task"> &nbsp; </span>
                    </div>
                `;
    }
    html += `</section>`;
    for (week = 2; week < 6; week++) {
        html += `<section class="calendar__week">`;
        for (
            week_days = 1; week_days <= 7 && date <= lastDate; date++ && week_days++
        ) {
            if (date != today_date) {
                html += `
                    <div class="calendar__day">
                        <span class="calendar__intdate">${date}</span>`;
                if (lang === "nep")
                    html += `<span class="calendar__date">${date
            .toString()
            .toNepaliDigits()}</span>`;
                else html += `<span class="calendar__date">${date}</span>`;
                html += `<span class="calendar__task"> &nbsp; </span>
                    </div>
                `;
            } else {
                html += `
                <div class="calendar__day today">
                    <span class="calendar__intdate">${date}</span>`;
                if (lang === "nep")
                    html += `<span class="calendar__date">${date
            .toString()
            .toNepaliDigits()}</span>`;
                else html += `<span class="calendar__date">${date}</span>`;
                html += `<span class="calendar__task calendar__task--today"> &nbsp; </span>
                </div>
            `;
            }
        }
        if (week < 5) html += `</section>`;
    }
    date = 1;
    for (pdays = week_days; pdays <= 7; pdays++, date++) {
        html += `
                    <div class="calendar__day inactive">
                        <span class="calendar__intdate">${date}</span>`;
        if (lang === "nep")
            html += `<span class="calendar__date">${date
        .toString()
        .toNepaliDigits()}</span>`;
        else html += `<span class="calendar__date">${date}</span>`;
        html += `<span class="calendar__task">&nbsp;</span>
                    </div>
                `;
    }
    html += ` </section> </section>
        </div>`;

    this.elements.forEach((element, key) => {
        element.innerHTML = html;
    });
};