import OneWay from './OneWay';

export default function Hotels() {
  return (
    <div
      className="hotel-src-banner-section"
      style={{ backgroundImage: 'url(/images/banner-srvc-img2.png)' }}
    >
      <div className="container">
        <h1>Stop searching, start booking your hotels at once</h1>
        <div className="new-transfer-new-form">
          <div className="inner-hotel-book-form-bx inner-hotel-book-form-bx333">
            <OneWay />
          </div>
        </div>
      </div>
    </div>
  );
}
