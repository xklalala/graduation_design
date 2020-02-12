 function getFormdata(data) {
    let res = new FormData();
    for (let key in data) {
        res.append(key, data[key])
    }
    return res
}
export default getFormdata