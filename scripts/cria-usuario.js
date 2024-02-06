
const prisma = require('../config/db');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

 
 const usuarioId = uuidv4()
 
 bcrypt.hash('admin', 10)
.then(async (hash) => {
    
    console.log("Registrando usuario..")
    const usuario = await prisma.usuario.create({
        data: {
            usuarioId: usuarioId,
            email: 'admin@admin.com',
            senha: hash
        }
    });
    console.log(`${usuario.email} registrado.`)
})