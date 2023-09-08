import axios from 'axios'
import { Readable } from 'node:stream'


class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 10) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

axios.post('http://localhost:3334', {
    body: new OneToHundredStream()
}).then((response) => {
    return response.text()
}).then(data => {
    console.log(data)
})

// fetch('http://localhost:3334', {
//     method: 'POST',
//     body: new OneToHundredStream(),
// }).then((response) => {
//     return response.text()
// }).then(data => {
//     console.log(data)
// })