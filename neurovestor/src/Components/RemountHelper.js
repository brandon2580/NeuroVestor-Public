/*
    RemountHelper.js
    A simple tool to help prevent problems with components remounting all the time.
    Built for NeuroVestor

    The objective is to offer a flag to all individual components to determine if the component should fetch data on the first
    component mount, or the second.
*/

export const remountHelper = {
    state: false,
    set: newValue => {
        console.log("RemountHelper now set to " + newValue);
        remountHelper.state = newValue;
    }
};
