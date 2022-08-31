const express = require('express')
const app = express()
const { createCanvas } = require('canvas')

app.get('/', (req, res) => {
    try {
        const width = req.query.width || 1200
        const height = req.query.height || 1200
        const color = req.query.color || '000'
        const textColor = req.query.textColor || 'fff'
        const textSize = req.query.textSize || 440
        const textString = req.query.name ? req.query.name.toUpperCase() : '^_^'
        const canvas = createCanvas(Number(width), Number(height))
        const context = canvas.getContext('2d')
        context.fillStyle = `#${textColor}`;
        context.font = `bold ${textSize}px Menlo`;
        const textWidth = context.measureText(textString).width;
        context.fillText(textString, (canvas.width / 2) - (textWidth / 2), height / 1.6);
        context.globalCompositeOperation = 'destination-over'
        context.fillStyle = `#${color}`;
        context.fillRect(0, 0, canvas.width, canvas.height);
        res.set('Content-Type', 'image/png')
        res.send(canvas.toBuffer())
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(5000)