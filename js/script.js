// ===============================
// SIDEBAR NAVIGATION
// ===============================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    document
        .getElementById(sectionId)
        .classList.remove("hidden");
}

// ===============================
// DASHBOARD DATA
// ===============================

let totalAnalysis =
    Number(localStorage.getItem("totalAnalysis")) || 0;

let strongPasswords =
    Number(localStorage.getItem("strongPasswords")) || 0;

let weakPasswords =
    Number(localStorage.getItem("weakPasswords")) || 0;

function updateDashboard() {

    document.getElementById("totalAnalysis").innerText =
        totalAnalysis;

    document.getElementById("strongPasswords").innerText =
        strongPasswords;

    document.getElementById("weakPasswords").innerText =
        weakPasswords;
}

updateDashboard();

// ===============================
// PASSWORD ANALYZER
// ===============================

const passwordInput =
    document.getElementById("password");

const strengthText =
    document.getElementById("strengthText");

const strengthBar =
    document.getElementById("bar");

const recommendationList =
    document.getElementById("recommendations");

passwordInput.addEventListener("input", () => {

    const password =
        passwordInput.value;

    let score = 0;

    let recommendations = [];

    if(password.length >= 8) {
        score++;
    } else {
        recommendations.push(
            "Use at least 8 characters"
        );
    }

    if(/[A-Z]/.test(password)) {
        score++;
    } else {
        recommendations.push(
            "Add uppercase letters"
        );
    }

    if(/[a-z]/.test(password)) {
        score++;
    } else {
        recommendations.push(
            "Add lowercase letters"
        );
    }

    if(/[0-9]/.test(password)) {
        score++;
    } else {
        recommendations.push(
            "Add numbers"
        );
    }

    if(/[!@#$%^&*()_+\-=]/.test(password)) {
        score++;
    } else {
        recommendations.push(
            "Add special characters"
        );
    }

    recommendationList.innerHTML = "";

    recommendations.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        recommendationList.appendChild(li);
    });

    totalAnalysis++;

    let level = "";

    switch(score) {

        case 1:
            level = "Very Weak";
            strengthBar.style.width = "20%";
            strengthBar.style.background = "#ef4444";
            weakPasswords++;
            break;

        case 2:
            level = "Weak";
            strengthBar.style.width = "40%";
            strengthBar.style.background = "#f97316";
            weakPasswords++;
            break;

        case 3:
            level = "Medium";
            strengthBar.style.width = "60%";
            strengthBar.style.background = "#eab308";
            break;

        case 4:
            level = "Strong";
            strengthBar.style.width = "80%";
            strengthBar.style.background = "#22c55e";
            strongPasswords++;
            break;

        case 5:
            level = "Very Strong";
            strengthBar.style.width = "100%";
            strengthBar.style.background = "#16a34a";
            strongPasswords++;
            break;

        default:
            level = "Password Strength";
            strengthBar.style.width = "0%";
    }

    strengthText.innerText =
        `Password Strength: ${level}`;

    localStorage.setItem(
        "totalAnalysis",
        totalAnalysis
    );

    localStorage.setItem(
        "strongPasswords",
        strongPasswords
    );

    localStorage.setItem(
        "weakPasswords",
        weakPasswords
    );

    updateDashboard();
});

// ===============================
// PASSWORD GENERATOR
// ===============================

function generatePassword() {

    const length =
        Number(
            document.getElementById("length").value
        );

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()_+-=[]{}";

    let password = "";

    for(let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        password +=
            characters[randomIndex];
    }

    document.getElementById(
        "generatedPassword"
    ).value = password;
}

// ===============================
// ENTROPY CALCULATOR
// ===============================

function calculateEntropy() {

    const password =
        document.getElementById(
            "entropyInput"
        ).value;

    if(password.length === 0) {

        document.getElementById(
            "entropyResult"
        ).innerText =
            "Please enter a password.";

        return;
    }

    const charsetSize = 94;

    const entropy =
        password.length *
        Math.log2(charsetSize);

    let level = "";

    if(entropy < 40) {
        level = "Weak";
    }
    else if(entropy < 60) {
        level = "Medium";
    }
    else {
        level = "Strong";
    }

    document.getElementById(
        "entropyResult"
    ).innerHTML = `
        Entropy: ${entropy.toFixed(2)} bits
        <br>
        Security Level: ${level}
    `;
}

// ===============================
// SHA-256 HASH GENERATOR
// ===============================

async function generateHash() {

    const text =
        document.getElementById(
            "hashInput"
        ).value;

    if(text.trim() === "") {

        alert("Please enter text.");

        return;
    }

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(text);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    const hashHex =
        hashArray
        .map(byte =>
            byte
            .toString(16)
            .padStart(2, "0")
        )
        .join("");

    document.getElementById(
        "hashResult"
    ).value = hashHex;
}

// ===============================
// INITIAL PAGE
// ===============================

showSection("dashboard");