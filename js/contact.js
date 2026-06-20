(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('contactSubmitBtn');
  var successMsg = document.getElementById('contactSuccessMsg');
  var errorMsg = document.getElementById('contactErrorMsg');

  function showMsg(el, duration) {
    el.style.display = 'block';
    setTimeout(function () {
      el.style.display = 'none';
    }, duration || 4000);
  }

  function resetForm() {
    form.querySelectorAll('input:not([type="submit"]):not([type="hidden"]), textarea').forEach(function (el) {
      el.value = '';
    });
  }

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var name = (document.getElementById('name') || {}).value || '';
    var email = (document.getElementById('email') || {}).value || '';

    // Basic validation — name and email are required
    if (!name.trim() || !email.trim()) {
      errorMsg.textContent = '⚠️ Please fill in all required fields (Name and Email).';
      showMsg(errorMsg, 4000);
      return;
    }

    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Hide any previous messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    var formData = new FormData(form);

    try {
      var response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      var data = await response.json();

      if (response.ok) {
        successMsg.textContent = '✅ Thank you! Your message has been sent successfully.';
        showMsg(successMsg, 5000);
        resetForm();
      } else {
        errorMsg.textContent = '⚠️ Error: ' + (data.message || 'Something went wrong.');
        showMsg(errorMsg, 5000);
      }
    } catch (error) {
      errorMsg.textContent = '⚠️ Something went wrong. Please try again.';
      showMsg(errorMsg, 5000);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

})();
