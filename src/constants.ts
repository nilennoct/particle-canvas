export const Colors = [
    '#ff9da4', // Red
    '#ffc58f', // Orange
    '#ffeead', // Yellow
    '#d1f1a9', // Green
    '#99ffff', // Aqua
    '#bbdaff', // Blue
    '#ebbbff', // Purple
];

export const Settings = {
    e: 0.07,
    originRadius: 100,
    gap: 15,
    radius: 3.0,
    debug: false,
    initialParticles: 512,
    textLimit: 12,
    autoPlay: false,
    lotteryList: ['AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG'],
};

export const enum ParticleState {
    Idle,
    Wander,
    Move,
    Mass,
}
