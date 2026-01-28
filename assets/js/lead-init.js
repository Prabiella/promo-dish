document.addEventListener("DOMContentLoaded", () => {
    new LeadValidator("leadCampaign");       
    const modalValidator = new LeadValidator("leadCampaignModal");
  
    const modalEl = document.getElementById("form-modal");
    const formEl = document.getElementById("leadCampaignModal");
    const formState = document.getElementById("modalFormState");
    const thankState = document.getElementById("modalThankYouState");
  
    if (!modalEl || !formEl || !formState || !thankState) return;
  
    const resetFormUI = () => {
      formEl.reset();
  
      formEl.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
        el.classList.remove("is-valid", "is-invalid");
      });
  
      formEl.querySelectorAll(".invalid-feedback").forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
      });
  
      thankState.classList.add("d-none");
      formState.classList.remove("d-none");
    };
  
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const isValid = modalValidator?.validateForm?.() ?? false;
      if (!isValid) return;
  
      formState.classList.add("d-none");
      thankState.classList.remove("d-none");
  
      setTimeout(() => {
        const instance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        instance.hide();
      }, 5000);
    });
  
    modalEl.addEventListener("hidden.bs.modal", resetFormUI);
  });
  