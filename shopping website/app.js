
let phoneList = [];

//json doyasını alma
const getPhones = () => {
  fetch("./products.json")
    .then((res) => res.json())
    .then((phones) => (phoneList = phones));
};

getPhones();

//listeleme işlemi
const addPhoneItemsHtml = () => {
  const phoneListElement = document.querySelector(".phonelist");
  let phoneListHtml = "";
  phoneList.forEach((phone, index) => {
    phoneListHtml += `<div class="col-5 ${index % 2 == 0 && "offset-2"} my-5">
    <div class="row phone_card">
      <div class="col-6">
        <img
          class="img-fluid shadow"
          src="${phone.thumbnail}"
          width="258"
          height="400"
        />
      </div>
      <div class="col-6 d-flex flex-column justify-content-between">
        <div class="phone_detail">
          <span class="fos gray fs-5">${phone.title}</span><br />
          <span class="fs-4 fw-bold">${phone.brand}</span><br />
          <span class="fs-4 fw-bold">${phone.rating}</span><br />
          <span class="fs-4 fw-bold"> ${phone.stock} left in stock.</span><br />
        </div>
        <p class="phone_detail">
          ${phone.description}
        </p>
        <div>
        <span class=" fw-bold fs-4 me-2">Full Price : ${phone.price}₺</span><br />
        ${
           `<span class="fs-4 fw-bold">${phone.discountPercentage} Off</span>`
        }
        </div>     
      </div>
    </div>
  </div>`;
  });

  phoneListElement.innerHTML = phoneListHtml;
};

const PHONE_TYPES = {
  ALL: "Tümü",
  IPHONE: "Iphone",
  SAMSUNG: "Samsung",
  OPPO: "Oppo",
  HUAWEI: "Huawei",

};

const addPhoneTypesHtml = () => {
  const filterElement = document.querySelector(".filter");
  let filterHtml = "";
  let filterTypes = ["ALL"];
  phoneList.forEach((phone) => {
    if (filterTypes.findIndex((filter) => filter == phone.brand) == -1)
      filterTypes.push(phone.brand);
  });

  filterTypes.forEach((brand, index) => {
    filterHtml += `<li class="${
      index == 0 ? "active" : null
    }" onclick="filterPhones(this)" data-type="${brand}">${
      PHONE_TYPES[brand] || brand
    }</li>`;
  });

  filterElement.innerHTML = filterHtml;
};

const filterPhones = (filterElement) => {
  document.querySelector(".filter .active").classList.remove("active");
  filterElement.classList.add("active");
  let phoneType = filterElement.dataset.brand;
  getPhones();
  if (phoneType != "ALL")
    phoneList = phoneList.filter((phone) => phone.brand == phoneType);
  addPhoneItemsHtml();
};


setTimeout(() => {
  addPhoneItemsHtml();
  addPhoneTypesHtml();
}, 100);

