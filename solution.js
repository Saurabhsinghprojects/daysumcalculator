function solution(dateDict) {
    const daysOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const daySums = { 'Mon':0,'Tue':0,'Wed':0,'Thu':0,'Fri':0,'Sat':0,'Sun':0 };

    // Aggregated input values day wise
    for (const dateStr in dateDict) {
        const date = new Date(dateStr);
        const jsDay = date.getDay();        // 0=Sun, 1=Mon ... 6=Sat
        const dayName = daysOfWeek[(jsDay + 6) % 7]; // Map Mon=0, Sun=6
        daySums[dayName] += dateDict[dateStr];
    }

    // Filling missing days using formula (I am filling missing values starting from index 0 using { curr. day's value = (prev. day's value*2)-(day before perv. day which is assumed zero if not present)}
    const result = {};
    for (let i = 0; i < daysOfWeek.length; i++) {
        const day = daysOfWeek[i];
        if (daySums[day] !== 0) {
            result[day] = daySums[day];
        } else {
            const prev = i > 0 ? result[daysOfWeek[i-1]] : 0;
            const prev2 = i > 1 ? result[daysOfWeek[i-2]] : 0;
            result[day] = 2 * prev - prev2;
        }
    }

    return result;
}

// ------------------
// Test examples
// ------------------

const input1 = {
    '2020-01-01':4, '2020-01-02':4, '2020-01-03':6,
    '2020-01-04':8, '2020-01-05':2, '2020-01-06':-6,
    '2020-01-07':2, '2020-01-08':-2
};
console.log('Example 1:', solution(input1));
// { Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2 }

const input2 = {
    '2020-01-01':6, '2020-01-04':12, '2020-01-05':14,
    '2020-01-06':2, '2020-01-07':4
};
console.log('Example 2:', solution(input2));
// { Mon: 2, Tue: 4, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 14 }
