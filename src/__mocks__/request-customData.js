
const fakeData = {
    id: 1,
    name: 'McDonalds'
}

export default function fetchCustomBusiness(term, lat, long) {

    return new Promise((resolve) => {
        resolve(fakeData)
    })
}