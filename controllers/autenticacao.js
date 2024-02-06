

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const {v4 : uuidv4} = require('uuid')

const prisma = require('../config/db');

exports.registrarUsuario = async (req, res) => {

   
    const { email, senha } = req.body;

    
    const verificaEmail = await prisma.usuario.findFirst({
        where: {
            email: email
        }
    })
    try {
        if (verificaEmail) {
            return res.status(403).json({
                message: "email já está em uso"
            })
        } else {
            
            const usuarioId = uuidv4()
          
            bcrypt.hash(senha, 10)
                .then( async (hash) => {
                   
                    const usuario = await prisma.usuario.create({
                        data: {
                            usuarioId: usuarioId,
                            email: email,
                            senha: hash
                        }
                    });

                    return res.status(201).json(usuario)
                })
        }
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}


exports.loginUsuario = async (req, res) => {
  
    const { email, senha } = req.body

  
    let obterUsuario

   
    prisma.usuario.findFirst({
        where : {
            email: email
        }
    }).then((usuario) => {
        if (!usuario) {
            
            return res.status(401).json({
                message: "Autenticacao falhou, usuario não encontrado.",
            })

        }
        
        obterUsuario = usuario
       
        return bcrypt.compare(senha, usuario.senha)
    })
        .then((response) => {
            if (!response) {
                return res.status(401).json({
                    message: "Falha de autenticaçao."
                })
            } else {
                let jwtToken = jwt.sign(
                    {
                        email: obterUsuario.email,
                        userId: obterUsuario.usuarioId
                    },
                   
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    }
                )
                return res.status(200).json({
                    accessToken: jwtToken,
                    userId: obterUsuario.usuarioId,
                })

            }

        })
        .catch((err) => {
            return res.status(401).json({
                messgae: err.message,
                success: false
            })
        })
}

