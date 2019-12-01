console.log(`ok`);

document.querySelector(`toolbar`).addEventListener(`mouseenter`, e => {
    document.querySelector(`background`).classList.add(`blur`);
    document.querySelector(`ui`).classList.add(`blur`)
})
document.querySelector(`toolbar`).addEventListener(`mouseleave`, e => {
    document.querySelector(`background`).classList.remove(`blur`);
    document.querySelector(`ui`).classList.remove(`blur`)
})

nv.fnc.draw({
    cell_resolution: 48,
    point_resolution: 1,
    shade: 96,
    step: 0.03125,
    refresh: 1000,
    target: document.querySelector(`grid`)
});