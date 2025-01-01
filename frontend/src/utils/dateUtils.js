export const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
};
