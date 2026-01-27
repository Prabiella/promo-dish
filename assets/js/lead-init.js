document.addEventListener("DOMContentLoaded", () => {
    new LeadValidator("leadCampaign");     
    new LeadValidator("leadCampaignModal");  
  
    const modalEl = document.getElementById("form-modal");
    const formEl  = document.getElementById("leadCampaignModal");
  
    if (!modalEl || !formEl) return;
  
    const resetForm = () => {
      formEl.reset();
  
      formEl.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
        el.classList.remove("is-valid", "is-invalid");
      });
  
      formEl.querySelectorAll(".invalid-feedback").forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
      });
    };
  
    modalEl.addEventListener("hidden.bs.modal", resetForm);
  });
  