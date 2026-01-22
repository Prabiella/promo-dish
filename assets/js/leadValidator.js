// leadValidator.js
class LeadValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        this.form.addEventListener("submit", (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
            }
        });

        this.form.querySelectorAll("input").forEach(input => {
            input.addEventListener("blur", () => this.validateField(input));
        });
    }

    validateForm() {
        let valid = true;
        this.form.querySelectorAll("input").forEach(input => {
            if (!this.validateField(input)) {
                valid = false;
            }
        });
        return valid;
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let message = "";

        switch (input.name) {
            case "leadName":
                if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(value)) {
                    isValid = false;
                    message = "Ingresa un nombre válido (mínimo 3 letras).";
                }
                break;

            case "leadMail":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    message = "Correo electrónico inválido.";
                }
                break;

                case "leadPhone":
                    const clean = value.replace(/\D/g, "");
                    if (!/^[0-9]{10}$/.test(clean)) {
                        isValid = false;
                       
                    }
                    break;
                

            case "leadCP":
                if (!/^[0-9]{5}$/.test(value)) {
                    isValid = false;
                    message = "El código postal debe tener 5 dígitos.";
                }
                break;
        }

        this.setFieldState(input, isValid, message);
        return isValid;
    }

    setFieldState(input, isValid, message) {
        let feedback = input.parentNode.querySelector(".invalid-feedback");
    
        if (!feedback) {
            feedback = document.createElement("div");
            feedback.className = "invalid-feedback";
            input.parentNode.appendChild(feedback);
        }
    
        if (!isValid) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            feedback.textContent = message;
            feedback.style.display = "block";
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            feedback.textContent = "";
            feedback.style.display = "none";
        }
    }
    
}



const phoneInput = document.getElementById("leadPhone");
const phoneHelp = document.getElementById("phoneHelp");

phoneInput.addEventListener("input", function () {
    // Solo números
    this.value = this.value.replace(/\D/g, "");

    const value = this.value;

    if (value.length === 0) {
        phoneHelp.textContent = "Ingresa un número de 10 dígitos.";
        phoneHelp.className = "form-text text-muted";
        phoneInput.classList.remove("is-valid", "is-invalid");
    } 
    else if (value.length < 10) {
        phoneHelp.textContent = `Faltan ${10 - value.length} dígitos`;
        phoneHelp.className = "form-text text-danger";
        phoneInput.classList.add("is-invalid");
        phoneInput.classList.remove("is-valid");
    } 
    else if (value.length === 10) {
        phoneHelp.textContent = "Número válido ✔";
        phoneHelp.className = "form-text text-success";
        phoneInput.classList.remove("is-invalid");
        phoneInput.classList.add("is-valid");
    } 
    else {
        phoneHelp.textContent = "Máximo 10 dígitos";
        phoneHelp.className = "form-text text-danger";
        phoneInput.classList.add("is-invalid");
        phoneInput.classList.remove("is-valid");
        this.value = value.slice(0, 10);
    }
});

