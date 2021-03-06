;
var photoList = {
    selectedItems: [],
    selectedAll: false,
    itemsAll: document.querySelectorAll('.photo-list__item'),
    removeBtn: document.querySelector('._remove-items'),
    selectAllBtn: document.querySelector('._select-all'),
    sizeChangeBtn: document.querySelector('._size-change'),
    init: function () {
        var pl = this;
        pl.removeBtn.addEventListener('click', function () {
            pl.removeItems();
        });
        pl.selectAllBtn.addEventListener('click', function () {
            pl.selectAll();
        });
        document.querySelector('._header__filter-text').addEventListener('click', function (e) {
            pl.selectAllBtn.click();
        });
        /*pl.sizeChangeBtn.addEventListener('change', function (e) {
         pl.sizeChange(e);
         });*/
        for (var i = 0; i < pl.itemsAll.length; i++) {
            pl.itemsAll[i].dataset.id = i;
            pl.itemsAll[i].addEventListener('click', function (e) {
                var self = this;
                if (!self.classList.contains('photo-list__item--active')) {
                    self.classList.add('photo-list__item--active');
                    pl.selectedItems.push(this.dataset.id);
                } else {
                    self.classList.remove('photo-list__item--active');
                    for (var j = 0; j < pl.selectedItems.length; j++) {
                        if (parseInt(pl.selectedItems[j]) === parseInt(self.dataset.id)) {
                            pl.selectedItems.splice(j, 1);
                        }
                    }
                }
                (pl.selectedItems.length > 0)
                    ? pl.removeBtn.classList.add('remove-items--active')
                    : pl.removeBtn.classList.remove('remove-items--active');
            });
        }
        //select
        var selectCurrent = document.querySelector('.size-selector__current');
        var selectCurrentText = document.querySelector('.size-selector__current-text');
        var selectItemsContainer = document.querySelector('.size-selector__items');
        var selectItems = document.querySelectorAll('.size-selector__item');
        selectCurrent.addEventListener('click', function (e) {
            if (selectCurrent.dataset.opened === "false") {
                selectCurrent.dataset.opened = true;
                selectItemsContainer.style.display = 'block';
            } else {
                selectCurrent.dataset.opened = false;
                selectItemsContainer.style.display = 'none';
            }
        });
        for (var i = 0; i < selectItems.length; i++) {
            selectItems[i].addEventListener('click', function (e) {
                selectCurrentText.innerText = e.target.innerText;
                pl.sizeChange(e.target.dataset.value);
                selectCurrent.click();
            });
        }
        window.addEventListener('click', function (e) {
            if (e.target.className.indexOf('size-selector') === -1) {
                selectCurrent.dataset.opened = false;
                selectItemsContainer.style.display = 'none';
            }
        });
    },
    removeItems: function () {
        var pl = this;
        if (pl.selectedItems.length > 0) {
            if (confirm("Вы уверены, что хотите удалить выбранные элементы? (" + pl.selectedItems.length + ")")) {
                for (var i = 0; i < pl.selectedItems.length; i++) {
                    document.querySelector('.photo-list__item[data-id="' + pl.selectedItems[i] + '"]').remove();
                }
                pl.selectedItems = [];
                pl.removeBtn.classList.remove('remove-items--active');
                pl.itemsAll = document.querySelectorAll('.photo-list__item');
            }
            pl.selectedAll();
        }
    },
    selectAll: function () {
        var pl = this;
        if (pl.selectedItems.length < pl.itemsAll.length) {
            pl.selectedAll = false;
            pl.selectAllBtn.classList.remove('select-all--active');
            pl.selectedItems = [];
        }
        if (!pl.selectedAll) {
            for (var i = 0; i < pl.itemsAll.length; i++) {
                if (!pl.itemsAll[i].classList.contains('photo-list__item--hidden')) {
                    pl.itemsAll[i].classList.remove('photo-list__item--active');
                    pl.itemsAll[i].click();
                }
            }
            pl.selectedAll = true;
            pl.selectAllBtn.classList.add('select-all--active');
        } else {
            for (var i = 0; i < pl.itemsAll.length; i++) {
                if (!pl.itemsAll[i].classList.contains('photo-list__item--hidden')) {
                    pl.itemsAll[i].classList.add('photo-list__item--active');
                    pl.itemsAll[i].click();
                }
            }
            pl.selectedItems = [];
            pl.selectedAll = false;
            pl.selectAllBtn.classList.remove('select-all--active');
        }
        console.log(this.selectedItems);
    },
    sizeChange: function (size) {
        var pl = this;
        if (size === 'all') {
            for (var i = 0; i < pl.itemsAll.length; i++) {
                pl.itemsAll[i].classList.remove('photo-list__item--hidden');
            }
        } else {
            for (var i = 0; i < pl.itemsAll.length; i++) {
                pl.itemsAll[i].classList.remove('photo-list__item--hidden');
                if (pl.itemsAll[i].dataset.size !== size) {
                    pl.itemsAll[i].classList.add('photo-list__item--hidden');
                }
            }
        }
        pl.selectedItems = [];
        pl.selectedAll = false;
        pl.selectAllBtn.classList.remove('select-all--active');
        for (var i = 0; i < pl.itemsAll.length; i++) {
            pl.itemsAll[i].classList.remove('photo-list__item--active');
        }
    }
};

photoList.init();