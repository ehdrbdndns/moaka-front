import React from 'react';

function Footer() {
  return (
    <>
      <footer className="footer">
        <img className="footer__img" src="/img/footer.png" alt="푸터 이미지" />
        <span className="footer__email">Moaka2021@gmail.com</span>
        <div className="footer__sns">
          <span
            onClick={() =>
              window.open('https://www.instagram.com/moaka_official/?hl=ko')
            }
          >
            Instagram
          </span>
        </div>
        <div className="footer__privacy">
          <span
            onClick={() => {
              window.open(
                'https://moaka.notion.site/58b69c688c8e4465b6d91ea00ca169ed',
              );
            }}
          >
            이용 약관
          </span>
          <span
            className="px-ml-15"
            onClick={() => {
              window.open(
                'https://moaka.notion.site/4939e546ef704fefb913dc7d34c64d9d',
              );
            }}
          >
            개인정보 처리방침
          </span>
        </div>
        <span className="footer__caption">
          ⓒ 2021. moaca. All rights reserved.
        </span>
      </footer>
    </>
  );
}

export default Footer;
