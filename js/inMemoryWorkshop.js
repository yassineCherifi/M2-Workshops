inMemoryWorkshop = []


function getWorkshopList() {
    return new Promise((resolve, ) => {
        resolve(inMemoryWorkshop)
    })
}

function getWorkshopByName(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("name parameter is required"))
        }
        resolve(inMemoryWorkshop.find(workshop => workshop.name === name))
    })
}

function addWorkshop(name, description) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("Workshop name required"))
        }
        if (!description) {
            reject(new Error("Workshop description required"))
        }
        inMemoryWorkshop.push({
            name,
            description
        })
        resolve()
    })
}

function removeWorkshopByName(name) {
    return new Promise((resolve, reject) => {
        resolve(inMemoryWorkshop = inMemoryWorkshop.filter(function(o) { return o.name != name; }))
        })
        }

        // on suppose que le nom du workshop est unique
function updateWorkshop(name,newWorkshop) {
    return new Promise((resolve, reject) => {
        const toModify = inMemoryWorkshop.find(workshop => workshop.name === name)
        toModify.name = newWorkshop.name
        toModify.description = newWorkshop.description
        resolve()
    })
}

module.exports = {
    getWorkshopList,
    getWorkshopByName,
    addWorkshop,
    removeWorkshopByName,
    updateWorkshop
}