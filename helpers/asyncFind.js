

const asyncFind = (Model, query) => {
    const promise = new Promise((resolve,reject) => {
        Model.find(query, (err, data) => {
            if (err) return reject(err)
            resolve({ok: true, data})
        })
    })
    return promise
}

module.export = {
    asyncFind
}