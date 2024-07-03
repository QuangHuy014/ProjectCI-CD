// let swappingCards = false;
//
// const addDragAndDropEvents = (task) => {
//   task.setAttribute("draggable", "true");
//   task.addEventListener("dragstart", (e) => {
//     if (!swappingCards) {
//       task.classList.add("is-dragging");
//       e.dataTransfer.effectAllowed = "move";
//       e.dataTransfer.setData("text/html", task.outerHTML);
//       task.setAttribute("data-type", "task");
//     }
//   });
//   task.addEventListener("dragend", () => {
//     task.classList.remove("is-dragging");
//     task.removeAttribute("data-type");
//   });
// };
// const addDragOverEvent = (zone) => {
//   zone.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//
//     const curTask = document.querySelector(".is-dragging");
//     if (curTask && curTask.getAttribute("data-type") === "task") {
//       const bottomTask = insertAboveTask(zone, e.clientY);
//       if (!bottomTask) {
//         zone.appendChild(curTask);
//       } else {
//         zone.insertBefore(curTask, bottomTask);
//       }
//     }
//   });
//
//   zone.addEventListener("drop", (e) => {
//     e.preventDefault();
//     const curTask = document.querySelector(".is-dragging");
//     if (curTask && curTask.getAttribute("data-type") === "task") {
//       const bottomTask = insertAboveTask(zone, e.clientY);
//       if (!bottomTask) {
//         zone.appendChild(curTask);
//       } else {
//         zone.insertBefore(curTask, bottomTask);
//       }
//     }
//   });
// };
//
// const insertAboveTask = (zone, mouseY) => {
//   const tasks = [...zone.querySelectorAll(".task:not(.is-dragging)")];
//
//   return tasks.reduce((closest, child) => {
//     const box = child.getBoundingClientRect();
//     const offset = mouseY - box.top - box.height / 2;
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child };
//     } else {
//       return closest;
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element;
// };
//
// const addCardDragAndDropEvents = (card) => {
//   card.setAttribute("draggable", "true");
//
//   card.addEventListener("dragstart", (e) => {
//     if (!swappingCards && !e.target.closest(".task")) {
//       card.classList.add("is-dragging");
//       e.dataTransfer.effectAllowed = "move";
//       e.dataTransfer.setData("text/html", card.outerHTML);
//       card.setAttribute("data-type", "card");
//     } else {
//       swappingCards = true;
//     }
//   });
//
//   card.addEventListener("dragend", () => {
//     card.classList.remove("is-dragging");
//     card.removeAttribute("data-type");
//   });
//
//   card.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//   });
//
//   card.addEventListener("drop", (e) => {
//     e.preventDefault();
//     const curCard = document.querySelector(".card.is-dragging");
//     if (curCard && curCard !== card) {
//       swapCards(curCard, card);
//     }
//     swappingCards = false;
//   });
//
//   // Thêm sự kiện double click vào card
//   card.addEventListener("dblclick", () => {
//     const nextCard = card.nextElementSibling;
//     if (nextCard) {
//       swapCards(card, nextCard);
//     }
//   });
// };
//
//
//
// const cards = document.querySelectorAll(".card");
// cards.forEach(card => addCardDragAndDropEvents(card));
//
// const draggables = document.querySelectorAll(".task");
// draggables.forEach((task) => addDragAndDropEvents(task));
//
// const droppabless = document.querySelectorAll(".swim-lane");
// droppabless.forEach((zone) => addDragOverEvent(zone));
//
//
// const swapCards = (card1, card2) => {
//   const card1Parent = card1.parentNode;
//   const card2Parent = card2.parentNode;
//
//   const card1Next = card1.nextSibling === card2 ? card1 : card1.nextSibling;
//   card2Parent.insertBefore(card1, card2);
//   card1Parent.insertBefore(card2, card1Next);
// };
//
// const setupAddCardButton = (button) => {
//   button.addEventListener('click', function () {
//     const parentCard = button.closest('.card');
//     const inputDiv = document.createElement('div');
//     inputDiv.classList.add('task', 'sortable-item', 'card-body', 'rounded', 'bg-white', 'shadow-2', 'mb-2');
//     inputDiv.setAttribute('draggable', 'true'); // Thêm thuộc tính draggable
//
//     const inputField = document.createElement('input');
//     inputField.setAttribute('type', 'text');
//     inputField.classList.add('form-control');
//     inputField.setAttribute('placeholder', 'Nhập nội dung mới');
//
//     inputDiv.appendChild(inputField);
//     const swimLane = parentCard.querySelector('.swim-lane');
//     swimLane.appendChild(inputDiv);
//     inputField.focus();
//
//     // Thêm sự kiện kéo thả cho task mới
//     addDragAndDropEvents(inputDiv);
//
//     inputField.addEventListener('keydown', function (event) {
//       if (event.key === 'Enter') {
//         const cardContent = inputField.value.trim();
//         if (cardContent !== '') {
//           inputDiv.textContent = cardContent;
//           addDragAndDropEvents(inputDiv); // Thêm sự kiện kéo thả cho task mới
//         } else {
//           swimLane.removeChild(inputDiv);
//           alert('Nội dung không được để trống!');
//         }
//       }
//     });
//
//     inputField.addEventListener('blur', function () {
//       if (inputField.value.trim() === '') {
//         swimLane.removeChild(inputDiv);
//       }
//     });
//   });
// };
//
//
//
//
// const setupDeleteCardButton = (button) => {
//   button.addEventListener('click', function () {
//     const parentCard = button.closest('.card');
//     const swimLane = parentCard.querySelector('.swim-lane');
//     const tasks = swimLane.querySelectorAll('.task');
//
//     if (tasks.length > 0) {
//       const lastTask = tasks[tasks.length - 1];
//       swimLane.removeChild(lastTask);
//     } else {
//       parentCard.remove();
//     }
//   });
// };
//
//
// // Gán sự kiện click cho tất cả các nút "Add another card" hiện có
// const addCardButtonss = document.querySelectorAll(' button.add');
// addCardButtonss.forEach(button => setupAddCardButton(button));
//
// // Gán sự kiện click cho tất cả các nút "Delete" hiện có
// const deleteCardButtonss = document.querySelectorAll(' button.delete');
// deleteCardButtonss.forEach(button => setupDeleteCardButton(button));
//
// const createNewButton = document.querySelector('.addTaoMoi');
//
// createNewButton.addEventListener('click', function () {
//   // Yêu cầu người dùng nhập tên cho card mới
//   const cardName = prompt('Nhập tên cho card mới:');
//
//   // Nếu người dùng không nhập hoặc nhập vào chuỗi trống, không tạo card mới
//   if (!cardName || cardName.trim() === '') {
//     return;
//   }
//
//   // Tạo một thẻ card mới
//   const newCard = document.createElement('div');
//   newCard.classList.add('card', 'shadow-1-strong', 'm-3', 'p-2', 'pb-0');
//
//   // Thêm nội dung cho card mới với tên được nhập từ prompt
//   newCard.innerHTML = `
//   <div class="card-header d-flex justify-content-between pl-1 pr-0 pb-3 border-0">
//     <p class="mb-0"><strong>${cardName}</strong></p>
//     <button type="button" class="btn btn-link text-reset m-0 py-0 px-2" data-ripple-color="dark">
//       <i class="fas fa-ellipsis-h"></i>
//     </button>
//   </div>
//
//   <div class="swim-lane" data-sortable="sortable">
//     <!-- Card -->
//     <div class="image_list">
//       <div class="W21VDtqqicaQTk" data-testid="card-front-cover" data-card-front-section="cover"
//         style="border-radius: 20px; height: 176.667px; max-height: 260px; background-color: rgb(190, 187, 182); background-image: url(&quot;https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x640/a76d7d4550345a1be70bb7b95cce6ed7/photo-1446511437394-36cdff3ae1b3.jpg&quot;); background-size: cover;">
//       </div>
//       <h5 class="text-center">what is this?</h5>
//     </div>
//     <div class="task sortable-item card-body rounded bg-white shadow-2 mb-2" draggable="true">
//       Item 1
//     </div>
//
//     <div class="task sortable-item card-body rounded bg-white shadow-2 mb-2" draggable="true">
//       Item 2
//     </div>
//   </div>
//
//   <div class=" border-0 mb-2 d-flex justify-content-center">
//     <div>
//       <button type="button" class="btn btn-info text-reset me-2 add" data-ripple-color="dark">
//         Add another card
//       </button>
//     </div>
//
//     <div>
//       <button type="button" class="btn btn-danger deletee" data-ripple-color="dark">
//         Delete
//       </button>
//     </div>
//   </div>
//   `;
//
//   // Lấy tham chiếu đến danh sách "Done"
//   const doneList = document.querySelector('#todo-lane');
//
//   // Chèn card mới vào sau danh sách "Done"
//   doneList.insertAdjacentElement('afterend', newCard);
//
//   // Gắn sự kiện kéo thả cho card mới
//   addCardDragAndDropEvents(newCard);
//
//   // Gắn sự kiện dragover cho card mới
//   const newSwimLane = newCard.querySelector(".swim-lane");
//   addDragOverEvent(newSwimLane);
//
//   // Gắn sự kiện click cho nút "Add another card" và "Delete" trong thẻ card mới
//   const newAddCardButton = newCard.querySelector(' button.add');
//   setupAddCardButton(newAddCardButton);
//
//   const newDeleteCardButton = newCard.querySelector(' button.deletee');
//   setupDeleteCardButton(newDeleteCardButton);
//
//   // Gắn sự kiện kéo thả cho tất cả các item task trong card mới
//   const newTasks = newCard.querySelectorAll(".task");
//   newTasks.forEach(task => addDragAndDropEvents(task));
//
//   // Hiển thị thông báo thành công
//   Swal.fire({
//     position: "top-between",
//     icon: "success",
//     title: "Your work has been saved",
//     showConfirmButton: false,
//     timer: 1500
//   });
// });
//
//
// // createNewButton.addEventListener('click', function () {
// //   // Yêu cầu người dùng nhập tên cho card mới
// //   const cardName = prompt('Nhập tên cho card mới:');
//
// //   // Nếu người dùng không nhập hoặc nhập vào chuỗi trống, không tạo card mới
// //   if (!cardName || cardName.trim() === '') {
// //     return;
// //   }
//
// //   // Tạo một thẻ card mới
// //   const newCard = document.createElement('div');
// //   newCard.classList.add('card', 'shadow-1-strong', 'm-3', 'p-2', 'pb-0');
//
// //   // Thêm nội dung cho card mới với tên được nhập từ prompt
// //   newCard.innerHTML = `
// //   <div class="card-header d-flex justify-content-between pl-1 pr-0 pb-3 border-0">
// //   <p class="mb-0"><strong>${cardName}</strong></p>
// //   <button type="button" class="btn btn-link text-reset m-0 py-0 px-2" data-ripple-color="dark">
// //     <i class="fas fa-ellipsis-h"></i>
// //   </button>
// // </div>
//
// // <div class="swim-lane" data-sortable="sortable">
// //   <!-- Card -->
// //   <div class="image_list">
// //     <div class="W21VDtqqicaQTk" data-testid="card-front-cover" data-card-front-section="cover"
// //       style="border-radius: 20px; height: 176.667px; max-height: 260px; background-color: rgb(190, 187, 182); background-image: url(&quot;https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x640/a76d7d4550345a1be70bb7b95cce6ed7/photo-1446511437394-36cdff3ae1b3.jpg&quot;); background-size: cover;">
// //     </div>
// //     <h5 class="text-center">what is this?</h5>
// //   </div>
// //   <div class="task sortable-item card-body rounded bg-white shadow-2 mb-2" draggable="true">
// //     Item 1
// //   </div>
//
// //   <div class="task sortable-item card-body rounded bg-white shadow-2 mb-2" draggable="true">
// //     Item 2
// //   </div>
// // </div>
//
// // <div class=" border-0 mb-2 d-flex justify-content-center">
// //   <div>
// //     <button type="button" class="btn btn-info text-reset me-2 add" data-ripple-color="dark">
// //       Add another card
// //     </button>
// //   </div>
//
// //   <div>
// //     <button type="button" class="btn btn-danger deletee" data-ripple-color="dark">
// //       Delete
// //     </button>
// //   </div>
// // </div>
//
// //   `;
//
// //   // Lấy tham chiếu đến danh sách "Done"
// //   const doneList = document.querySelector('#todo-lane');
//
// //   // Chèn card mới vào sau danh sách "Done"
// //   doneList.insertAdjacentElement('afterend', newCard);
//
// //   // Gắn sự kiện kéo thả cho card mới
// //   addCardDragAndDropEvents(newCard);
//
// //   // Gắn sự kiện dragover cho card mới
// //   const newSwimLane = newCard.querySelector(".swim-lane");
// //   addDragOverEvent(newSwimLane);
//
// //   // Gắn sự kiện click cho nút "Add another card" và "Delete" trong thẻ card mới
// //   const newAddCardButton = newCard.querySelector(' button.add');
// //   setupAddCardButton(newAddCardButton);
//
// //   const newDeleteCardButton = newCard.querySelector(' button.deletee');
// //   setupDeleteCardButton(newDeleteCardButton);
//
// //   // Hiển thị thông báo thành công
// //   Swal.fire({
// //     position: "top-between",
// //     icon: "success",
// //     title: "Your work has been saved",
// //     showConfirmButton: false,
// //     timer: 1500
// //   });
// // });
//
//
//
//
//
//
//
//
//
