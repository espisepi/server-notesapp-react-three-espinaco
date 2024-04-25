const { response } = require('express');
const Note = require('../models/Note');

const noteListMock = require('../mocks/notes');


const getNotes = async( req, res = response ) => {

    // const notes = await Note.find()
    //                             .populate('user','name');
    const notes = await noteListMock;

    res.json({
        ok: true,
        notes
    });
}

const crearNote = async ( req, res = response ) => {

    const note = new Note( req.body );

    try {

        note.user = req.uid;
        
        const noteGuardado = await note.save();

        res.json({
            ok: true,
            note: noteGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarNote = async( req, res = response ) => {
    
    const noteId = req.params.id;
    const uid = req.uid;

    try {

        const note = await Note.findById( noteId );

        if ( !note ) {
            return res.status(404).json({
                ok: false,
                msg: 'Note no existe por ese id'
            });
        }

        if ( note.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este note'
            });
        }

        const nuevoNote = {
            ...req.body,
            user: uid
        }

        const noteActualizado = await Note.findByIdAndUpdate( noteId, nuevoNote, { new: true } );

        res.json({
            ok: true,
            note: noteActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarNote = async( req, res = response ) => {

    const noteId = req.params.id;
    const uid = req.uid;

    try {

        const note = await Note.findById( noteId );

        if ( !note ) {
            return res.status(404).json({
                ok: false,
                msg: 'Note no existe por ese id'
            });
        }

        if ( note.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este note'
            });
        }


        await Note.findByIdAndDelete( noteId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getNotes,
    crearNote,
    actualizarNote,
    eliminarNote
}