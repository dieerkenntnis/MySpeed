const fs = require("fs");
let ooklaServers;
let libreServers;
let libreCustomServers;

module.exports.getLibreServers = () => {
    if (libreServers) return libreServers;

    if (fs.existsSync("./data/servers/librespeed.json")) {
        libreServers = fs.readFileSync("./data/servers/librespeed.json");
        libreServers = JSON.parse(libreServers);

        return libreServers;
    }

    return [];
}

module.exports.getLibreCustomServers = () => {
    if (fs.existsSync("./data/servers/librespeed_custom.json")) {
        let customServers = fs.readFileSync("./data/servers/librespeed_custom.json");
        customServers = JSON.parse(customServers);

        // Convert array format to key-value format for compatibility with UI
        if (Array.isArray(customServers)) {
            let serversObject = {};
            customServers.forEach(server => {
                serversObject[server.id] = server.name;
            });
            return serversObject;
        }

        return customServers;
    }

    return [];
}


module.exports.getOoklaServers = () => {
    if (ooklaServers) return ooklaServers;

    if (fs.existsSync("./data/servers/ookla.json")) {
        ooklaServers = fs.readFileSync("./data/servers/ookla.json");
        ooklaServers = JSON.parse(ooklaServers);

        return ooklaServers;
    }

    return [];
}

module.exports.getByMode = (mode) => {
    if (mode === "ookla") return this.getOoklaServers();
    if (mode === "libre") return this.getLibreServers();
    if (mode === "librecustom") return this.getLibreCustomServers();
}