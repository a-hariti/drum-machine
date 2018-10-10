(_ => {
  const createMapBy = (list, by = el => el) =>
    list.reduce(
      (map, current) => ({ ...map, [by(current)]: current }),
      Object.create(null)
    );

  const audios = createMapBy(
    [...document.querySelectorAll("audio")],
    el => el.id
  );

  const pads = createMapBy([...document.querySelectorAll(".drum-pad")], pad =>
    pad.innerText.trim()
  );
  const blink = activePad => {
    activePad.classList.add("active");
    setTimeout(_ => activePad.classList.remove("active"), 150);
  };
  const display = document.querySelector("#display");

  const updateView = activePad => {
    display.innerText = activePad;
    blink(pads[activePad]);
  };
  const onDrumHit = pad => {
    updateView(pad);
    audios[pad].play();
  };
  Object.values(pads).forEach(pad =>
    pad.addEventListener("click", ev => onDrumHit(ev.target.innerText.trim()))
  );

  window.addEventListener("keyup", ev => {
    const key = ev.key.toUpperCase();
    if ("QWEASDZXC".includes(key)) onDrumHit(key);
  });
})();
