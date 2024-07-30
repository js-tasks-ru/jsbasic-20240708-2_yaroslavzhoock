function toggleText() {
  const btn = document.querySelector(".toggle-text-button");
  const text = document.querySelector("#text");
  btn.onclick = _ => text.hidden = !text.hidden; 
}