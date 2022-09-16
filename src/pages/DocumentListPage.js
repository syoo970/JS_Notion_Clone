import DocumentList from "../components/DocumentList.js";
import AddButton from "../components/AddButton.js";
import DocumentListHeader from "../components/DocumentListHeader.js";

export default function  DocumentListPage({ $target, initialState, onChange }) {
    const $listPage = document.createElement('div');
    $listPage.classList.add('list-page');

    this.state = initialState;

    let init = false;

    this.setState = (nextState) => {
        this.state = nextState;
        documentList.setState(this.state);
        this.render();
    };

    new DocumentListHeader({
        $target: $listPage,
        initialState: {
            title: '😎유승범의 Yution'
        }
    });


    const documentList = new DocumentList({
        $target: $listPage,
        initialState: this.state,
        onChange,
    });

    new AddButton({
        $target: $listPage,
        initialState: {
            id: null,
            title: '새로운 포스트',
        },
        onChange,
    });

    this.render = () => {
        if (init) return;
        $target.appendChild($listPage);
        init = true;
    };
}