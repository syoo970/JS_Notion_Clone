import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function AddButton({ $target, initialState, onChange }) {
    const $btn = document.createElement('button');
    $btn.classList.add('add-btn');
    $target.appendChild($btn);

    this.state = initialState;
    /*
    this.state = {
        id => Documents의 id, title: button의 text
      };
      AddButton Component 역할 => 새로운 포스트 생성 (하위 포스트 포함)
    */

    this.render = () => {
      $btn.innerText = this.state.title;  
    };

    this.render();

    $btn.addEventListener('click', async () => {
        const res = await request('', {
            method: 'POST',
            body: JSON.stringify({
              title: '',
              parent: this.state.id ? this.state.id : null,  
            })
        });
        push(`/document/${res.id}`);
        await onChange();
    });
}