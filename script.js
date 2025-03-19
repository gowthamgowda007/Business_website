document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    alert("Your message has been sent successfully!");

    // Simulating form submission
    window.location.href = "mailto:gowtham.se21@bmsce.ac.in?subject=New Contact Message&body=Name: " + 
    document.querySelector("input[type='text']").value + "%0AEmail: " +
    document.querySelector("input[type='email']").value + "%0AMessage: " +
    document.querySelector("textarea").value;
});
