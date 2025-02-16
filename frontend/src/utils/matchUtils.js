export const groupAndSortMatches = (matches) => {
  const grouped = matches.reduce((acc, match) => {
    const date = new Date(match.dateTimeUTC);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    acc[monthYear] = acc[monthYear] || [];
    acc[monthYear].push(match);
    return acc;
  }, {});

  // Sort matches in each month by date (novije prema starijima)
  Object.keys(grouped).forEach((month) => {
    grouped[month].sort(
      (a, b) => new Date(b.dateTimeUTC) - new Date(a.dateTimeUTC)
    );
  });

  // Sort months in descending order (najnoviji mjesec prvi)
  const sortedMonths = Object.keys(grouped).sort((a, b) => {
    const [yearA, monthA] = a.split("-").map(Number);
    const [yearB, monthB] = b.split("-").map(Number);
    return yearB - yearA || monthB - monthA;
  });

  return { grouped, sortedMonths };
};
