function checkAccess(DoorLocked, WindowClosed, AlarmOn, OwnerInside) {
    const secure = AlarmOn && DoorLocked && WindowClosed && OwnerInside;
    const reasons = [];
    if (!AlarmOn) reasons.push('Alarm is off');
    if (!DoorLocked) reasons.push('Door is unlocked');
    if (!WindowClosed) reasons.push('Window is open');
    if (!OwnerInside) reasons.push('Owner not inside');
    if (secure) {
        console.log('Secure');
    } else {
        console.log('Unsafe');
        console.log('  Reasons:', reasons.join(', ') || 'Unknown');
    }
    return secure;
}
const scenarios = [
    { name: 'All secure', values: [true, true, true, true] },
    { name: 'Alarm off', values: [true, true, false, true] },
    { name: 'Owner not inside', values: [true, true, true, false] },
    { name: 'Door unlocked', values: [false, true, true, true] },
    { name: 'Window open & alarm on', values: [true, false, true, true] },
    { name: 'Multiple failures', values: [false, false, false, false] }
];
console.log('\nAccess System Scenarios:');
scenarios.forEach(s => {
    console.log(`\nScenario: ${s.name}`);
    const [DoorLocked, WindowClosed, AlarmOn, OwnerInside] = s.values;
    console.log('  Inputs:', {DoorLocked, WindowClosed, AlarmOn, OwnerInside });
    checkAccess(DoorLocked, WindowClosed, AlarmOn, OwnerInside);
});
module.exports = { checkAccess };