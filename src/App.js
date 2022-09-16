import DocumentEditPage from "./pages/DocumentEditPage.js";
import DocumentListPage from "./pages/DocumentListPage.js";
import { initRoute } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
    const $app = document.createElement('div');
    $app.classList.add('documents-container');
    $target.appendChild($app);

    const fetchData = async () => {
        return await request('');
    };

    const documentListPage = new DocumentListPage({
        $target: $app,
        initialState: [],
        onChange: fetchData,
    });

    const documentEditPage = new DocumentEditPage({
        $target: $app,
        initialState: {
            id: null    
        },
        onChange: fetchData,
    });

    const handleActiveDocument = (currId) => {
       const $prevActive = document.querySelector('.active'); 
       if ($prevActive) $prevActive.classList.remove('active'); //이전에 active 된 사항이 있으면 activ class remove
       document.querySelector(`div[data-id="${currId}"]`).classList.add('active');
    };

    this.route = async () => {
        const res = await fetchData();
        documentListPage.setState(res);
        const { pathname } = window.location;
        
        if (pathname.startsWith('/document')) {
            const id = pathname.split('/').pop();
            handleActiveDocument(id);
            documentEditPage.setState({ id });
        }
    };

    this.route();
    initRoute(() => this.route());
}