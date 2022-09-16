import { push } from "../utils/router.js";

export default function LinkBlock({ $target, initialState }) {
    const $div = document.createElement('div');
    $div.classList.add('link-block');
    $target.appendChild($div);

    this.state = initialState;

    this.render = () => {
        $div.innerHTML = this.state.title;
    };

    this.render();

    $div.addEventListener('click', () => {
        $target.classList.add('active');
        push(this.state.link);
    });
}