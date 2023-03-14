const loader = document.getElementById("spin");

// Load 6 data from all
const loadAllData6 = () => {
  loader.classList.remove("d-none");
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => appendData(data.data.tools.slice(0, 6)));
};

/************************************************ 
    6 data append into the ui
********************************************/
const myAllCard = document.getElementById("myAllCard");
const appendData = (data) => {
  myAllCard.innerHTML = "";

  for (let item of data) {
    let myFeature = item.features;
    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        
        <div class="card h-100">
                        <img src="${item.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <div>
                                <h4>Features</h4>
                                    ${
                                      myFeature
                                        ? `<ul class="list-unstyled">
                    
                                        ${`
                                        ${
                                          myFeature[0]
                                            ? `<li>1. ${myFeature[0]}</li>`
                                            : ""
                                        }
                                        `}
                    
                                        ${`
                                        ${
                                          myFeature[1]
                                            ? `<li>2. ${myFeature[1]}</li>`
                                            : ""
                                        }
                                        `}
                    
                                        ${`
                                        ${
                                          myFeature[2]
                                            ? `<li>3. ${myFeature[2]}</li>`
                                            : ""
                                        }
                                        `}
                                        ${`
                                        ${
                                          myFeature[3]
                                            ? `<li>4. ${myFeature[3]}</li>`
                                            : ""
                                        }
                                        `}
                    
                    
                                    </ul>`
                                        : "Data Not Found!!"
                                    }
                            </div>
                            <hr>
                            <div class="d-flex align-items-center justify-content-between">
                                <div>
                                    <h4 class="mb-3">${item.name}</h4>
                                    <p class="d-flex align-items-center">
                                    <img src="./assets/img/Date.png" class="me-2" alt="">
                                    ${item.published_in}
                                    </p>
                                </div>
                                <div>
                                    <span style="width:50px;height:50px;line-height:50px;background:#FEF7F7;cursor:pointer;" class="rounded-circle bg-danger-emphasis d-inline-block text-center text-danger" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="showDetails('${
                                      item.id
                                    }')"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

        `;
    loader.classList.add("d-none");
    myAllCard.appendChild(div);
  }
};

// see more all Data function
document.getElementById("seeMoreBtn").addEventListener("click", () => {
  myAllCard.innerHTML = "";
  loader.classList.remove("d-none");
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => appendData(data.data.tools));
});

// Sorting all data by button click
const sortBtn = (data, value) => {
  // console.log(data)
  let newArr;
  if (value === "descending") {
    newArr = data.sort(descendingOrder);
  } else if (value === "ascending") {
    newArr = data.sort(ascendingOrder);
  } else {
    newArr = data;
  }

  appendData(newArr);
};

const descendingOrder = (a, b) => {
  let firstOne = new Date(a.published_in).valueOf();
  let secondOne = new Date(b.published_in).valueOf();
  return secondOne - firstOne;
};

const ascendingOrder = (a, b) => {
  let firstOne = new Date(a.published_in).valueOf();
  let secondOne = new Date(b.published_in).valueOf();
  return firstOne - secondOne;
};

loadAllData6();

// Sorting all data

document.getElementById("changeSelect").addEventListener("change", (e) => {
  let orderValue = e.target.value;
  if (orderValue === "descending") {
    myAllCard.innerHTML = "";
    loader.classList.remove("d-none");
    fetch("https://openapi.programming-hero.com/api/ai/tools")
      .then((res) => res.json())
      .then((data) => sortBtn(data.data.tools, orderValue));
  } else if (orderValue === "ascending") {
    myAllCard.innerHTML = "";
    loader.classList.remove("d-none");
    fetch("https://openapi.programming-hero.com/api/ai/tools")
      .then((res) => res.json())
      .then((data) => sortBtn(data.data.tools, orderValue));
  } else {
    loader.classList.remove("d-none");
    myAllCard.innerHTML = "";
    fetch("https://openapi.programming-hero.com/api/ai/tools")
      .then((res) => res.json())
      .then((data) => sortBtn(data.data.tools, orderValue));
  }
});

// get data for modal

const showDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => modalData(data.data));
};

// showing details on the modal

const modalData = (data) => {
    let inputOutputText = data.input_output_examples;
    let accuracyValue = data.accuracy.score;
    let myFeature = data.features;


  let myIntegration = data.integrations;

  const modalRow = document.getElementById("modalRow");
  modalRow.innerHTML = `
    

    <div class="col-12 col-md-7">
    <div class="p-3 border border-danger-subtle rounded" style="background:#FEF7F7;">
        <h4 style="font-size:20px;">${data.description}</h4>
        <div class="myRow my-3">
            <div class="myCol">
               <p class="mb-0 text-success"> <span>${
                 data.pricing ? data.pricing[0].price : "Free of cost/"
               } </span> <br> <span>${
    data.pricing ? data.pricing[0].plan : "Basic"
  }</span> </p>
            </div>
            <div class="myCol">
            <p class="mb-0 text-warning"> <span>${
              data.pricing ? data.pricing[1].price : "Free of cost/"
            } </span> <br> <span>${
    data.pricing ? data.pricing[1].plan : "Pro"
  }</span> </p>
            </div>
            <div class="myCol">
            <p class="mb-0 text-danger"> <span>${
              data.pricing ? data.pricing[2].price : "Free of cost/"
            } </span> <br> <span>${
    data.pricing ? data.pricing[2].plan : "Enterprise"
  }</span> </p>
            </div>
        </div>
        <div class="row">
            <div class="col-6" id="featureId">
                <h4>Features</h4>

                ${
                  myFeature
                    ? `<ul>

                    ${`
                    ${
                      myFeature[1]
                        ? `<li>${myFeature[1].feature_name}</li>`
                        : ""
                    }
                    `}

                    ${`
                    ${
                      myFeature[2]
                        ? `<li>${myFeature[2].feature_name}</li>`
                        : ""
                    }
                    `}

                    ${`
                    ${
                      myFeature[3]
                        ? `<li>${myFeature[3].feature_name}</li>`
                        : ""
                    }
                    `}
                    ${`
                    ${
                      myFeature[4]
                        ? `<li>${myFeature[4].feature_name}</li>`
                        : ""
                    }
                    `}


                </ul>`
                    : "Data Not Found!!"
                }
                
            </div>

            <div class="col-6">
                <h4>Integrations</h4>
                ${
                  myIntegration
                    ? `<ul>
                
                    ${`
                    ${myIntegration[0] ? `<li>${myIntegration[0]}</li>` : ""}
                    `}

                    ${`
                    ${myIntegration[1] ? `<li>${myIntegration[1]}</li>` : ""}
                    `}

                    ${`
                    ${myIntegration[2] ? `<li>${myIntegration[2]}</li>` : ""}
                    `}

                </ul>`
                    : "Data Not Found!!"
                }
            </div>
        </div>
    </div>
</div>
<div class="col-12 col-md-5">
    <div class="p-3 border border-secondary-subtle rounded">
        <div class="accuracy">
            ${accuracyValue ? `<p>${accuracyValue * 100}% accuracy</p>` : ""}
            <img class="img-fluid" src="${data.image_link[0]}" alt="">
        </div>
        ${
            inputOutputText ? `<h4 class="mt-4 mb-3">${inputOutputText[0].input}</h4>`: `<h4 class="mt-4 mb-3">Can you give any example?</h4>`
        }

        ${
            inputOutputText ? `<p>${inputOutputText[0].output}</p>`: "<p>No! Not Yet! Take a break!!!</p>"
        }
        
        
    </div>
</div>

    
    
    `;
};
