async function getAllWorkSpaces() {
    try {
        const response = await axios.get('/api-public/workspaces/getEnableAllWorkSpaces');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
}

async function displayWorkSpaces() {
    const data = await getAllWorkSpaces();
    const container = document.getElementById('workspacesContainer');
    const backgrounds = [
        'url(/user/img/BackG1.jpg)',
        'url(/user/img/BackG2.jpg)',
        'url(/user/img/BackG3.jpg)',
        'url(/user/img/BackG4.jpg)',
        'url(/user/img/BackG5.jpg)',
        'url(/user/img/BackG6.jpg)',
    ];
    if (data && data.data) {
        data.data.forEach((workspace, index) => {
            const workspaceElement = document.createElement('div');
            workspaceElement.className = 'col-12 col-md-3 mb-3 d-flex flex-column align-items-center';
            const containerDiv = document.createElement('div');
            containerDiv.className = 'containerss';
            const backgroundIndex = index % backgrounds.length;
            const backgroundDiv = document.createElement('div');
            backgroundDiv.className = 'hinhChuNhat';
            backgroundDiv.style.backgroundImage = backgrounds[backgroundIndex];
            backgroundDiv.style.width = '100%';
            backgroundDiv.style.height = '100px';
            backgroundDiv.style.backgroundSize = 'cover';

            const shortNameDiv = document.createElement('div');
            shortNameDiv.className = 'dongChu obvious-text';
            shortNameDiv.style.fontSize = '18px';
            shortNameDiv.style.color = 'white';
            shortNameDiv.textContent = `${workspace.shortName}`;


            containerDiv.appendChild(backgroundDiv);
            containerDiv.appendChild(shortNameDiv);

            workspaceElement.appendChild(containerDiv);
            container.appendChild(workspaceElement);
        });
    } else {
        container.textContent = 'Không có dữ liệu để hiển thị';
    }
}

displayWorkSpaces();

async function fetchBoards() {
    try {
        const response = await axios.get('/api-public/board/getEnableAllBoard');
        // console.log(response.data);  // Kiểm tra dữ liệu trả về từ API
        const boards = response.data.data; // Điều chỉnh theo cấu trúc dữ liệu thực tế
        if (!Array.isArray(boards)) {
            throw new Error("Dữ liệu trả về không phải là mảng");
        }
        const boardContainer = document.getElementById('board-container');
        const backgrounds = [
            'url(/user/img/BackG1.jpg)',
            'url(/user/img/BackG2.jpg)',
            'url(/user/img/BackG3.jpg)',
            'url(/user/img/BackG4.jpg)',
            'url(/user/img/BackG5.jpg)',
            'url(/user/img/BackG6.jpg)',
        ];
        const groupedBoards = new Map();
        boards.forEach(board => {
            const workspaceName = board.workSpace.workspaceName;
            if (!groupedBoards.has(workspaceName)) {
                groupedBoards.set(workspaceName, []);
            }
            groupedBoards.get(workspaceName).push(board);
        });

        let index = 0;
        groupedBoards.forEach((boards, workspaceName) => {
            const workspaceNameElement = document.createElement('div');
            workspaceNameElement.className = 'd-flex flex-column flex-lg-row justify-content-between mt-2 col-12 col-sm-12';
            workspaceNameElement.innerHTML = `<h5 class="ms-1">${workspaceName}</h5>`;
            boardContainer.appendChild(workspaceNameElement);
            boards.forEach(board => {
                const boardElement = document.createElement('div');
                boardElement.className = 'col-12 col-md-6 mb-3 d-flex flex-column align-items-center';
                const randomBackground = backgrounds[index % backgrounds.length];
                boardElement.innerHTML = `
                    <div class="containerss" style="background-image: ${randomBackground}; border-radius: 8px;">
                        <div class="hinhChuNhat" style="width: 100%; height: 100px; background-size: cover;"></div>
                        <div class="dongChu obvious-text" style="font-size: 18px;">Bảng: ${board.boardName}</div>
                    </div>
                `;
                boardElement.addEventListener('click', () => {
                    window.location.href = `/b/${board.slugUrl}/${board.boardName}`;
                });
                boardContainer.appendChild(boardElement);
                index++;
            });
        });
    } catch (error) {
        console.error('Error fetching boards:', error);
    }
}


window.onload = fetchBoards;

async function fetchWorkspaceIds() {
    try {
        const response = await axios.get('/api-public/workspaces/getEnableAllWorkSpaces');
        return response.data;
    } catch (error) {
        console.error('Error fetching workspaceId:', error);
        throw error;
    }
}
fetchWorkspaceIds()
    .then(response => {
        const workspaceIds = response.data; // Lấy mảng workspaceIds từ trường 'data' của response
        const workspaceDropdown = document.getElementById('workSpaceId');
        if (Array.isArray(workspaceIds)) {
            workspaceIds.forEach(workspace => {
                const option = document.createElement('option');
                option.value = workspace.workspaceId;
                option.textContent = workspace.workspaceName;
                workspaceDropdown.appendChild(option);
            });
        } else {
            console.error('WorkspaceIds is not an array:', workspaceIds);
        }
    })
    .catch(error => console.error('Error fetching and updating workspaceId:', error));

const showErrorAlert = (message) => {
    Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: message,
    });
};
const verificationForm = () => {
    const boardName = document.getElementById('boardName').value;
    const shortNameBoard = document.getElementById('shortNameBoard').value;
    let slugUrl = document.getElementById('slugUrl').value;
    if (boardName === '') {
        showErrorAlert("Vui lòng nhập board name!");
        document.getElementById('boardName').focus();
        return false;
    } else if (shortNameBoard === '') {
        showErrorAlert("Vui lòng nhập short name!");
        document.getElementById('shortNameBoard').focus();
        return false;
    }
    else if (slugUrl === '') {
        slugUrl = shortNameBoard.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        document.getElementById('slugUrl').value = slugUrl;
    }
    return true;
};

document.getElementById('saveButton').addEventListener('click', async function () {
    if (!verificationForm()) {
        return;
    }
    try {
        const workspaceId = document.getElementById('workSpaceId').value;
        const boardName = document.getElementById('boardName').value;
        const shortName = document.getElementById('shortNameBoard').value;
        const slugUrl = document.getElementById('slugUrl').value;
        const visibility = document.getElementById('visibility').value;

        if (!workspaceId) {
            console.error('workSpaceId is null or undefined.');
            return;
        }
        const response = await axios.post('/api-public/board/saveAllBoard', {
            workSpaceId: parseInt(workspaceId),
            boardName: boardName,
            shortName: shortName,
            slugUrl: slugUrl,
            visibility: visibility
        });

        $('#staticBackdrop').modal('hide');
        Swal.fire({
            position: 'between',
            icon: 'success',
            title: 'Lưu thành công',
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            window.location.reload();
        }, 1500);
    } catch (error) {
        console.error('Error saving board:', error);
        showErrorAlert("Có lỗi xảy ra khi lưu board. Vui lòng thử lại.");
    }
});

// hiển thị header
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('/api-public/workspaces/getEnableAllWorkSpaces');
        // console.log('API response:', response);
        const {status, data: workspaces} = response.data; // Điều chỉnh dựa trên cấu trúc phản hồi thực tế

        if (status !== 'Thành công' || !Array.isArray(workspaces)) {
            throw new Error('Invalid data format');
        }

        const dropdownMenu = document.getElementById('workspaceDropdownMenu');
        dropdownMenu.innerHTML = '';

        const backgrounds = [
            'url(/user/img/BackG1.jpg)',
            'url(/user/img/BackG2.jpg)',
            'url(/user/img/BackG3.jpg)',
            'url(/user/img/BackG4.jpg)',
            'url(/user/img/BackG5.jpg)',
            'url(/user/img/BackG6.jpg)',
        ];

        workspaces.forEach((workspace, index) => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.classList.add('dropdown-item', 'd-flex', 'align-items-center');
            anchor.href = '#';
            anchor.innerHTML = `
                <div style="background-image: ${backgrounds[index % backgrounds.length]}; background-size: cover; width: 40px; height: 40px; border-radius: 20%;"></div>
                <span class="ms-2 " style="font-size: 20px; color: black">${workspace.workspaceName}</span>
                `;
            listItem.appendChild(anchor);
            dropdownMenu.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.remove('d-none');
    }
});

// save workpaces
const showErrorAlert2 = (message) => {
    Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: message,
    });
};

const verificationWorkspaceForm = () => {
    const workSpaceName = document.getElementById('workSpaceName').value.trim();
    const shortName = document.getElementById('shortName').value.trim();
    const website = document.getElementById('website').value.trim();
    const description = document.getElementById('description').value.trim();

    if (workSpaceName === '') {
        showErrorAlert2("Vui lòng nhập workspace name!");
        document.getElementById('workSpaceName').focus();
        return false;
    } else if (shortName === '') {
        showErrorAlert2("Vui lòng nhập short name!");
        document.getElementById('shortName').focus();
        return false;
    } else if (website === '') {
        showErrorAlert2("Vui lòng nhập website!");
        document.getElementById('website').focus();
        return false;
    } else if (description === '') {
        showErrorAlert2("Vui lòng nhập description!");
        document.getElementById('description').focus();
        return false;
    }

    return true;
};

const saveWorkspace = async () => {
    if (!verificationWorkspaceForm()) {
        return;
    }
    try {
        const workSpaceName = document.getElementById('workSpaceName').value.trim();
        const shortName = document.getElementById('shortName').value.trim();
        const website = document.getElementById('website').value.trim();
        const description = document.getElementById('description').value.trim();

        const workspace = {
            workspaceName: workSpaceName,
            shortName: shortName,
            website: website,
            description: description
        };

        const response = await axios.post('/api-public/workspaces/saveWorkSpaces', workspace);

        $('#exampleModal').modal('hide');
        Swal.fire({
            position: 'between',
            icon: 'success',
            title: 'Lưu thành công',
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            window.location.reload();
        }, 1500);

    } catch (error) {
        console.error('Error saving workspace:', error);
        showErrorAlert("Có lỗi xảy ra khi lưu workspace. Vui lòng thử lại.");
    }
};

document.querySelector('.btn-primary').addEventListener('click', saveWorkspace);
