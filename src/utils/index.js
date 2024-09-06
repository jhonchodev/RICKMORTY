export function doStructuratedJson(oldJson) {
    if (oldJson) {
        const keys = Object.keys(oldJson);
        const values = Object.values(oldJson);
        let messages = [];
        for (const i in keys) {
            let messageJson = {
                id: keys[i],
                message: values[i]
            };
            messages.push(messageJson);
        }
        return messages;
    } else {
        return null;
    }
}