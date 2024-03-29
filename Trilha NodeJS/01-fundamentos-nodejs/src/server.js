import http from 'node:http'
import { Database } from './database.js'
import { json } from './middlewares/json.js'
import axios from 'axios'

const database = new Database()

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    console.log(request.body)

    if (method === 'GET' && url === '/users') {
        const users = database.select('users')

        return response.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = request.body

        const user = {
            id: 1,
            name,
            email
        }

        database.insert('users', user)

        return response.writeHead(201).end()
    }

    return response.writeHead(404).end()
})

server.listen(3333) 