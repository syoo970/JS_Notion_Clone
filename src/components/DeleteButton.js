import { request } from "../utils/api.js";
import { push } from "../utils/router.js"; 

export default function DeleteButton({ $target, initialState, onChange }) {
    const $btn = document.createElement('button');
    $btn.classList.add('delete-btn');
    $target.appendChild($btn);

    this.state = initialState;
    /*
    this.state = {
        id => Documents의 id, title: button의 text
        }; , 삭제 로직 수행
    */

    this.render = () => {
        $btn.innerText = this.state.title;
    };

    this.render();

    $btn.addEventListener('click', async () => {
        await request(`/${this.state.id}`, {
            method: 'DELETE',
        });
        const res = await onChange();
        res.length ? push(`/document/${res[0].id}`) : push('/');
    });
}