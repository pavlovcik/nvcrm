(function () {
    const TOOLBAR = document.querySelector(`toolbar`), BACKGROUND = document.querySelector(`background`), DIVMAIN = document.querySelector(`DIV#Main`);

    TOOLBAR.addEventListener(`mouseenter`, e => { BACKGROUND.classList.add(`blur`); DIVMAIN.classList.add(`blur`) });
    TOOLBAR.addEventListener(`mouseleave`, e => { BACKGROUND.classList.remove(`blur`); DIVMAIN.classList.remove(`blur`) });

    // nv.fnc.draw({
    //     cell_resolution: 48,
    //     point_resolution: 1,
    //     shade: 96,
    //     step: 0.03125,
    //     refresh: 1000,
    //     target: document.querySelector(`grid`)
    // });

})()
