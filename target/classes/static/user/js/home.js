var verificationForm = () => {
    let message = "Please Input Value";
    if ($('#workspacename').val() === '') {
        alert(message);
        $('#workspacename').focus();
        return false;
    } else if ($('#shortname').val() === '') {
        alert(message);
        $('#shortname').focus();
        return false;
    } else if ($('website').val() === '') {
        alert(message);
        $('#website').focus();
        return false;
    } else if ($('#description').val() === '') {
        alert(message);
        $('#description').focus()
        return false;
    }
    return true;
}
btnClear_Click = () => {
    data = {
        workSpaceName: '',
        shortName: '',
        website: '',
        description: ''
    };
    fillForm(data)

}
fillForm = (data) => {
    $('#workspacename').val(data.workSpaceName);
    $('#shortname').val(data.shortName);
    $('#website').val(data.website);
    $('#description').val(data.description);
}

document.addEventListener('DOMContentLoaded', function () {
    // Select the form element
    const submitCreateWorkspace = document.getElementById("workspaceForm");

    // Attach submit event listener to the form
    submitCreateWorkspace.addEventListener('submit', async (event) => {
        submitForm(event);
    });
});

async function submitForm(event) {
    event.preventDefault();
    if (!verificationForm()) {
        return;
    }
    const formData = {
        workspaceName: document.getElementById('workspacename').value,
        shortName: document.getElementById('shortname').value,
        website: document.getElementById('website').value,
        description: document.getElementById('description').value
    };

    try {
        const response = await axios.post('/api-public/workspace/PostSaveWorkSpace', formData);
        const result = response.data;
        if (result.status === 'success') {
            Swal.fire("Workspace created successfully!");
            // nghĩa thêm load
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            Swal.fire("Failed to create workspace", result.message)
            // console.log("Failed to create workspace")
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire('An error occurred while creating the workspace.');
    }
}

async function fetchRecentlyViewedWorkspaces() {
    try {
        const response = await axios.get('/api-public/workspace/doGetWorkspaceByUser');
        const result = response.data;

        if (result.status === 'success') {
            updateRecentlyViewedWorkspaces(result.data);
            updateRecentlyViewedWorkspacesForSideBar(result.data)
        } else {
            alert('error', 'Failed to fetch recently viewed workspaces', result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('error', 'An error occurred', 'An error occurred while fetching recently viewed workspaces.');
    }
}

// Function to update the recently viewed workspaces in the HTML
function updateRecentlyViewedWorkspaces(workspaces) {
    const container = document.getElementById('recentlyViewedContainer');
    container.innerHTML = ''; // Clear existing content

    workspaces.forEach(workspace => {
        const workspaceHtml = `        
        <div  class="col-12  d-flex flex-column align-items-center" onclick="window.location.href='/workspace'">     
        <div class="containerss">
        <div class="hinhChuNhat"
        style="background-image: url(https://trello-backgrounds.s3.amazonaws.com/575584dacedaafdf0d8660c2/480x272/02a67bbc2d5b879d912dad85eb5f3a05/asset_3.png); width: 100%; height: 100px; background-size: cover;"></div>
        <div class="dongChu" style="font-size: 15px;">   ${workspace.workspaceName}</div>
        </div>
        </div>
                                                     
        `;
        container.innerHTML += workspaceHtml;
    });
}

// Function get all board from workspace
async function fetchAllBoardFromWorkSpace(workspaceId) {
    const response = await axios.get(`/api-public/board/getInformationBoard?workspaceId=${workspaceId}`);
    const result = response.data;
    if (result.status === 'success') {
        updateAllBoardFromWorkSpace(result.data);
    } else {
        alert("fail to fetch when call api /api-public/board/getInformationBoard")
    }
}

function updateAllBoardFromWorkSpace(boards) {
    const container = document.getElementById('board-container');
    let boardHtml = '';

    boards.forEach((board, index) => {
        var boardUrl = `/b/ + ${board.slugUrl} + '/' + ${board.shortName}` ;
        boardHtml += `
            <div class="col-12 col-md-6 mb-3 d-flex flex-column align-items-center" onclick="window.location.href='${`/b/` + board.slugUrl + `/` + board.shortName}'">
            <div class="containerss">
            <div class="hinhChuNhat" style="background-image: url(https://trello-backgrounds.s3.amazonaws.com/575584dacedaafdf0d8660c2/480x272/02a67bbc2d5b879d912dad85eb5f3a05/asset_3.png); width: 100%; height: 100px; background-size: cover;"></div>
            <div class="dongChu" style="font-size: 15px;">${board.boardName}</div>
            </div>
            </div> 
    `;
    });

    container.innerHTML = `<div class="task_board mt-3 row d-flex col-sm-12">${boardHtml}</div>`;
}

function updateRecentlyViewedWorkspacesForSideBar(workspaces) {
    const container = document.getElementById('accordionFlushExample');
    container.innerHTML = ''; // Clear existing content
    workspaces.forEach((workspace, index) => {
        const workspaceHtml = `
                <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne-${index}" aria-expanded="false" aria-controls="flush-collapseOne-${index}"
                style="background-color:rgb(133, 184, 255);">
                <h6> <i class="fa fa-users me-2" aria-hidden="true"></i>${workspace.workspaceName}</h6>
                </button>
                </h2>
                <div id="flush-collapseOne-${index}" class="accordion-collapse collapse baseball-link"
                 data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                <a href="" class="board-link" id="${workspace.workspaceId}" style="text-decoration: none; color: black;"><i class="fa fa-address-card me-2"
                aria-hidden="true"></i>Bảng</a>
                </div>
                </div>
                <div id="flush-collapseOne-${index}" class="accordion-collapse collapse baseball-link"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                <a href="" class="member-link" id="${workspace.workspaceId}"  style="text-decoration: none; color: black;"><i class="fa fa-user me-2"
                aria-hidden="true"></i>Thành viên</a>
                </div>
                </div>
                </div>
        `;
        container.innerHTML += workspaceHtml;
    });
    // Add event listener for member links

    container.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('member-link')) {
            event.preventDefault();
            const workspaceId = event.target.getAttribute('id');
            fetchMembers(workspaceId);
            // console.log("thanh cpmg")
        } else if (event.target && event.target.classList.contains('board-link')) {
            event.preventDefault();
            const workspaceId = event.target.getAttribute('id');
            fetchAllBoardFromWorkSpace(workspaceId);
            // console.log("thanh cpmg")
        }
    });

}

async function fetchMembers(workspaceId) {
    try {
        const response = await axios.get(`/api-public/collaborators/getInformation?workspaceId=${workspaceId}`);
        const result = response.data;
        // console.log(result)
        if (result.status === 'success') {
            updateMemberTable(result.data, workspaceId);
        } else {
            alert('Failed to fetch members: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching member information.');
    }
}

async function fetchMembersByWorkSpaceInBoard(workspaceId) {
    try {
        const response = await axios.get(`/api-public/member/getByworkspace?workspaceId=${workspaceId}`);
        const result = response.data;
        // console.log(result)
        if (result.status === 'success') {
            updateMemberTable(result.data);
        } else {
            alert('Failed to fetch members: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching member information.');
    }
}

function updateMemberTable(members, workspaceId) {
    const tableBody = document.getElementById('memberTable');
    tableBody.innerHTML = `
                <div class="search-bar">
                <input type="search" id="searchInput" placeholder="Lọc theo tên">
                </div>
                <ul class="user-list" id="userList">
               </ul>
    `; // Clear existing content

    async function getBoardByMemberInWorkSpace(workspaceId) {
        try {
            const response = axios.get(`api-public/board/getBoardsByWorkspace?${workspaceId}`)
            const result = response.data;
            if (result.status === "success") {

            } else {
                alert(`fail to fetch api-public/board/getBoardsByWorkspace?${workspaceId}`);
            }
        } catch (e) {
            console.error('Error:', e);
            alert('An error occurred while fetching board by member in workspace.');
        }
    }

    function renderMembers(filteredMembers) {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear existing list
        filteredMembers.forEach(member => {
            const rowHtml = ` 
                <hr>   
                <div class="user-info">
                <img src="https://trello-logos.s3.amazonaws.com/5637d7c208cebebdb7a2d9670a583dfb/170.png" alt="${member.fullname}" class="user-avatar">
                <div>
                <span class="user-name">${member.fullname}</span>
                </div>
                <span class="user-name">|</span>
                <span class="user-name">${member.email}</span>
                </div>
                <span class="user-last-active">Lần hoạt động gần nhất</span>
                <div class="btn-group">
                <button class="btn-remove" data-member-id="${member.collaboratorId}" data-workspace-id="${workspaceId}">X Loại bỏ...</button>
                <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-expanded="false" style="opacity: 0.9; ">
                Thông tin
                </button>
                <ul class="dropdown-menu" aria-labelledby="workspaceDropdown">
                <li class="dropdown-item">
                <img src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/109110a39fca9ca569ce38c695dbc7b0/photo-1512314889357-e157c22f938d.jpg" alt="Các Không gian làm việc" width="40" height="40" class="me-2 ro" style="border-radius: 20%">
                Dự Án 1 - StarBucks
                <button class="btn btn-danger remove-btn" style="margin-left: 10px;">Gỡ bỏ</button>
                </li>
                <li class="dropdown-item">
                <img src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/109110a39fca9ca569ce38c695dbc7b0/photo-1512314889357-e157c22f938d.jpg" alt="Các Không gian làm việc" width="40" height="40" class="me-2 ro" style="border-radius: 20%">
                Dự Án 1 - StarBucks
                <button class="btn btn-danger remove-btn" style="margin-left: 10px;">Gỡ bỏ</button>
                </li>
                <li class="dropdown-item">
                <img src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/109110a39fca9ca569ce38c695dbc7b0/photo-1512314889357-e157c22f938d.jpg" alt="Các Không gian làm việc" width="40" height="40" class="me-2 ro" style="border-radius: 20%">
                Dự Án 1 - StarBucks
                <button class="btn btn-danger remove-btn" style="margin-left: 10px;">Gỡ bỏ</button>
                </li>
                </ul>
                </div>
                <div id="boarOfUser"></div>
                </div>
                </div>
            `;
            userList.innerHTML += rowHtml;
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll('.btn-remove');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const memberId = event.target.getAttribute('data-member-id');
                const workspaceId = event.target.getAttribute('data-workspace-id');
                // console.log(memberId);
                // console.log(workspaceId);
                await deleteCollaborator(memberId, workspaceId);
            });
        });

    }

    async function deleteCollaborator(collaboratorId, workspaceId) {
        // Customizing SweetAlert2 with Bootstrap buttons
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        // Show confirmation dialog
        const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                // Making the delete request
                const response = await axios.delete(`/api-public/collaborators/delete`, {
                    params: {
                        collaboratorId: collaboratorId,
                        workspaceId: workspaceId
                    }
                });

            const resultData = response.data;

                if (resultData.status === "success") {
                    // Show success message
                    await swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "The collaborator has been deleted successfully.",
                        icon: "success"
                    });
                    // Refresh the members list
                    fetchMembers(workspaceId);
                } else {
                    // Show failure message
                    await swalWithBootstrapButtons.fire({
                        title: "Failed!",
                        text: resultData.message || "Failed to delete the collaborator.",
                        icon: "error"
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                // Show error message
                await swalWithBootstrapButtons.fire({
                    title: "Error!",
                    text: "An error occurred while deleting the collaborator.",
                    icon: "error"
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Show cancellation message
            await swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "The collaborator deletion was cancelled.",
                icon: "error"
            });
        }
    }

// Dummy function to simulate fetching members, replace with your actual function
    async function fetchMembers(workspaceId) {
        try {
            const response = await axios.get(`/api-public/collaborators/getInformation?workspaceId=${workspaceId}`);
            const result = response.data;

            if (result.status === 'success') {
                updateMemberTable(result.data, workspaceId);
            } else {
                alert('Failed to fetch members: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching member information.');
        }
    }


    // Initial render
    renderMembers(members);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredMembers = members.filter(member => member.fullname.toLowerCase().includes(searchTerm));
        renderMembers(filteredMembers);
    });

}

document.addEventListener('DOMContentLoaded', function () {
    fetchRecentlyViewedWorkspaces();
});
