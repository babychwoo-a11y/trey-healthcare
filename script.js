   

 let appointments = 
    JSON.parse(localStorage.getItem("appointments")) || [];

            function welcomePatient() {
                alert("Welcome to Trey Healthcare!")
            }
        
        
            function bookAppointment() {

    let doctor = document.getElementById("doctor").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("time").value;

    if (date === "") {
    alert("Please choose an appointment date.");
    return;
}
updateAdminDashboard();

let today = new Date();
today.setHours(0,0,0,0);

let selectedDate = new Date(date);

if (selectedDate < today) {
    alert("You cannot book an appointment in the past.");
    return;
}

let exists = appointments.some(function(app) {
    return (
        app.doctor === doctor &&
        app.date === date &&
        app.time === time
    );
});

if (exists) {
    alert("This appointment slot is already booked.");
    return;
}

    let appointment = {
        id: "TR-" + (appointments.length + 1).toString().padStart(3, "0"),
        doctor: doctor,
        date: date,
        time: time,
        status: "Upcoming"
    };
    console.log(appointments);

    appointments.push(appointment);
    document.getElementById("receipt").style.display = "block";

document.getElementById("receiptId").innerText = appointment.id;
document.getElementById("receiptDoctor").innerText = appointment.doctor;
document.getElementById("receiptDate").innerText = appointment.date;
document.getElementById("receiptTime").innerText = appointment.time;
document.getElementById("receiptStatus").innerText = appointment.status;

    localStorage.setItem("appointments", JSON.stringify(appointments));

    displayAppointments();
    updateAvailableTimes();
    updateDashboard();
    updateDoctorStatus();
    updateAnalytics();
   
    alert("Appointment booked successfully!");
    document.getElementById("receipt").style.display = "block";

document.getElementById("receiptId").innerText = appointment.id;
document.getElementById("receiptDoctor").innerText = doctor;
document.getElementById("receiptDate").innerText = date;
document.getElementById("receiptTime").innerText = time;
document.getElementById("receiptStatus").innerText = appointment.status;
   addNotification(
    "✅ Appointment booked with " +
    doctor +
    " on " +
    date +
    " at " +
    time
);
document.getElementById("timelineBooking").innerText =
doctor + " on " + date + " at " + time;

document.getElementById("timelineDoctor").innerText =
doctor + " has been assigned.";

document.getElementById("timelineStatus").innerText =
"Appointment Confirmed";
        
        
document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Appointment booked successfully!");
    issuePrescription();
});
            }



    function displayAppointments() {

    let table = document.getElementById("historyTable");

    table.innerHTML = "";

    appointments.forEach(function(app,index) {

        let row = table.insertRow();

        row.insertCell(0).innerHTML = app.id;
        row.insertCell(1).innerHTML = app.doctor;
        row.insertCell(2).innerHTML = app.date;
        row.insertCell(3).innerHTML = app.time;
       let statusClass =
app.status === "Completed"
? "completed"
: "upcoming";

row.insertCell(4).innerHTML =
'<span class="' +
statusClass +
'">' +
app.status +
'</span>';
        let actionCell = row.insertCell(5);
        actionCell.innerHTML =
'<button onclick="completeAppointment('+ index +')">Complete</button> ' +
'<button onclick="deleteAppointment('+ index +')">Delete</button>';

    });

}
function updateDashboard() {

    document.getElementById("appointmentCount").innerText =
        "Appointments Booked: " + appointments.length;

    document.getElementById("doctorCount").innerText =
        "Doctors Available: " + document.querySelectorAll(".doctor").length;

}

function updateAdminDashboard(){

    let completed = appointments.filter(function(app){
        return app.status === "Completed";
    }).length;

    let upcoming = appointments.filter(function(app){
        return app.status === "Upcoming";
    }).length;

    document.getElementById("adminPatients").innerText =
        localStorage.getItem("name") ? 1 : 0;

    document.getElementById("adminAppointments").innerText =
        appointments.length;

    document.getElementById("adminCompleted").innerText =
        completed;

    document.getElementById("adminUpcoming").innerText =
        upcoming;

}
  


const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function() {
    let text = searchBox.value.toLowerCase();

    let doctors = document.querySelectorAll(".doctor");

    doctors.forEach(function(doctor) {
        if (doctor.textContent.toLowerCase().includes(text)) {
            doctor.style.display = "block";
        } else {
            doctor.style.display = "none";
        }
    });
});


    function toggleDarkMode() {
        document.body.classList.toggle("dark")
    }


let patients = 0;

function addPatients() {
    patients++;
    document.getElementById("counter").innerText =
        "Patients Served: " + patients;
}

document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

  let savedEmail = localStorage.getItem("email");
let savedPassword = localStorage.getItem("password");
let savedName = localStorage.getItem("name");

if (email === savedEmail && password === savedPassword) {

    alert("Login Successful!");
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem(
    "lastLogin",
    new Date().toLocaleString()
);

    document.getElementById("patientName").innerText =
        "Patient: " + savedName;
    document.getElementById("welcomeMessage").innerText = 
         '👋 Welcome back, ${savedName!}';
         
         document.getElementById("profileName").value = savedName;
         document.getElementById("profileEmail").value = savedName;

    // Scroll to the dashboard
    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block"
} else {

    alert("Incorrect Email or Password");

}

});


 let savedName = localStorage.getItem("name");
let savedEmail = localStorage.getItem("email");

if(savedName){

    document.getElementById("patientName").innerText = savedName;

}

if(savedEmail){

    document.getElementById("patientEmail").value = savedEmail;

}


document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration successful!");
});

   

    displayAppointments();
    updateDashboard(); 

   function deleteAppointment(index){

    let app = appointments[index];

    let confirmCancel = confirm(
        "⚠️ Cancel this appointment?\n\n" +
        "Doctor: " + app.doctor + "\n" +
        "Date: " + app.date + "\n" +
        "Time: " + app.time
    );

    if(!confirmCancel){
        return;
    }

    appointments.splice(index, 1);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    displayAppointments();
    updateDashboard();
    updateDoctorStatus();
    updateAvailableTimes();
    updateAnalytics();


    addNotification(
        "❌ Appointment with " +
        app.doctor +
        " on " +
        app.date +
        " has been cancelled."
    );

    alert("Appointment cancelled successfully.");

}
    
   

function saveProfile(){

    let name = document.getElementById("profileName").value;
    let email = document.getElementById("profileEmail").value;
    let phone = document.getElementById("profilePhone").value;

    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);
    localStorage.setItem("profilePhone", phone);

    document.getElementById("patientName").innerText =
        "Patient: " + name;

    alert("Profile Updated Successfully!");
}
document.getElementById("profileName").value =
    localStorage.getItem("profileName") || "";

document.getElementById("profileEmail").value =
    localStorage.getItem("profileEmail") || "";

document.getElementById("profilePhone").value =
    localStorage.getItem("profilePhone") || "";

    const imageUpload = document.getElementById("imageUpload");

imageUpload.addEventListener("change", function(){

    const file = imageUpload.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            document.getElementById("profilePic").src =
                e.target.result;

            localStorage.setItem(
                "profilePicture",
                e.target.result
            );

        };

        reader.readAsDataURL(file);

    }

});
let savedPicture =
localStorage.getItem("profilePicture");

if(savedPicture){

    document.getElementById("profilePic").src =
    savedPicture;

}

document.getElementById("contactForm").addEventListener("submit", function(event){

    event.preventDefault();

    alert("Thank you! Your message has been sent.");

});

    function logout() {

    alert("Logged out successfully!");

    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";

    document.getElementById("login").scrollIntoView({
        behavior: "smooth"
    });

}

    if(localStorage.getItem("loggedIn") === "true"){

    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";

}

    function saveMedicalRecord(){

    localStorage.setItem(
        "bloodGroup",
        document.getElementById("bloodGroup").value
    );

    localStorage.setItem(
        "allergies",
        document.getElementById("allergies").value
    );

    localStorage.setItem(
        "medication",
        document.getElementById("medication").value
    );

    localStorage.setItem(
        "height",
        document.getElementById("height").value
    );

    localStorage.setItem(
        "weight",
        document.getElementById("weight").value
    );

    localStorage.setItem(
        "emergencyContact",
        document.getElementById("emergencyContact").value
    );
    
    updateHealthSummary();
    alert("Medical record saved successfully!");

}

    document.getElementById("bloodGroup").value =
localStorage.getItem("bloodGroup") || "";

document.getElementById("allergies").value =
localStorage.getItem("allergies") || "";

document.getElementById("medication").value =
localStorage.getItem("medication") || "";

document.getElementById("height").value =
localStorage.getItem("height") || "";

document.getElementById("weight").value =
localStorage.getItem("weight") || "";

document.getElementById("emergencyContact").value =
localStorage.getItem("emergencyContact") || "";

function animateCounter(id, target) {

    let count = 0;

    let interval = setInterval(function () {

        count++;

      if(id === "doctorStat"){
    document.getElementById(id).innerText = count + "+";
}
else if(id === "patientStat"){
    document.getElementById(id).innerText = count.toLocaleString() + "+";
}
else if(id === "satisfactionStat"){
    document.getElementById(id).innerText = count + "%";
}
else{
    document.getElementById(id).innerText = count;
}

        document.getElementById(id).innerText = count;

        if (count >= target) {
            clearInterval(interval);
        }

    }, 30);

}

animateCounter("doctorStat", 25);
animateCounter("patientStat", 12000);
animateCounter("satisfactionStat", 99);

const currentDate = new Date();

document.getElementById("todayDate").innerText =
"Today: " + currentDate.toDateString();

let lastLogin = localStorage.getItem("lastLogin");

if (lastLogin) {
    document.getElementById("lastLogin").innerHTML =
"🕒 <strong>Last Login:</strong> " + lastLogin;
}

window.addEventListener("load", function(){

    setTimeout(function(){

        document.getElementById("loader").style.display = "none";
        document.getElementById("mainContent").style.display = "block";

    }, 1500);

});

function updateHealthSummary(){

    document.getElementById("summaryBlood").innerText =
        localStorage.getItem("bloodGroup") || "Not Set";

    document.getElementById("summaryHeight").innerText =
        (localStorage.getItem("height") || "--") + " cm";

    document.getElementById("summaryWeight").innerText =
        (localStorage.getItem("weight") || "--") + " kg";

    document.getElementById("summaryAllergies").innerText =
        localStorage.getItem("allergies") || "None";

}
updateHealthSummary();

function openDoctor(name, specialty, rating, experience, email, phone, hours, reviews){

    document.getElementById("modalName").innerText = name;
    document.getElementById("modalSpecialty").innerText = "🩺 " + specialty;
    document.getElementById("modalRating").innerText = "⭐ " + rating;
    document.getElementById("modalExperience").innerText = "🎓 " + experience;
    document.getElementById("modalEmail").innerText = "📧 " + email;
    document.getElementById("modalPhone").innerText = "📞 " + phone;
    document.getElementById("modalHours").innerText = "🕒 " + hours;

    let reviewList = document.getElementById("doctorReviews");
    reviewList.innerHTML = "";

    reviews.forEach(function(review){
        let li = document.createElement("li");
        li.innerText = review;
        reviewList.appendChild(li);
    });

    document.getElementById("doctorModal").style.display = "block";
}

function updateAvailableTimes(){

    let doctor = document.getElementById("doctor").value;

    let select = document.getElementById("time");

    let options = select.options;

    for(let i = 0; i < options.length; i++){

        options[i].disabled = false;
        options[i].text = options[i].value;

    }

    appointments.forEach(function(app){

        if(app.doctor === doctor){

            for(let i = 0; i < options.length; i++){

                if(options[i].value === app.time){

                    options[i].disabled = true;
                    options[i].text =
                        options[i].value + " (Booked)";

                }

            }

        }

    });

}

function addNotification(message){

    let list = document.getElementById("notificationList");

    if(list.innerHTML.includes("No notifications yet.")){
        list.innerHTML = "";
    }

    let note = document.createElement("div");

    note.className = "notification";

    note.innerHTML =
        "<strong>" +
        new Date().toLocaleString() +
        "</strong><br>" +
        message;

    list.prepend(note);
    addBellNotification();

}

function printReceipt(){

    let receipt = document.getElementById("receipt").innerHTML;

    let newWindow = window.open("", "", "width=700,height=700");

    newWindow.document.write(`
        <html>
        <head>
            <title>Trey Healthcare Receipt</title>
        </head>
        <body>
            <h2>Trey Healthcare</h2>
            ${receipt}
        </body>
        </html>
    `);

    newWindow.document.close();

    newWindow.print();

}

function askAssistant(){

    let input = document.getElementById("userQuestion");
    let question = input.value.toLowerCase();

    let answer = "Please consult one of our doctors for professional medical advice.";

    if(question.includes("malaria")){
        answer = "Common symptoms include fever, chills, headache, sweating and body aches.";
    }
    else if(question.includes("blood pressure")){
        answer = "Eat healthy foods, exercise regularly, reduce salt intake and consult your doctor.";
    }
    else if(question.includes("covid")){
        answer = "Common symptoms include fever, cough, sore throat and fatigue.";
    }
    else if(question.includes("headache")){
        answer = "Drink water, rest and seek medical care if the headache is severe or persistent.";
    }
    else if(question.includes("diabetes")){
        answer = "Diabetes affects blood sugar levels. Regular monitoring and a healthy lifestyle are important.";
    }

    let chat = document.getElementById("chatBox");

    chat.innerHTML +=
        "<p><strong>You:</strong> " + input.value + "</p>";

    chat.innerHTML +=
        "<p><strong>Assistant:</strong> " + answer + "</p>";

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

}

function showEmergency(){

    let box = document.getElementById("emergencyInfo");

    if(box.style.display === "none"){
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }

}

function checkDoctorAvailability(){

    let doctor = document.getElementById("doctor").value;

    let bookBtn = document.getElementById("bookBtn");

    if(
        doctor === "Dr. Brian"
    ){

        alert("Dr. Brian is currently on leave.");

        bookBtn.disabled = true;

    }else{

        bookBtn.disabled = false;

    }

}

function printReceipt(){
    window.print();
}

updateAdminDashboard();
loadChart();

function loadChart() {

    let completed = appointments.filter(function(app) {
        return app.status === "Completed";
    }).length;

    let upcoming = appointments.filter(function(app) {
        return app.status === "Upcoming";
    }).length;

    let cancelled = appointments.filter(function(app) {
        return app.status === "Cancelled";
    }).length;

    new Chart(
        document.getElementById("appointmentChart"),
        {
            type: "bar",
            data: {
                labels: ["Upcoming", "Completed", "Cancelled"],
                datasets: [{
                    label: "Appointments",
                    data: [upcoming, completed, cancelled]
                }]
            }
        }
    );


}

function askAssistant(){

    let question =
    document.getElementById("userQuestion").value.toLowerCase();

    let answer = "";

    if(question.includes("appointment")){

        answer =
        "📅 To book an appointment, go to the Appointments section, choose a doctor, date and time, then click Book Appointment.";

    }
    else if(question.includes("doctor")){

        answer =
        "👨‍⚕️ We have Cardiologists, Pediatricians, Neurologists and Dermatologists.";

    }
    else if(question.includes("emergency")){

        answer =
        "🚑 Call our emergency hotline 999 or visit the nearest Trey Healthcare branch immediately.";

    }
    else if(question.includes("hours")){

        answer =
        "🕒 We are open Monday–Friday (8:00 AM – 8:00 PM) and Saturday–Sunday (9:00 AM – 5:00 PM).";

    }
    else if(question.includes("location")){

        answer =
        "📍 Trey Healthcare is located in Nairobi, Kenya.";

    }
    else{

        answer =
        "🤖 Sorry, I don't understand that yet. Please ask about appointments, doctors, emergency services, hours or location.";

    }

    let chat =
    document.getElementById("chatBox");

   chat.innerHTML +=
"<p id='typing'><strong>Assistant:</strong> Typing...</p>";

setTimeout(function(){

    document.getElementById("typing").remove();

    chat.innerHTML +=
    "<p><strong>Assistant:</strong> " + answer + "</p>";

    chat.scrollTop = chat.scrollHeight;

},1000);

    chat.innerHTML +=
"<p><strong>🧑 You:</strong> " + question + "</p>";

chat.scrollTop = chat.scrollHeight;

    document.getElementById("userQuestion").value = "";

}

document.getElementById("userQuestion").addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        event.preventDefault();

        askAssistant();

    }

});

function saveMedicine(){

    let medicine = document.getElementById("medicineName").value;
    let time = document.getElementById("medicineTime").value;

    if(medicine === "" || time === ""){
        alert("Please enter the medicine and time.");
        return;
    }

    let reminders =
    JSON.parse(localStorage.getItem("medicineReminders")) || [];

    reminders.push({
        medicine: medicine,
        time: time
    });

    localStorage.setItem(
        "medicineReminders",
        JSON.stringify(reminders)
    );

    displayMedicine();

    document.getElementById("medicineName").value = "";
    document.getElementById("medicineTime").value = "";

    alert("Medicine reminder saved!");

}

function displayMedicine(){

    let reminders =
    JSON.parse(localStorage.getItem("medicineReminders")) || [];

    let list = document.getElementById("medicineList");

    list.innerHTML = "";

    if(reminders.length === 0){

        list.innerHTML = "No reminders yet.";
        return;

    }

    reminders.forEach(function(item){

        list.innerHTML +=
        "<p>💊 <strong>" +
        item.medicine +
        "</strong> — 🕒 " +
        item.time +
        "</p>";

    });

}

displayMedicine();

const healthTips = [

"💧 Drink at least 8 glasses of water every day.",

"🚶 Exercise for at least 30 minutes daily.",

"🥗 Eat more fruits and vegetables.",

"😴 Sleep for 7–9 hours every night.",

"🩺 Schedule regular medical checkups.",

"❤️ Manage stress through relaxation and exercise.",

"🧼 Wash your hands regularly to prevent infections."

];

let currentTip = 0;

function rotateHealthTips(){

    document.getElementById("tipBox").innerText =
        healthTips[currentTip];

    currentTip++;

    if(currentTip >= healthTips.length){

        currentTip = 0;

    }

}

rotateHealthTips();

setInterval(rotateHealthTips, 5000);

function issuePrescription(){

    let doctor = document.getElementById("doctor").value;
    let date = document.getElementById("appointmentDate").value;

    let medicine = "";
    let dosage = "";
    let instructions = "";

    if (doctor === "Dr. James Smith") {

        medicine = "Aspirin 75mg";
        dosage = "1 tablet daily";
        instructions = "Take after breakfast.";

    } else if (doctor === "Dr. Sarah Johnson") {

        medicine = "Children's Cough Syrup";
        dosage = "10 ml twice daily";
        instructions = "Shake well before use.";

    } else if (doctor === "Dr. Michael Brown") {

        medicine = "Vitamin B Complex";
        dosage = "1 capsule daily";
        instructions = "Take after lunch.";

    } else {

        medicine = "Hydrocortisone Cream";
        dosage = "Apply twice daily";
        instructions = "Apply only to affected skin.";

    }

    let signature = "";

if (doctor === "Dr. James Smith") {
    signature = "Dr. James Smith";
}
else if (doctor === "Dr. Sarah Johnson") {
    signature = "Dr. Sarah Johnson";
}
else if (doctor === "Dr. Michael Brown") {
    signature = "Dr. Michael Brown";
}
else {
    signature = "Dr. Emily Davis";
}

let prescriptionId =
    "RX-" + Date.now();

document.getElementById("prescriptionId").innerText =
    prescriptionId;

document.getElementById("doctorSignature").innerText =
    signature;

    document.getElementById("prescriptionDoctor").innerText = doctor;
    document.getElementById("prescriptionDate").innerText = date;
    document.getElementById("prescriptionMedicine").innerText = medicine;
    document.getElementById("prescriptionDosage").innerText = dosage;
    document.getElementById("prescriptionInstructions").innerText = instructions;

    localStorage.setItem("prescriptionMedicine", medicine);
    localStorage.setItem("prescriptionDosage", dosage);
    localStorage.setItem("prescriptionInstructions", instructions);

}

function printPrescription(){

    window.print();

}

function toggleMenu(){

    let menu = document.getElementById("navLinks");

    if(menu.style.display === "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }

}

function toggleQuickMenu(){

    let menu = document.getElementById("quickMenu");

    if(menu.style.display === "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }

}



function addBellNotification(){

    notificationCount++;

    document.getElementById("notificationCount").innerText =
        notificationCount;

    localStorage.setItem(
        "notificationCount",
        notificationCount
    );

}

let savedNotificationCount =
    localStorage.getItem("notificationCount");

if(savedNotificationCount){

    notificationCount =
        parseInt(savedNotificationCount);

    document.getElementById("notificationCount").innerText =
        notificationCount;

}

function openNotifications(){

    document.getElementById("notifications").scrollIntoView({
        behavior:"smooth"
    });

    notificationCount = 0;

    document.getElementById("notificationCount").innerText = 0;

    localStorage.setItem(
        "notificationCount",
        0
    );

}

function checkAppointmentReminder(){

    let today = new Date().toISOString().split("T")[0];

    appointments.forEach(function(app){

        if(app.date === today){

            let reminderKey =
                "reminder_" + app.id + "_" + today;

            if(!localStorage.getItem(reminderKey)){

                addNotification(
                    "📅 Reminder: You have an appointment with " +
                    app.doctor +
                    " today at " +
                    app.time
                );

                localStorage.setItem(reminderKey, "sent");

            }

        }

    });

}
checkAppointmentReminder();

function submitReview(){

    let doctor = document.getElementById("reviewDoctor").value;
    let rating = document.getElementById("reviewRating").value;
    let review = document.getElementById("reviewText").value;

    if(review.trim() === ""){

        alert("Please write a review.");

        return;

    }

    let reviewData = {
        doctor: doctor,
        rating: rating,
        review: review,
        date: new Date().toLocaleDateString()
    };

    let reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push(reviewData);

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    displayReviews();

    addNotification(
        "⭐ Thank you for reviewing " + doctor
    );

    alert("Review submitted successfully!");

    document.getElementById("reviewText").value = "";

}

function displayReviews(){

    let reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    let list = document.getElementById("reviewList");

    list.innerHTML = "";

    if(reviews.length === 0){

        list.innerHTML = "<p>No reviews yet.</p>";

        return;

    }

    reviews.forEach(function(item){

        list.innerHTML +=
        "<div class='services'>" +
        "<h3>" + item.doctor + "</h3>" +
        "<p>" + item.rating + "</p>" +
        "<p>" + item.review + "</p>" +
        "<small>" + item.date + "</small>" +
        "</div>";

    });

}
displayReviews();

function updateDoctorStatus(){

    let doctors = [
        "Dr. James Smith",
        "Dr. Sarah Johnson",
        "Dr. Michael Brown",
        "Dr. Emily Davis"
    ];

    doctors.forEach(function(name, index){

        let booked = appointments.filter(function(app){

            return app.doctor === name;

        }).length;

        let status =
            document.getElementById(
                "doctor" + (index + 1) + "Status"
            );

        if(!status) return;

        if(booked >= 5){

            status.innerText = "🔴 Fully Booked";
            status.className = "busy";

        }
        else if(booked >= 3){

            status.innerText = "🟡 Busy";
            status.className = "soon";

        }
        else{

            status.innerText = "🟢 Available";
            status.className = "available";

        }

    });

}
updateDoctorStatus();

function updateAdminPanel(){

    let reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    document.getElementById("adminAppointments").innerText =
        appointments.length;

    document.getElementById("adminReviews").innerText =
        reviews.length;

    document.getElementById("adminDoctors").innerText =
        document.querySelectorAll(".doctor").length;

    let patient =
        localStorage.getItem("name");

    document.getElementById("adminPatients").innerText =
        patient ? 1 : 0;

}
updateAdminPanel();

function displayAdminAppointments(){

    let table =
        document.getElementById("adminAppointmentTable");

    table.innerHTML = "";

    appointments.forEach(function(app){

        let row = table.insertRow();

        row.insertCell(0).innerText = app.id;
        row.insertCell(1).innerText = app.doctor;
        row.insertCell(2).innerText = app.date;
        row.insertCell(3).innerText = app.time;
       
        let statusCell = row.insertCell(4);

statusCell.innerHTML =
`
<select onchange="changeAppointmentStatus(this.value, '${app.id}')">
    <option ${app.status === "Upcoming" ? "selected" : ""}>Upcoming</option>
    <option ${app.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
    <option ${app.status === "In Consultation" ? "selected" : ""}>In Consultation</option>
    <option ${app.status === "Completed" ? "selected" : ""}>Completed</option>
    <option ${app.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
</select>
`;

    });

}
displayAdminAppointments();

function changeAppointmentStatus(newStatus, id){

    appointments.forEach(function(app){

        if(app.id === id){

            app.status = newStatus;

        }

    });

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    displayAppointments();
    displayAdminAppointments();
    updateAnalytics();

    addNotification(
        "📋 Appointment " +
        id +
        " is now " +
        newStatus
    );

}

function showAppointmentsByDate(){

    let date =
        document.getElementById("calendarDate").value;

    let results =
        document.getElementById("calendarResults");

    results.innerHTML = "";

    let found = false;

    appointments.forEach(function(app){

        if(app.date === date){

            found = true;

            results.innerHTML +=
                "<div class='services'>" +
                "<h3>" + app.doctor + "</h3>" +
                "<p>🕒 " + app.time + "</p>" +
                "<p>📋 " + app.status + "</p>" +
                "</div>";

        }

    });

    if(!found){

        results.innerHTML =
            "<p>No appointments on this date.</p>";

    }

}

function updateAnalytics(){

    let today =
        new Date().toISOString().split("T")[0];

    let todayCount = 0;
    let completed = 0;
    let cancelled = 0;
    let upcoming = 0;

    appointments.forEach(function(app){

        if(app.date === today){
            todayCount++;
        }

        if(app.status === "Completed"){
            completed++;
        }

        if(app.status === "Cancelled"){
            cancelled++;
        }

        if(app.status === "Upcoming" ||
           app.status === "Confirmed"){
            upcoming++;
        }

    });

    document.getElementById("todayAppointments").innerText =
        todayCount;

    document.getElementById("completedAppointments").innerText =
        completed;

    document.getElementById("cancelledAppointments").innerText =
        cancelled;

    document.getElementById("upcomingAppointments").innerText =
        upcoming;

}
updateAnalytics();

let doctorChart;
let statusChart;

function drawDoctorChart(){

    let counts = {
        "Dr. James Smith":0,
        "Dr. Sarah Johnson":0,
        "Dr. Michael Brown":0,
        "Dr. Emily Davis":0
    };

    appointments.forEach(function(app){
        counts[app.doctor]++;
    });

    const ctx = document.getElementById("doctorChart");

    if(doctorChart){
        doctorChart.destroy();
    }

    doctorChart = new Chart(ctx,{
        type:"bar",
        data:{
            labels:Object.keys(counts),
            datasets:[{
                label:"Appointments",
                data:Object.values(counts),
                backgroundColor:[
                    "#4CAF50",
                    "#2196F3",
                    "#FFC107",
                    "#E91E63"
                ]
            }]
        },
        options:{
            responsive:true,
            plugins:{
                legend:{
                    display:false
                }
            }
        }
    });

}
drawDoctorChart();
drawStatusChart();

function drawStatusChart(){

    let upcoming = 0;
    let completed = 0;
    let cancelled = 0;

    appointments.forEach(function(app){

        if(app.status === "Upcoming" || app.status === "Confirmed"){
            upcoming++;
        }
        else if(app.status === "Completed"){
            completed++;
        }
        else if(app.status === "Cancelled"){
            cancelled++;
        }

    });

    const ctx = document.getElementById("statusChart");

    if(statusChart){
        statusChart.destroy();
    }

    statusChart = new Chart(ctx,{

        type:"pie",

        data:{

            labels:[
                "Upcoming",
                "Completed",
                "Cancelled"
            ],

            datasets:[{

                data:[
                    upcoming,
                    completed,
                    cancelled
                ],

                backgroundColor:[
                    "#4CAF50",
                    "#2196F3",
                    "#F44336"
                ]

            }]

        },

        options:{

            responsive:true,
            maintainAspectRatio:true,

            plugins:{
                legend:{
                    position:"bottom"
                }

            }

        }

    });

}

function adminLogin(){

    let username =
        document.getElementById("adminUsername").value;

    let password =
        document.getElementById("adminPassword").value;

    if(username === "admin" &&
       password === "trey123"){

        alert("Welcome Administrator!");

        document.getElementById("admin").style.display = "block";

        document.getElementById("adminLogin").style.display = "none";

    }
    else{

        alert("Incorrect username or password.");

    }

}