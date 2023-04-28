import { Legs, Back, Chest, Shoulder, Triceps, Biceps } from '@/views/muscles';
// import Tilebar from '@/views/layouts';

export default {
    path: '/muscles',
    // component: Tilebar,
    children: [
        { path: 'legs', component: Legs },
        { path: 'back', component: Back },
        { path: 'chest', component: Chest },
        { path: 'shoulder', component: Shoulder },
        { path: 'triceps', component: Triceps },
        { path: 'bicepts', component: Biceps },
    ]
};
