import mongoose from "mongoose";

const schemaModerate = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    server: {
        type: String,
        required: true
    },
    mode: {
        type: Boolean,
        required: true
    },
    links: {
        type: Boolean,
        require: true
    },
    prefix: {
        type: String,
        required: true
    },
    membersCount: {
        type: Number,
        required: true
    },
    roles: {
       main: Array,
       mute: String
    }, 
    autoRole: {
        roles: {type: Array},
        emojis: {type: Array}
    },
    channelRole: {
        type: String
    },
    censoredWord: {
        type: Array,
        required: true
    },
    webHook: {
        type: Object,
    }
});   


export default mongoose.model("moderate", schemaModerate)