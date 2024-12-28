// View Contacts

const viewContacts = (chevron, sidebar) => {
    const chevronBtn = document.querySelector(chevron);
    const sideElm = document.querySelector(sidebar);

    if (chevron && sidebar) {
        chevronBtn.addEventListener('click', () => {
            chevronBtn.classList.toggle('active');
            sideElm.classList.toggle('active');
        });
    }
}

viewContacts('[data-sidebar-btn]', '[data-sidebar]');

// Anonymous Message

function oninputFalse() {
    document.getElementsByTagName('textarea')[0].value ? document.querySelector('.btn').classList.add('active') : document.querySelector('.btn').classList.remove('active');
}

document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const webhookData = {
        content: 'Pesan baru dari website Nedi (dy)',
        embeds: [{
            title: 'Anonim',
            color: 8359053,
            fields: [{
                name: 'Detail Pesan', value: formData.get('message'), inline: false
            }]
        }]
    };

    fetch('https://discord.com/api/webhooks/1200445530833170503/vk2OzoRMgAGvWkDKR1gU7Pz41cF_6pDOvOmP_1nQh4l8DqDaAVOE9Rlm6RE9p2kwbGt4', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookData)
    })
    .then(response => {
        if (response.ok) {
            alert('Pesan berhasil terkirim');
            form.reset();
        } else {
            alert('Aduh kirim pesan gagal');
        }
    })
    .catch(error => {
        console.error('Oops… Ada yang salah:', error);
        alert('Terjadi kesalahan');
    });
});

// Traffic Analyzer

function fetchAndSendGeoLocation() {
    const apiKey = 'ee88362b42fd41cf89e835391e61f1c1';

    fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`).then(response => response.json()).then(data => {
        console.log('Data Geolokasi:', data);
        sendToDiscord(data);
    }).catch(error => console.error('Terjadi kesalahan saat mengambil Data Geolokasi:', error));
}

function sendToDiscord(data) {
    const webhookURL = 'https://discord.com/api/webhooks/1295621166974632031/LFkxoUJxS9oJn4I83VyZMln4o7wxQ-_BVa9zIfDATFtbjZCxYjY0GdeH_Xr71KPdVi2C';
    const message = {
        embeds: [{
            title: 'Pengunjung Baru Terdeteksi',
            description: `Pengunjung dari **${data.city}, ${data.country} (${data.country_code})** ${data.flag.emoji}\n
                🚩 Alamat IP: ${data.ip_address}
                🛡️ Status VPN: ${data.security.is_vpn}
                🏢 Provider: ${data.connection.isp_name}
                📡 Jenis Koneksi: ${data.connection.connection_type}
                🌐 Kordinat: ${data.longitude}, ${data.latitude}
                📫 Kode Pos: ${data.postal_code}
                💵 Mata Uang: ${data.currency.currency_name} (${data.currency.currency_code})
                🕖 Zona Waktu: ${data.timezone.name}, ${data.timezone.abbreviation} ${data.timezone.gmt_offset}`,
            color: 7419530,
            footer: {
                text: 'Abstract API Inc',
                icon_url: 'https://avatars.githubusercontent.com/u/66040985?s=200&v=4'
            },
            timestamp: new Date()
        }]
    };
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }).then(response => {
        if (response.ok) {
            console.log('Data geolokasi berhasil dikirim ke Discord!');
        } else {
            console.error('Gagal mengirim data ke Discord:', response.statusText);
        }
    }).catch(error => console.error('Kesalahan mengirim data ke Discord:', error));
}

window.onload = fetchAndSendGeoLocation;

// Auto Dark/Light Mode

function setModeBasedOnTime() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 18 || hours < 6) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

setModeBasedOnTime();
