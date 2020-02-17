export function removeField(k, refer, keys) {

    if (keys.length === 1) {
        return;
    }

    refer.setState({ stateKeys: keys.filter(key => key !== k) })
};


export const addField = (refer) => {
    let { stateKeys, count } = refer.state

    const nextKeys = stateKeys.concat(count++);
    refer.setState({ stateKeys: nextKeys, count: count })
};


