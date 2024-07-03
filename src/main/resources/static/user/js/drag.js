// const draggables = document.querySelectorAll(".task");
// const droppables = document.querySelectorAll(".swim-lane");

// draggables.forEach((task) => {
//   task.addEventListener("dragstart", () => {
//     task.classList.add("is-dragging");
//   });
//   task.addEventListener("dragend", () => {
//     task.classList.remove("is-dragging");
//   });
// });

// droppables.forEach((zone) => {
//   zone.addEventListener("dragover", (e) => {
//     e.preventDefault();

//     const bottomTask = insertAboveTask(zone, e.clientY);
//     const curTask = document.querySelector(".is-dragging");

//     if (!bottomTask) {
//       zone.appendChild(curTask);
//     } else {
//       zone.insertBefore(curTask, bottomTask);
//     }
//   });
// });

// const insertAboveTask = (zone, mouseY) => {
//   const els = zone.querySelectorAll(".task:not(.is-dragging)");

//   let closestTask = null;
//   let closestOffset = Number.NEGATIVE_INFINITY;

//   els.forEach((task) => {
//     const { top } = task.getBoundingClientRect();

//     const offset = mouseY - top;

//     if (offset < 0 && offset > closestOffset) {
//       closestOffset = offset;
//       closestTask = task;
//     }
//   });

//   return closestTask;
// };


// Hàm gán sự kiện kéo thả cho các phần tử
const addDragAndDropEvents = (task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
};

const addDragOverEvent = (zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
};

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};


// Hàm gán sự kiện cho nút "Add another card"
const setupAddCardButton = (button) => {
  button.addEventListener('click', function () {
    // Tìm phần tử cha (card) của nút được click
    const parentCard = button.closest('.card');
    
    // Tạo một div mới chứa input để nhập nội dung thẻ
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('task', 'sortable-item', 'card-body', 'rounded', 'bg-white', 'shadow-2', 'mb-2');

    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.classList.add('form-control');
    inputField.setAttribute('placeholder', 'Nhập nội dung mới');

    // Thêm input vào div
    inputDiv.appendChild(inputField);

    // Thêm div mới vào swim-lane của card cha
    const swimLane = parentCard.querySelector('.swim-lane');
    swimLane.appendChild(inputDiv);

    // Đặt focus vào input field ngay khi nó được thêm vào DOM
    inputField.focus();

    // Xử lý sự kiện khi người dùng nhấn Enter
    inputField.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const cardContent = inputField.value.trim();
        
        // Kiểm tra nội dung nhập vào
        if (cardContent !== '') {
          // Thay thế input field bằng nội dung người dùng nhập
          inputDiv.textContent = cardContent;

          // Gắn sự kiện dragstart và dragend cho thẻ mới
          inputDiv.setAttribute('draggable', 'true');
          inputDiv.addEventListener('dragstart', () => {
            inputDiv.classList.add('is-dragging');
          });
          inputDiv.addEventListener('dragend', () => {
            inputDiv.classList.remove('is-dragging');
          });
        } else {
          // Nếu nội dung rỗng, xóa div chứa input
          swimLane.removeChild(inputDiv);
          alert('Nội dung không được để trống!');
        }
      }
    });

    // Xử lý khi người dùng click ra ngoài input để hủy việc thêm thẻ mới
    inputField.addEventListener('blur', function () {
      if (inputField.value.trim() === '') {
        swimLane.removeChild(inputDiv);
      }
    });
  });
};

// Hàm gán sự kiện cho nút "Delete"
const setupDeleteCardButton = (button) => {
  button.addEventListener('click', function () {
    // Tìm phần tử cha (card) của nút được click
    const parentCard = button.closest('.card');

    // Lấy danh sách các thẻ trong swim-lane của card cha
    const swimLane = parentCard.querySelector('.swim-lane');
    const tasks = swimLane.querySelectorAll('.task');

    // Nếu có ít nhất một thẻ, xóa thẻ cuối cùng
    if (tasks.length > 0) {
      const lastTask = tasks[tasks.length - 1];
      swimLane.removeChild(lastTask);
    } else {
      // Nếu không còn thẻ nào để xóa, xóa luôn thẻ cha
      parentCard.remove();
    }
  });
};

// Gán sự kiện kéo thả cho các phần tử hiện có
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => addDragAndDropEvents(task));
droppables.forEach((zone) => addDragOverEvent(zone));

// Gán sự kiện click cho tất cả các nút "Add another card" hiện có
const addCardButtonss = document.querySelectorAll(' button.add');
addCardButtonss.forEach(button => setupAddCardButton(button));

// Gán sự kiện click cho tất cả các nút "Delete" hiện có
const deleteCardButtonss = document.querySelectorAll(' button.delete');
deleteCardButtonss.forEach(button => setupDeleteCardButton(button));

// Lấy tham chiếu đến nút "Tạo mới"
const createNewButton = document.querySelector('.addTaoMoi');

// Gắn sự kiện click vào nút "Tạo mới"
createNewButton.addEventListener('click', function () {
  // Yêu cầu người dùng nhập tên cho card mới
  const cardName = prompt('Nhập tên cho card mới:');

  // Nếu người dùng không nhập hoặc nhập vào chuỗi trống, không tạo card mới
  if (!cardName || cardName.trim() === '') {
    return;
  }
  
  // Tạo một thẻ card mới
  const newCard = document.createElement('div');
  newCard.classList.add('card', 'shadow-1-strong', 'm-3', 'p-2', 'pb-0');

  // Thêm nội dung cho card mới với tên được nhập từ prompt
  newCard.innerHTML = `
    <div class="  card-header d-flex justify-content-between pl-1 pr-0 pb-3 border-0" draggable="true">
      <p class="mb-0"><strong>${cardName}</strong></p>
      <button type="button" class="btn btn-link text-reset m-0 py-0 px-2" data-ripple-color="dark">
        <i class="fas fa-ellipsis-h"></i>
      </button>
    </div>

    <div class="" data-sortable="sortable" >
      <!-- Card -->
      <div class="image_list">
        <div class="W21VDtqqicaQTk" data-testid="card-front-cover" data-card-front-section="cover"
          style="border-radius: 20px; height: 176.667px; max-height: 260px; background-color: rgb(190, 187, 182); background-image: url(&quot;https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x640/a76d7d4550345a1be70bb7b95cce6ed7/photo-1446511437394-36cdff3ae1b3.jpg&quot;); background-size: cover;">
        </div>
        <h5 class="text-center">what is this?</h5>
      </div>
      <div class="task sortable-item card-body rounded bg-white shadow-2 mb-2" draggable="true">
        Item 1
      </div>

      <div class="task sortable-item card-body rounded bg-white shadow-2 mb-2" draggable="true">
        Item 2
      </div>
    </div>

    <div class=" border-0 mb-2 d-flex justify-content-center">
      <div>
        <button type="button" class="btn btn-info text-reset me-2 add" data-ripple-color="dark">
          Add another card
        </button>
      </div>
   
      <div>
        <button type="button" class="btn btn-danger delete" data-ripple-color="dark">
          Delete
        </button>
      </div>
    </div>
  `;

  // Lấy tham chiếu đến danh sách "Done"
  const doneList = document.querySelector('#todo-lane');

  // Chèn card mới vào sau danh sách "Done"
  doneList.insertAdjacentElement('afterend', newCard);

  // Gắn sự kiện drag cho tất cả các phần tử .task trong toàn bộ danh sách
  const newTasks = newCard.querySelectorAll(".task");
  newTasks.forEach(task => addDragAndDropEvents(task));

  // Gắn sự kiện dragover cho card mới
  const newSwimLane = newCard.querySelector(".swim-lane");
  addDragOverEvent(newSwimLane);

  // Gắn sự kiện click cho nút "Add another card" và "Delete" trong thẻ card mới
  const newAddCardButton = newCard.querySelector(' button.add');
  setupAddCardButton(newAddCardButton);

  const newDeleteCardButton = newCard.querySelector(' button.delete');
  setupDeleteCardButton(newDeleteCardButton);

  // Hiển thị thông báo thành công
  Swal.fire({
    position: "top-between",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  });
});



// Lấy tất cả các nút "Add another card"
const addCardButtons = document.querySelectorAll('.add');

// Lặp qua từng nút và thêm sự kiện click cho việc thêm thẻ mới
addCardButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Tìm phần tử cha (card) của nút được click
    const parentCard = button.closest('.card');
    
    // Tạo một div mới chứa input để nhập nội dung thẻ
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('task', 'sortable-item', 'card-body', 'rounded', 'bg-white', 'shadow-2', 'mb-2');

    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.classList.add('form-control');
    inputField.setAttribute('placeholder', 'Nhập nội dung mới');

    // Thêm input vào div
    inputDiv.appendChild(inputField);

    // Thêm div mới vào swim-lane của card cha
    const swimLane = parentCard.querySelector('.swim-lane');
    swimLane.appendChild(inputDiv);

    // Đặt focus vào input field ngay khi nó được thêm vào DOM
    inputField.focus();

    // Xử lý sự kiện khi người dùng nhấn Enter
    inputField.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const cardContent = inputField.value.trim();
        
        // Kiểm tra nội dung nhập vào
        if (cardContent !== '') {
          // Thay thế input field bằng nội dung người dùng nhập
          inputDiv.textContent = cardContent;

          // Gắn sự kiện dragstart và dragend cho thẻ mới
          inputDiv.setAttribute('draggable', 'true');
          inputDiv.addEventListener('dragstart', () => {
            inputDiv.classList.add('is-dragging');
          });
          inputDiv.addEventListener('dragend', () => {
            inputDiv.classList.remove('is-dragging');
          });
        } else {
          // Nếu nội dung rỗng, xóa div chứa input
          swimLane.removeChild(inputDiv);
          alert('Nội dung không được để trống!');
        }
      }
    });

    // Xử lý khi người dùng click ra ngoài input để hủy việc thêm thẻ mới
    inputField.addEventListener('blur', function () {
      if (inputField.value.trim() === '') {
        swimLane.removeChild(inputDiv);
      }
    });
  });
});

// Lấy tất cả các nút "Delete"
const deleteCardButtons = document.querySelectorAll('.delete');

// Lặp qua từng nút và thêm sự kiện click cho việc xóa thẻ cuối cùng
deleteCardButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Tìm phần tử cha (card) của nút được click
    const parentCard = button.closest('.card');

    // Lấy danh sách các thẻ trong swim-lane của card cha
    const swimLane = parentCard.querySelector('.swim-lane');
    const tasks = swimLane.querySelectorAll('.task');

    // Nếu có ít nhất một thẻ, xóa thẻ cuối cùng
    if (tasks.length > 0) {
      const lastTask = tasks[tasks.length - 1];
      swimLane.removeChild(lastTask);
    } else {
      // Nếu không còn thẻ nào để xóa, xóa luôn thẻ cha
      parentCard.remove();
    }
  });
});
///slide bar
var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});
///slide bar
/////drag todolane
const lanes = document.querySelectorAll(".swim-lane");
// Lane drag and drop functionality
lanes.forEach((lane) => {
  lane.addEventListener("dragstart", () => {
    lane.classList.add("is-dragging-lane");
  });

  lane.addEventListener("dragend", () => {
    lane.classList.remove("is-dragging-lane");
  });

  lane.addEventListener("dragover", (e) => {
    e.preventDefault();
    const curLane = document.querySelector(".is-dragging-lane");
    const lanesContainer = lane.parentNode;
    const lanesArray = Array.from(lanesContainer.children);
    const hoverIndex = lanesArray.indexOf(lane);
    const dragIndex = lanesArray.indexOf(curLane);
    if (hoverIndex > dragIndex) {
      lanesContainer.insertBefore(curLane, lane.nextSibling);
    } else {
      lanesContainer.insertBefore(curLane, lane);
    }
  });
});
/////drag todolane

