import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
          </div>
          <div class="modal__body">A сюда нужно добавлять содержимое тела модального окна</div>
        </div>
      </div>
    `);
    this.modalTitle = this.elem.querySelector(".modal__title");
    this.modalBody = this.elem.querySelector(".modal__body");
    this.onClick();
    this.keyDown();
  }

  open() {
    document.body.append(this.elem);
    // document.body.classList.toggle('is-modal-open'); // почему нельзя использовать toggle?
    document.body.classList.add('is-modal-open');
  }

  onClick() {
    this.elem.onclick = (e) => {
      if (e.target.closest(".modal__close")) {
        this.close();
      }
    };
  }

  keyDown() {
    document.addEventListener("keydown", (e) => {
      if (e.code == "Escape") {
        e.preventDefault();
        this.close();
      }
    });
  }

  setTitle(data) {
    this.modalTitle.textContent = data;
  }

  setBody(node) {
    this.modalBody.innerHTML = '';
    this.modalBody.append(node);
  }

  close() {
    // document.body.classList.toggle('is-modal-open'); // почему нельзя использовать toggle?
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }
}

