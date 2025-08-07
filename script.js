function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('mode') ? urlParams.get('mode').split(',').map(m => m.trim()) : [];
}

function updateClock() {
    const now = new Date();
    const modes = getQueryParams();
    let time, date;

    // Default to 24-hour format
    time = now.toLocaleTimeString('en-US', { hour12: false });

    // Apply modes
    if (modes.includes('12h')) {
        time = now.toLocaleTimeString('en-US', { hour12: true }); // Switch to 12-hour with '24h' mode
    }
    if (modes.includes('noseconds')) {
        time = time.replace(/:\d{2}(?=\s|$)/, ''); // Remove seconds
    }
    if (modes.includes('center')) {
    document.querySelector('.clock-container').classList.add('centered');
    } else {
    document.querySelector('.clock-container').classList.remove('centered');
    }
    if (modes.includes('right')) {
    document.querySelector('.clock-container').classList.add('righted');
    } else {
    document.querySelector('.clock-container').classList.remove('righted');
    }
    // Handle date
    date = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/,/g, '');

    // Apply layout mode
    const container = document.querySelector('.clock-container');
    if (modes.includes('single')) {
        container.classList.add('single-line');
    } else {
        container.classList.remove('single-line');
    }

    document.getElementById('clock').textContent = time;
    document.getElementById('date').textContent = date;
}

setInterval(updateClock, 1000);
updateClock();