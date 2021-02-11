import Dexie from "dexie";

const database = new Dexie("my_db");

database.version(2)
    .stores({
        timeSignal: "hour,hour",  // 一番最初に来るnameがキー。ageがインデックス。
        image: "key,key"
    })

export default {
    async loadImage() {
        const image = await database.table('image').get('main')
        console.log(image)
        return image
    },

    saveImage(key, name, value) {
        database.table('image').put({
            key: key,
            name: name,
            value: value
        }, key)
    },

    async loadTimeSignal(h) {
        const timeSignal = await database.table('timeSignal').get(h)
        console.log(timeSignal)
        return timeSignal
    },
    async loadTimeSignals() {
        const timeSignals = await database.table('timeSignal').toArray()
        console.log(timeSignals)
        return timeSignals
    },
    saveTimeSignal(h, name, value) {
        database.table('timeSignal').put({
            hour: h,
            name: name,
            value: value
        }, h)
    }
}