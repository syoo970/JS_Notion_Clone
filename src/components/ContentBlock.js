export default function ContentBlock({ $target, initialState, onEdit }) {
  const $contentBlock = document.createElement("div");
  $contentBlock.classList.add("content-block");
  const $pageContent = document.querySelector(".page-content");

  initialState.isNewBlock 
   ? ($target.classList.contains("title-block") ? $pageContent.prepend($contentBlock) : $target.after($contentBlock))
   : $target.appendChild($contentBlock);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { content, isEditable } = this.state;
    $contentBlock.setAttribute("contentEditable", isEditable);
    $contentBlock.setAttribute("placeholder", "content 입력");
    $contentBlock.innerHTML = content ? content : "";
    $contentBlock.focus();
  };

  this.render();

  $contentBlock.addEventListener("input", () => {
    onEdit();
  });
}
