import Editor from '../components/Editor.js';
import { request } from '../utils/api.js';

export default function DocumentEditPage({ $target, initialState, onChange }) {
    const $editPage = document.createElement('div');
    $editPage.classList.add('edit-page');

    this.state = initialState;

    const editor = new Editor({
        $target: $editPage,
        initialState: {
            id: this.state.id,
            title: '',
            content: '',
            documents: [],
        },
        onSave: async (docs) => {
            //editor.setState({...editor.state,...docs});
            await request(`/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(docs),
            });
        },
        onChange,
    });

    this.setState = async (nextState) => {
        this.state = nextState;
        const res = await request(`/${this.state.id}`);
        if (!res) return;
        const { id, title, content, documents } = res;
        editor.setState({id, title, content, documents});
        this.render();
    };

    this.render = () => {
        console.log('editpage render');
        $target.appendChild($editPage);
    };
}