function formatTime(timestamp) {
    const date = new Date((timestamp) * 1000);

    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    return formattedTime;
}

export { formatTime }