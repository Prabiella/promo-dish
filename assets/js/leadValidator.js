class LeadValidator {
    constructor(formId) {
      this.form = document.getElementById(formId);
      if (!this.form) return;
  
      this.fields = {
        leadName: this.form.querySelector('[name="leadName"]'),
        leadPhone: this.form.querySelector('[name="leadPhone"]'),
        privacyCheck: this.form.querySelector('[name="privacyCheck"]'),
      };
  
      this.init();
    }
  
    init() {
      this.form.addEventListener("submit", (e) => {
        if (!this.validateForm()) e.preventDefault();
      });
  
      [this.fields.leadName, this.fields.leadPhone].forEach((input) => {
        if (!input) return;
        input.addEventListener("blur", () => this.validateField(input));
      });
  
      if (this.fields.privacyCheck) {
        this.fields.privacyCheck.addEventListener("change", () =>
          this.validateCheckbox(this.fields.privacyCheck)
        );
      }
  
      if (this.fields.leadPhone) {
        this.fields.leadPhone.addEventListener("input", (e) =>
          this.handlePhoneInput(e.target)
        );
      }
    }
  
    validateForm() {
      let valid = true;
  
      if (!this.validateField(this.fields.leadName)) valid = false;
      if (!this.validateField(this.fields.leadPhone)) valid = false;
      if (!this.validateCheckbox(this.fields.privacyCheck)) valid = false;
  
      return valid;
    }
  
    validateField(input) {
      if (!input) return false;
  
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
  
        case "leadPhone": {
          const clean = value.replace(/\D/g, "");
          if (!/^[0-9]{10}$/.test(clean)) {
            isValid = false;
            message = "Ingresa un teléfono de 10 dígitos.";
          }
          break;
        }
      }
  
      this.setFieldState(input, isValid, message);
      return isValid;
    }
  
    validateCheckbox(checkbox) {
      if (!checkbox) return false;
  
      const isValid = checkbox.checked;
      const message = isValid ? "" : "Debes aceptar el aviso de privacidad.";
  
      checkbox.classList.toggle("is-invalid", !isValid);
      this.setCheckboxFeedback(checkbox, isValid, message);
  
      return isValid;
    }
  
    setFieldState(input, isValid, message) {
      // usa el id del input (si no tiene, usa name)
      const key = input.id || input.name;
  
      let feedback = this.form.querySelector(`.invalid-feedback[data-for="${key}"]`);
  
      if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        feedback.dataset.for = key;
        input.insertAdjacentElement("afterend", feedback);
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
  
    setCheckboxFeedback(checkbox, isValid, message) {
      const formCheck = checkbox.closest(".form-check");
      if (!formCheck) return;
  
      let feedback = formCheck.querySelector(".invalid-feedback");
  
      if (!feedback) {
        feedback = document.createElement("div");
        // d-block para que se vea debajo del checkbox aunque no uses "was-validated"
        feedback.className = "invalid-feedback d-block m-0";
        formCheck.appendChild(feedback);
      }
  
      if (!isValid) {
        feedback.textContent = message;
        feedback.style.display = "block";
      } else {
        feedback.textContent = "";
        feedback.style.display = "none";
      }
    }
  
    handlePhoneInput(input) {
      input.value = input.value.replace(/\D/g, "").slice(0, 10);
  
      if (input.value.length === 0) {
        input.classList.remove("is-valid", "is-invalid");
        return;
      }
  
      if (input.value.length < 10) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return;
      }
  
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  }
  
  // ✅ Inicializa ambos:
  new LeadValidator("leadCampaign");       // desktop
  new LeadValidator("leadCampaignModal");  // modal
  