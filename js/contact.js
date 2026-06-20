(function () {
  'use strict';

  var form        = document.getElementById('contactForm');
  var successMsg  = document.getElementById('contactSuccessMsg');
  var errorMsg    = document.getElementById('contactErrorMsg');

  function showMsg(el, duration) {
    el.style.display = 'block';
    setTimeout(function () {
      el.style.display = 'none';
    }, duration || 4000);
  }

  function resetForm() {
    form.querySelectorAll('input:not([type="submit"]), textarea').forEach(function (el) {
      el.value = '';
    });
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = (document.getElementById('name')    || {}).value || '';
    var email   = (document.getElementById('email')   || {}).value || '';
    var phone   = (document.getElementById('phone')   || {}).value || '';
    var subject = (document.getElementById('subject') || {}).value || '';
    var message = (document.getElementById('message') || {}).value || '';

    // Basic validation — name and email are required
    if (!name.trim() || !email.trim()) {
      showMsg(errorMsg, 4000);
      return;
    }

    // Build mailto body
    var body = [
      'Name: '    + name,
      'Email: '   + email,
      'Phone: '   + (phone   || 'N/A'),
      '',
      'Message:',
      message     || '(no message)'
    ].join('%0D%0A');

    var mailtoLink =
      'mailto:geococosimpex@gmail.com' +
      '?subject=' + encodeURIComponent(subject || 'Enquiry from GeCocos Website') +
      '&body='    + body;

    // Open default mail client
    window.location.href = mailtoLink;

    // Show success feedback and clear the form
    showMsg(successMsg, 5000);
    resetForm();
  });

})();
