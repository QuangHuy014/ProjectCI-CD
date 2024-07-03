class BoardService {
    currentBoard = {};
    sortableStatus = -1;

    constructor() {
        // self = this;
    }

    init = async () => {
        let parts = window.location.href.split("/");
        if (parts[4] !== null) await this.getBoardBySlugUrl(parts[4]);
        await this.loadBoardInfo();
        this.addEventHandler();
    }

    getBoardBySlugUrl = async (slugUrl) => {
        await axios
            .get("/api-public/board/getBoardBySLugUrl", {
                params: {
                    slugUrl: slugUrl
                }
            })
            .then(response => {
                let result = response.data;
                this.currentBoard = result.data;
                // console.dir(this.currentBoard);
            })
            .catch(error => {
                let err = error.response.data;
                if (err.status === 'UNAUTHORIZED_MEMBER') {
                    Swal.fire({
                        title: '401',
                        text: err.message,
                        icon: 'error',
                        showCancelButton: true,
                        confirmButtonText: 'Về không gian làm việc',
                        cancelButtonText: 'Yêu cầu quyền truy cập',
                        allowOutsideClick: false,  // Ngăn người dùng click ra ngoài để đóng cảnh báo
                        allowEscapeKey: false,     // Ngăn người dùng nhấn phím "Escape" để đóng cảnh báo
                        allowEnterKey: false
                    }).then(result => {
                        if (result.isConfirmed) {
                            window.location.href = '/workspace'
                        } else if (result.isDismissed) {
                            let timerInterval;
                            Swal.fire({
                                title: 'Đã gửi, vui lòng chờ phản hồi!',
                                icon: 'success',
                                timer: 2000,
                                timerProgressBar: true,
                                // didOpen: () => {
                                //     Swal.showLoading();
                                //     const timer = Swal.getPopup().querySelector("b");
                                //     timerInterval = setInterval(() => {
                                //         timer.textContent = `${Swal.getTimerLeft()}`;
                                //     }, 500);
                                // },
                                // willClose: () => {
                                //     clearInterval(timerInterval);
                                // }
                            }).then(result => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    window.location.href = '/home';
                                }
                            })
                        }
                    })
                }
                console.dir(err);
            })
    }

    loadBoardInfo = async () => {
        let boardTile = $('#boardTitle');
        let boardName = $('#boardName');
        let listContainer = $('#listContainer');
        listContainer.html('');
        // console.dir(this.currentBoard);
        boardTile.html(this.currentBoard.boardName);
        boardName.val(this.currentBoard.boardName);

        // this.currentBoard.list.map(l -> )

        this.currentBoard.list.forEach(list => {
            let cardHtml = ``;
            list.cardEList.forEach(card => {
                cardHtml += `            
                    <div class="task card-body rounded bg-white mb-2 d-flex align-items-center mx-0 pe-0 py-2"
                         draggable="true">${card.title}<span class="d-none card-id">${card.cardId}</span>
                        <button class="btn btn-outline-dark border-0 me-2 ms-auto"
                                data-bs-target="#exampleModalToggle"
                                data-bs-toggle="modal"><i class="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                `;
            })
            let listHtml = `
            <div class="card m-3 p-2 pb-0 bg-gray a-list">
                <div class="card-header d-flex justify-content-between px-1 pb-3 border-0 bg-transparent">
<!--                    <p class="mb-0"><strong>${list.title}</strong></p>-->
                    <input type="text" value="${list.title}" class="border-0 bg-grey rounded-1 px-0 text-center"
                           size="22" style="font-weight: bold;" onblur="boardService.updateListInfo(this, ${list.listId})">
                    <span class="list-id d-none">${list.listId}</span>
                      <button type="button" class="btn btn-link text-reset m-0 py-0 px-2" 
                      data-ripple-color="dark" data-bs-toggle="dropdown" 
                      aria-expanded="false"><i class="fas fa-ellipsis-h"></i></button>
                        <ul class="dropdown-menu">
                          <li onclick="boardService.disableListByListId(${list.listId})"><a class="dropdown-item" href="#">Ẩn danh sách</a></li>
                        </ul>
                </div>
                <div class="swim-lane" data-sortable="sortable">` + cardHtml + `
                </div>
                <div class=" border-0 mb-2 d-flex justify-content-center">
                    <div>
                        <button type="button" class="btn btn-outline-dark border-0 me-2 add"
                                data-ripple-color="dark" onclick="boardService.createCard(${list.listId})">
                            <i class="fa-solid fa-plus"></i> Add another card
                        </button>
                    </div>
                </div>
            </div>            
            `;
            listContainer.append(listHtml);
        })
    }

    handleClassChange = (mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let target = mutation.target;
                // console.log(this.sortableStatus);
                if (target.classList.contains('sortable-chosen')
                    && target.classList.contains('sortable-ghost')) {
                    this.sortableStatus = 1;
                } else if (!target.classList.contains('sortable-chosen')
                    && !target.classList.contains('sortable-ghost')) {
                    this.sortableStatus--;
                }
                if (this.sortableStatus === 0) {
                    if (target.classList.contains('a-list')) {
                        this.updateOrdinalNumbers();
                    } else if (target.classList.contains('task')) {
                        this.updateCardOrdinalNumbers();
                    }
                    this.sortableStatus = -1;
                }
            }
        }
    }

    updateOrdinalNumbers = () => {
        let listIdNodes = document.querySelectorAll('.list-id');
        let listNodes = document.querySelectorAll('.a-list');
        let listIds = Array.from(listIdNodes).map(node => node.innerHTML);
        let listOrdinalNumbers = Array.from(listNodes).map((node, index) => index + 1);
        let requestBody = [];
        if (listIds.length === listOrdinalNumbers.length) {
            for (let i = 0; i < listIds.length; i++) {
                requestBody.push({
                    listId: listIds[i],
                    ordinalNumeral: listOrdinalNumbers[i]
                })
            }
        }
        axios
            .patch('/api-user/list/arrange', requestBody)
            .then(response => {
                let data = response.data;
                console.dir(data);
                // Swal.fire('success', data.message, 'success');
            })
            .catch(error => {
                console.error(error);
            })
    }

    updateCardOrdinalNumbers = () => {
        let listIdNodes = document.querySelectorAll('.list-id');
        let listNodes = document.querySelectorAll('.a-list');
        let listIds = Array.from(listIdNodes).map(node => node.innerHTML);
        let listCardDTO = [];
        listNodes.forEach((node, index) => {
            let taskNodes = node.querySelectorAll('.task');
            Array.from(taskNodes).map((node2, index2) => {
                let cardId = node2.querySelector('.card-id').innerHTML;
                listCardDTO.push({
                    ordinalNumber: index2 + 1,
                    cardId: cardId,
                    listId: listIds[index]
                });
            });
        });
        // console.log(JSON.stringify(listCardDTO));
        axios.patch('/api-user/card/arrange', listCardDTO)
            .then(response => {
                console.dir(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    addEventHandler = () => {
        $('#btnCreateList').on('click', () => {
            Swal.fire({
                title: 'Tạo danh sách mới',
                html: `<input type="text" id="title" class="swal2-input" placeholder="Tiêu đề">`,
                confirmButtonText: 'Tạo',
                focusConfirm: false,
                preConfirm: () => {
                    const title = $('#title').val();
                    if (!title) {
                        Swal.showValidationMessage(`Vui lòng nhập tiêu đề của danh sách mới!`);
                    }
                    return {title: title};
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    console.dir(result);
                    axios
                        .post('/api-user/list/save', {
                            title: result.value.title,
                            boardSlugUrl: this.currentBoard.slugUrl
                        })
                        .then(response => {
                            this.init();
                            // Swal.fire('Success', 'Data has been submitted!', 'success');
                        })
                        .catch(error => {
                            Swal.fire('Error', 'There was an error submitting your data', 'error');
                        });
                }
            });
        })
        document.querySelectorAll('.swim-lane').forEach(e => {
            new Sortable(e, {
                group: 'card-tier',
                animation: 150
            });
        });
        new Sortable(document.querySelector('#listContainer'), {
            group: 'list-tier',
            animation: 150
        });
        const observer = new MutationObserver(this.handleClassChange);
        const config = {attributes: true};
        const listNodes = document.querySelectorAll('.a-list');
        listNodes.forEach(node => observer.observe(node, config));
        const cardNodes = document.querySelectorAll('.task');
        cardNodes.forEach(node => observer.observe(node, config));

        // window.addEventListener('beforeunload', function(event) {
        //     console.log('User is about to leave the page');
        //     event.preventDefault();
        //     this.updateOrdinalNumbers().then(() => {
        //         event.returnValue = ''
        //     });
        // });

    }

    updateListInfo = async (node, listId) => {
        console.dir(node, listId);
        let requestBody = {
            listId: listId,
            title: node.value
        };
        axios
            .put('/api-user/list/updateTitle', requestBody)
            .then(response => {
                console.dir(response.data);
            })
            .catch(error => {
                console.error(error)
            })
    }

    disableListByListId = async (listId) => {
        Swal.fire({
            title: 'Bạn có muốn xóa danh sách này và tất cả thẻ trực thuộc?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Thoát'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete('/api-user/list/disable', {
                        params: {
                            listId: listId
                        }
                    })
                    .then(response => {
                        // let resp = response.data;
                        // console.dir(resp);
                        // Swal.fire(resp.status, resp.message, 'success');
                        this.init();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        })
    }

    createCard = (listId) => {
        let requestBody = {}
        Swal.fire({
            title: 'Tạo thẻ mới',
            html: `<input type="text" id="title" class="swal2-input" placeholder="Tiêu đề">`,
            confirmButtonText: 'Tạo',
            focusConfirm: false,
            preConfirm: () => {
                const title = $('#title').val();
                if (!title) {
                    Swal.showValidationMessage(`Vui lòng nhập tiêu đề của thẻ mới!`);
                }
                return {title: title};
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.dir(result);
                axios
                    .post('/api-user/card/save', {
                        title: result.value.title,
                        listId: listId
                    })
                    .then(response => {
                        console.dir(response.data);
                        this.init();
                        // Swal.fire('Success', 'Data has been submitted!', 'success');
                    })
                    .catch(error => {
                        Swal.fire('Error', 'There was an error submitting your data', 'error');
                    });
            }
        });
        // axios
        //     .post('api-user/card/save')
    }
}