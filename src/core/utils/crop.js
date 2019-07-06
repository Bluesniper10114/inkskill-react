const parser = new DOMParser();

const isHtmlContent = content => content && content.search(/[<>]+/gm) >= 0;

const parseHtmlString = html => parser.parseFromString(html, 'text/html');

const cropText = (text, length) =>
  (text && text.length > length ? `${text.substr(0, length)}...` : text);

const crop = (contentIn, length) => {
  const isHtml = isHtmlContent(contentIn);
  let content;
  let text;

  if (!isHtml) {
    content = cropText(contentIn, length);
    text = contentIn;
  } else {
    const dom = parseHtmlString(contentIn);
    text = dom.body.innerText;
    content = cropText(text, length);
  }

  return {
    isHtml,
    content,
    text,
  };
};

export default crop;
