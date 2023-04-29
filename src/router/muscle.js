import {Back, Biceps, Chest, Legs, Shoulder, Triceps } from "../views/muscles/Index.js";

export default {
    path: '/muscles',
    children: [
        { path: 'legs', component: Legs },
        { path: 'back', component: Back },
        { path: 'chest', component: Chest },
        { path: 'shoulder', component: Shoulder },
        { path: 'triceps', component: Triceps },
        { path: 'biceps', component: Biceps },
    ]
};
