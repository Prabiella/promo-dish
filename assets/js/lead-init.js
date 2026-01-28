document.addEventListener("DOMContentLoaded", () => {
    const desktopValidator = new LeadValidator("leadCampaign");
    const modalValidator = new LeadValidator("leadCampaignModal");
  
    const modalEl = document.getElementById("form-modal");
    const modalFormEl = document.getElementById("leadCampaignModal");
  
    const formState = document.getElementById("modalFormState");
    const thankState = document.getElementById("modalThankYouState");
  
    if (!modalEl || !formState || !thankState) return;
  
    let modalMode = "form";
    let autoCloseTimer = null;
  
    const showState = (mode) => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
  
      if (mode === "thank") {
        formState.classList.add("d-none");
        thankState.classList.remove("d-none");
  
        autoCloseTimer = setTimeout(() => {
          const instance =
            bootstrap.Modal.getInstance(modalEl) ||
            bootstrap.Modal.getOrCreateInstance(modalEl);
  
          instance.hide();
        }, 3000);
      } else {
        thankState.classList.add("d-none");
        formState.classList.remove("d-none");
      }
    };
  
    const resetModalUI = () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
  
      if (modalFormEl) {
        modalFormEl.reset();
  
        modalFormEl.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
          el.classList.remove("is-valid", "is-invalid");
        });
  
        modalFormEl.querySelectorAll(".invalid-feedback").forEach((el) => {
          el.textContent = "";
          el.style.display = "none";
        });
      }
  
      modalMode = "form";
      showState("form");
    };
  
    modalEl.addEventListener("show.bs.modal", () => {
      showState(modalMode);
    });
  
    modalEl.addEventListener("hidden.bs.modal", resetModalUI);
  
    if (modalFormEl) {
      modalFormEl.addEventListener(
        "submit",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
  
          const isValid = modalValidator?.validateForm?.() ?? false;
          if (!isValid) return;
  
          modalMode = "thank";
          showState("thank");
        },
        true
      );
    }
  
    const desktopFormEl = document.getElementById("leadCampaign");
    if (desktopFormEl) {
      desktopFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const isValid = desktopValidator?.validateForm?.() ?? false;
        if (!isValid) return;
  
        modalMode = "thank";
  
        const instance = bootstrap.Modal.getOrCreateInstance(modalEl);
        instance.show();
  
        desktopFormEl.reset();
        desktopFormEl.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
          el.classList.remove("is-valid", "is-invalid");
        });
        desktopFormEl.querySelectorAll(".invalid-feedback").forEach((el) => {
          el.textContent = "";
          el.style.display = "none";
        });
      });
    }
  });
  