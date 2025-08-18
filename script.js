function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('mode') ? urlParams.get('mode').split(',').map(m => m.trim()) : [];
}

function updateClock() {
    const now = new Date();
    const modes = getQueryParams();
    let time, date;

    // Color mode: look for mode starting with "color-"
    const colorMode = modes.find(m => m.startsWith('color-'));
    let color = '';
    if (colorMode) {
        color = colorMode.slice(6); // Get the color value after "color-"
        document.querySelector('.clock-container').style.color = color;
    } else {
        document.querySelector('.clock-container').style.color = ''; // Reset to default
    }

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


    // Date format mode: look for mode starting with "date-"
    const dateMode = modes.find(m => m.startsWith('date-'));
    if (dateMode) {
        let format = dateMode.slice(5);
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear());
        const yearShort = year.slice(-2);
        const monthShort = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const monthLong = now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
        const weekdayShort = now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(); // e.g. "MON"
        const weekdayLongRaw = now.toLocaleString('en-US', { weekday: 'long' }); // e.g. "Monday"
        const weekdayLong = weekdayLongRaw.charAt(0).toUpperCase() + weekdayLongRaw.slice(1).toLowerCase(); // "Monday"

        // If format contains ddd or dddd but not dd, insert day after the first weekday token
        if ((/dddd|ddd/i.test(format)) && !/dd/i.test(format)) {
            format = format.replace(/(dddd|ddd)/i, '$& dd');
        }

        // If format contains wks or wkl but not dd, insert day after the first weekday token
        if ((/wkl|wks/i.test(format)) && !/dd/i.test(format)) {
            format = format.replace(/(wkl|wks)/i, '$& dd');
        }

        date = format
            .replace(/wkl/gi, weekdayLong)
            .replace(/wks/gi, weekdayShort)
            .replace(/dd/gi, day)
            .replace(/mmmm/gi, monthLong)
            .replace(/mmm/gi, monthShort)
            .replace(/mm/gi, month)
            .replace(/yyyy/gi, year)
            .replace(/yy/gi, yearShort);
    } else {
        date = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/,/g, '');
    }


    // Single-line or multi-line display
    const multiline = document.getElementById('multiline');
    const singleline = document.getElementById('singleline');
    const clockNdate = document.getElementById('clockNdate');

    if (modes.includes('single-dateTime')) {
        multiline.style.display = 'none';
        singleline.style.display = 'block';
        clockNdate.textContent = `${date} ${time}`;
    } else if (modes.includes('single-timeDate')) {
        multiline.style.display = 'none';
        singleline.style.display = 'block';
        clockNdate.textContent = `${time} ${date}`;
    } else {
        multiline.style.display = 'block';
        singleline.style.display = 'none';
        document.getElementById('clock').textContent = time;
        document.getElementById('date').textContent = date;
    }
}

setInterval(updateClock, 1000);
updateClock();