import { json, request, response } from "express";
import { body } from "express-validator";
import { Event } from "../models/Event.js";

export const getEvents = async (req = request, res = response) => {
  try {
    const events = await Event.find()
                              .populate("user", "name");
    res.json({
      ok: true,
      events,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const createEvent = async (req = request, res = response) => {
  const savedEvent = new Event(req.body);

  try {
    savedEvent.user = req.uid;
    await savedEvent.save();

    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const updateEvent = async (req = request, res = response) => {
  
  const uid = req.uid;
  const id = req.params.id;

  try {
    const event = await Event.findOne({id});

    if(!event) {

      return res.status(404).json({
        ok: fasle,
        msg: "No existe ningún evento con ese id"
      })
    }
    
    if(event.user.toString() !== uid) {
      
      return res.status(401).json({
        ok: false,
        msg: "No tiene los permisos para eliminar este evento"
      })

    }
    const newEvent = {...req.body};
    
      
    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {new: true});


    res.json({
      ok: true,
      event: updatedEvent
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador "

    })
  }

};
export const deleteEvent = async (req = request, res = response) => {

  const id = req.params.id;
  const uid = req.uid;


  try {

    const event = await Event.findOne({id});

    if(!event) {
      return res.status(404).json({
        ok: fasle,
        msg: "No existe nigún evento con ese id"
      })
    }

    if(event.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: "No tiene los permisos para eliminar este evento"
      })
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    
    res.json({
      ok: true,
      deletedEvent
    })

  } catch (error) {
    res.status(500).json({
      ok: fasle,
      msg: "Hable con el administrador"
    }) 
  }
};
