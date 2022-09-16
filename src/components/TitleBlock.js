import AddButton from "./AddButton.js";
import DeleteButton from "./DeleteButton.js";
import LinkBlock from "./LinkBlock.js";
import ToggleButton from "./ToggleButton.js";

export default function TitleBlock({ $target, initialState, onChange, onEdit }) {
    const $titleBlock = document.createElement('div');
    let $btnBlock = document.createElement('div');
    $titleBlock.classList.add('title-block');
    $target.appendChild($titleBlock);

    this.state = initialState;
    // state => id(DocumentId), title, isEditable

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { isEditable, title, id } = this.state;
        $titleBlock.setAttribute('data-id', id);
        $titleBlock.setAttribute('contenteditable', isEditable);
        $titleBlock.setAttribute('placeholder', '제목 없음');

        if (this.state.isEditable) {
            $titleBlock.innerText = title;
        } else {
            if (this.state.isFoldable) {
                new ToggleButton({
                    $target: $titleBlock,
                    initialState: {
                        title: '✔'
                    }
                });
    
            }
            new LinkBlock({
                $target: $titleBlock,
                initialState: {
                    title: title === '' ? '제목 없음' : title,
                    link: `/documents/${id}`
                }
            });
        }   
    };

    this.render();

    if (!this.state.isEditable) {
        $titleBlock.addEventListener('mouseenter', () => {
            $btnBlock = document.createElement('div');
            new DeleteButton({
                $target: $btnBlock,
                initialState: {
                    id: this.state.id,
                    title: 'x',
                },
                onChange,
            });

            new AddButton({
                $target: $btnBlock,
                initialState: {
                    id: this.state.id,
                    title: '+',
                },
                onChange,
            });
            $titleBlock.appendChild($btnBlock);
        });

        $titleBlock.addEventListener('mouseleave', () => {
            $titleBlock.removeChild($btnBlock);
        });
    }

    $titleBlock.addEventListener('input', (e) => {
        const { innerText, dataset: { id } } = e.target;
        document.querySelector(`div[data-id="${id}"]`).innerText = innerText === '' ? '제목 없음' : innerText;
        onEdit();
    });
}