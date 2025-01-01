export const groupAndSortMatches = (matches) => {
    const grouped = matches.reduce((acc, match) => {
        const date = new Date(match.dateTimeUTC);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
        acc[monthYear] = acc[monthYear] || [];
        acc[monthYear].push(match);
        return acc;
    }, {});

    // Sort matches in each month by date
    Object.keys(grouped).forEach((month) => {
        grouped[month].sort((a, b) => new Date(a.dateTimeUTC) - new Date(b.dateTimeUTC));
    });

    // Sort months in ascending order
    const sortedMonths = Object.keys(grouped).sort((a, b) => {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);
        return yearA - yearB || monthA - monthB;
    });

    return { grouped, sortedMonths };
};
