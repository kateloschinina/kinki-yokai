/* global console */

import modes from './lib/visualisations'
import {
	putLedsInBufferArray,
	regroupConfig
} from './lib/helpers/dataHelpers'
import { connectToArduinos } from './lib/helpers/connectToArduinos.js'
import { spinServer } from './lib/helpers/spinServer.js'
import { NUMBER_OF_LEDS } from './lib/configuration/constants.js'

const connectedSockets = {}
const clientConfigurations = {}
let ledsConfig
let currentMode = modes.basic
let areWeWriting = true
let clientSensors

const io = spinServer()
const arduinos = connectToArduinos()

const calculateDataForRealLeds = (data) => { // TO BE CHANGED WHEN HAVE ACCESS TO HARDWARE
	const sensorData = data.split('\t')[0].split('! ')[1]
	const realMeasurements = [{ name: 'real', tension: sensorData - 80 }]
	// socket.emit('measurements', realMeasurements)
	const sticks = [
		{ numberOfLEDs: NUMBER_OF_LEDS, name: '1' },
		{ numberOfLEDs: NUMBER_OF_LEDS, name: '2' }
	]
	const realSensors = [{
		key: 'real',
		column: '1',
		sensorPosition: 20
	}]
	//const ledsConfigFromClient = currentMode(sticks, realSensors).filter(Boolean)
	const ledsConfigFromClient = currentMode(sticks, clientSensors).filter(Boolean)
	
	//console.log('LEDS', ledsConfigFromClient[0][0].leds)
	ledsConfig = regroupConfig(ledsConfigFromClient)

	return putLedsInBufferArray(ledsConfig[0].leds, NUMBER_OF_LEDS)
}

if (arduinos && arduinos.length > 0) {
	arduinos.map(arduino => {
		const port = arduino.port
		const parser = arduino.parser

		parser.on('data', data => {
			if (areWeWriting && ledsConfig) {
				//console.log('DATA IN', data)
				port.write(calculateDataForRealLeds(data))
				areWeWriting = false
			} else {
				//console.log('Data IN, listen', data)
				if (data === 'eat me\r') {
					areWeWriting = true
				}
			}
		})
	})
}

io.on('connection', socket => {
	connectedSockets[socket.id] = socket

	socket.on('updatedSensors', sensors => {
		if (!sensors) return

		let config = clientConfigurations[socket.id]
		if (!config) {
			return
		}

		const sticks = config.sticks
		if (!sticks) {
			return
		}

		currentMode = modes[config.mode]
		if (!currentMode) {
			return
		}

		clientSensors = sensors
		const ledsConfigFromClient = currentMode(sticks, sensors).filter(Boolean)
		ledsConfig = regroupConfig(ledsConfigFromClient)
		socket.emit('ledsChanged', ledsConfig)
		// ledsConfigFromClient.map(ledConfig => socket.emit('ledsChanged', ledConfig)) // keep for now for development processes
	})

	socket.on('configure', configuration => {
		clientConfigurations[socket.id] = configuration
	})

	socket.on('disconnect', () => {
		delete connectedSockets[socket.id]
		delete clientConfigurations[socket.id]
	})
})
