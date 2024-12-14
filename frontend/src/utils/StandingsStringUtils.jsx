export const splitTeamName = (name) => {
    const words = name.split(' ');
    if (words.length <= 2) return name;

    const midpoint = Math.ceil(words.length / 2);
    return (
        <>
            {words.slice(0, midpoint).join(' ')}
            <br />
            {words.slice(midpoint).join(' ')}
        </>
    );
};

