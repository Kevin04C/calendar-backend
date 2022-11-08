import brcrypt from "bcryptjs";
import { response } from "express";
import { generateToken } from "../helpers/jwt.js";
import { User } from "../models/User.js";

export const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  
  try {

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        oK: false,
        msg: "Ya existe un usuario con ese correo",
      });
    }

    user = new User(req.body);

    const salt = brcrypt.genSaltSync();
    user.password = brcrypt.hashSync(password, salt);

    await user.save();

    const token = generateToken(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

export const loginUser = async (req, res = response) => {
  
  const { email, password} = req.body;

  try {
    const user = await User.findOne({email});
    
    if(!user){
      return res.status(400).json({
       ok: false,
       msg: "No existe ningún usuario con ese email"
      })
    }

    const validPassword = brcrypt.compareSync(password, user.password);

    if(!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta"
      });
    }

    const token = generateToken(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })


    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }
};

export const renewToken = (req, res = response) => {
  const { uid, name}  = req;

  const token = generateToken(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token
  });
};
